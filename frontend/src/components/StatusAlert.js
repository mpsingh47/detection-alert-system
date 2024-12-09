import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

const StatusAlert = ({ open, onClose, status, title, message, supervisorMessage }) => {
    // Determine the alert color based on the status
    const getAlertSeverity = () => {
        switch (status) {
            case 'ALERT': return 'error';
            case 'WARN': return 'warning';
            case 'OK': return 'success';
            default: return 'info';
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <Alert severity={getAlertSeverity()} style={{ margin: '20px' }}>
                <Typography variant="h6">{status}</Typography>
            </Alert>
            <DialogTitle>{supervisorMessage}</DialogTitle>
            <DialogContent>
                <Typography variant="body1">{message}</Typography>
                
            </DialogContent>
        </Dialog>
    );
};

export default StatusAlert;
