// import React, { useState } from 'react';
// import axios from 'axios';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import StatusAlert from './StatusAlert';

// const LiveTestPage = () => {
//     const [file, setFile] = useState(null);
//     const [alertOpen, setAlertOpen] = useState(false);
//     const [alertData, setAlertData] = useState({
//         status: '',
//         title: '',
//         message: '',
//         supervisorMessage: ''
//     });

//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };

//     const handleUpload = async () => {
//         if (!file) {
//             alert('Please select an image.');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('image', file);

//         try {
//             const response = await axios.post('http://127.0.0.1:5000/api/process', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });

//             const data = response.data;
//             setAlertData({
//                 status: data.status,
//                 title: data.message,
//                 message: data.result.msg,
//                 supervisorMessage: data.result.supervisorMessage,
//             });
//             setAlertOpen(true); // Show the alert
//         } catch (error) {
//             console.error('Error uploading file:', error);
//         }
//     };

//     return (
//         <div style={{ textAlign: 'center', marginTop: '50px' }}>
//             <Typography variant="h4">Upload a Photo</Typography>
//             <input type="file" accept="image/*" onChange={handleFileChange} />
//             <br />
//             <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleUpload}
//                 style={{ marginTop: '20px' }}
//             >
//                 Upload and Detect
//             </Button>

//             {/* Alert Component */}
//             <StatusAlert
//                 open={alertOpen}
//                 onClose={() => setAlertOpen(false)}
//                 status={alertData.status}
//                 title={alertData.title}
//                 message={alertData.message}
//                 supervisorMessage={alertData.supervisorMessage}
//             />
//         </div>
//     );
// };

// export default LiveTestPage;









import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StatusAlert from './StatusAlert';

const LiveTestPage = () => {
    const [file, setFile] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertData, setAlertData] = useState({
        status: '',
        title: '',
        message: '',
        supervisorMessage: ''
    });

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please select an image.');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('http://127.0.0.1:5000/api/process', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const data = response.data;
            setAlertData({
                status: data.status,
                title: data.message,
                message: data.result.msg,
                supervisorMessage: data.result.supervisorMessage,
            });
            setAlertOpen(true); // Show the alert
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div
            style={{
                textAlign: 'center',
                marginTop: '50px',
                backgroundColor: '#121212',
                color: '#00ffcc',
                minHeight: '100vh',
                padding: '20px',
            }}
        >
            <Typography
                variant="h4"
                style={{
                    marginBottom: '20px',
                    color: '#00ffcc',
                    fontWeight: 'bold',
                }}
            >
                Upload a Photo
            </Typography>
            <Typography
                variant="body1"
                style={{
                    marginBottom: '30px',
                    fontSize: '1.2rem',
                    color:'white',
                }}
            >
                Select an image to detect and generate alerts for people, mobiles, and other scenarios.
            </Typography>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{
                    display: 'block',
                    margin: '20px auto',
                    padding: '10px',
                    border: '2px solid #00ffcc',
                    borderRadius: '5px',
                    backgroundColor: '#1e1e1e',
                    color: '#00ffcc',
                }}
            />
            <Button
                variant="contained"
                style={{
                    backgroundColor: '#00ffcc',
                    color: 'black',
                    fontWeight: 'bold',
                    marginTop: '20px',
                }}
                onClick={handleUpload}
            >
                Upload and Detect
            </Button>

            {/* Alert Component */}
            <StatusAlert
                open={alertOpen}
                onClose={() => setAlertOpen(false)}
                status={alertData.status}
                title={alertData.title}
                message={alertData.message}
                supervisorMessage={alertData.supervisorMessage}
            />
        </div>
    );
};

export default LiveTestPage;
