from flask import Flask, request, jsonify
from flask_cors import CORS
import io
import json
# import numpy as np
from ultralytics import YOLO
from PIL import Image, ImageFilter
import torch
# import cv2, numpy as np


# Load the trained models
model = YOLO('weights/yolov8l.pt')  # load a custom model
model8nseg = YOLO('weights/yolov8n-seg.pt')
app = Flask(__name__)
CORS(app)

def is_dimly_lit_or_dark(img, threshold=50):
    try:
        # Convert the image to grayscale
        gray_image = img.convert('L')
        # Calculate the mean pixel intensity in the grayscale image
        mean_intensity = sum(gray_image.getdata()) / len(gray_image.getdata())
        # print("MI==",mean_intensity)
        # Check if the mean intensity is below the specified threshold
        if mean_intensity < threshold:
            return True  # Image is dimly lit or in extreme darkness
        else:
            return False  # Image is well-lit

    except Exception as e:
        print(f"An error occurred: {e}")
        return False  # Error occurred, assume not dimly lit or in darkness



def make_output(status, kind, msg, supervisor_message):
    return {
        "status": status,
        "message":msg,
        "result": {
            "kind": kind,
            "msg": msg,
            "supervisorMessage": supervisor_message
        },
    }

def confirmMobile(image):
    try:
        # Run inference with high-resolution masks
        thisresults = model8nseg.predict(image, retina_masks=True)
        print(thisresults[0].boxes.cls, thisresults[0].boxes.conf, thisresults)
        for c, conf in zip(thisresults[0].boxes.cls, thisresults[0].boxes.conf):
            print(image.filename,c,conf)
            if c==67 and conf>=0.40:
                return True 
        return False
    except Exception as e:
        print(f"An error occurred: {e}")
        return True


@app.route('/api/process', methods=['POST'])
def predict():
    print("--------------------------------------")
    output = make_output(
        "FAIL", "ISSUE-EXCEPTION", "Unknown server error", "Server Error"
    )
    # print(request.files)
    if 'image' not in request.files:
        output["result"]["msg"] = 'Missing a field with the name "image"'
        return json.dumps(output)
    file = request.files['image']
    # file2 = request.files['image']
    image = Image.open(io.BytesIO(file.read()))
    # img = cv2.imdecode(np.frombuffer(file2.read(), np.uint8), 1)
    if is_dimly_lit_or_dark(image):
        output = make_output(
            "ALERT",
            "ISSUE-LIGHTING",
            "Please improve lighting conditions",
            "Improper lighting detected",
        )
        return jsonify(output)
    
    count_person = 0
    count_assure_people = 0
    count_phone = 0
    count_no_people = 0

    count_fake_people=0
    
    
    results = model(image, conf=0.10)
    # print(results)
    for c, conf in zip(results[0].boxes.cls, results[0].boxes.conf):
        print(c, conf)
        if c == 0 and conf > 0.10: #no people
            count_no_people += 1
        if c==0 and 0.10<conf<0.36:
            count_fake_people+=1
        if c==0 and conf>0.55:
            count_assure_people+=1
        if c == 0 and conf > 0.88: #multiple people
            count_person += 1
        if c == 67 and conf >= 0.80: #phone
            count_phone += 1
        
    if count_phone >= 1 and confirmMobile(image=image):
        output = make_output(
            "ALERT",
            "ISSUE-PHONE",
            "Please keep any phones away from your workstation",
            "Mobile phone detected",
        )
        return jsonify(output)
    
    elif (count_person >= 2):
        output = make_output(
            "ALERT",
            "ISSUE-MULTIPLE_PEOPLE",
            "Please ensure that other people are not around your workstation",
            "Multiple people detected",
        )
        return jsonify(output)

    elif (count_no_people == 0):
        output = make_output(
            "WARN",
            "ISSUE-NO_PEOPLE",
            "Waiting for someone to be near the workstation",
            "No person detected",
        )
        return jsonify(output)
    elif (count_fake_people>=2 and count_person==0 and count_assure_people==0):
        output = make_output(
            "WARN",
            "ISSUE-NO_PEOPLE",
            "Waiting for someone to be near the workstation",
            "No person detected",
        )
        return jsonify(output)

    output = make_output(
            "OK",
            "NO-ISSUE",
            "Good Keep Working, Nothing Wrong Detected",
            "Good",
        )
    return jsonify(output)
    

if __name__ == '__main__':
    app.run(debug=True)