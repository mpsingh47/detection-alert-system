// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

// const LandingPage = () => {
//     const navigate = useNavigate();

//     return (
//         <div style={{ textAlign: 'center', marginTop: '50px' }}>
//             <Typography variant="h3">Detection and Alert Generation System</Typography>
//             <Typography variant="body1" style={{ margin: '20px 0' }}>
//                 Our system detects the number of people, mobile usage, and generates alerts.
//             </Typography>
//             <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => navigate('/live-test')}
//             >
//                 Try Live Test
//             </Button>
//         </div>
//     );
// };

// export default LandingPage;




import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div className="App">
            <header className="App-header">
                <h1 style={{ fontSize: '3rem', margin: '20px 0', color: '#00ffcc' }}>
                    Detection and Alert System
                </h1>
                <p style={{ fontSize: '1.2rem', lineHeight: '1.8', maxWidth: '800px', textAlign: 'center' }}>
                    This project is designed to provide a smart solution for BPOs and other monitoring
                    environments. It uses image detection to identify scenarios like the presence of mobile
                    devices, absence of people, or multiple people in the camera footage. With this system,
                    organizations can maintain productivity and ensure compliance with their policies.
                </p>
                <Link
                    to="/live-test"
                    style={{
                        textDecoration: 'none',
                        color: 'black',
                        backgroundColor: '#00ffcc',
                        padding: '15px 30px',
                        borderRadius: '10px',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        marginTop: '30px',
                    }}
                >
                    Live Test
                </Link>
            </header>
        </div>
    );
}

export default LandingPage;

