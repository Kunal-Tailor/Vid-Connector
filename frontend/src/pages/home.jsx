import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {


    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const [isJoining, setIsJoining] = useState(false);
    const [inputError, setInputError] = useState("");


    const {addToUserHistory} = useContext(AuthContext);
    const isValidMeetingCode = (code) => {
        const trimmed = code.trim();
        return /^(?=.{3,64}$)[A-Za-z0-9_-]+$/.test(trimmed);
    };

    const handleJoinVideoCall = async () => {
        const code = meetingCode.trim();
        if (!code) {
            setInputError("Please enter a meeting code.");
            return;
        }
        if (!isValidMeetingCode(code)) {
            setInputError("Invalid code. Use 3-64 letters, numbers, - or _ only.");
            return;
        }
        setInputError("");
        setIsJoining(true);
        try {
            await addToUserHistory(code)
        } catch (e) { }
        finally {
            setIsJoining(false);
        }
        navigate(`/${code}`)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleJoinVideoCall();
        }
    }

    const generateMeetingCode = () => {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    const handleCreateNewMeeting = () => {
        const newCode = generateMeetingCode();
        setMeetingCode(newCode);
        navigate(`/${newCode}`);
    }

    return (
        <>

            <div className="navBar container">

                <div style={{ display: "flex", alignItems: "center" }}>

                    <div className='brand-badge'>
                        <img src="/logo192.png" alt="logo" style={{ width: 22, height: 22, borderRadius: 6 }} />
                        <h2>Kunal's Video Call</h2>
                    </div>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={
                        () => {
                            navigate("/history")
                        }
                    }>
                        <RestoreIcon />
                    </IconButton>
                    <p>History</p>

                    <Button onClick={() => {
                        localStorage.removeItem("token")
                        navigate("/auth")
                    }}>
                        Logout
                    </Button>
                </div>


            </div>


            <div className="meetContainer container">
                <div className="leftPanel">
                    <div>
                        <h2 className='hero-title'>Start or join a meeting instantly</h2>

                        <div style={{ display: 'flex', gap: "10px", alignItems: 'flex-start' }}>
                            <TextField
                                id="outlined-basic"
                                label="Meeting Code"
                                variant="outlined"
                                value={meetingCode}
                                onChange={e => setMeetingCode(e.target.value)}
                                onKeyDown={handleKeyDown}
                                error={Boolean(inputError)}
                                helperText={inputError || 'Enter an existing code or create a new meeting'}
                                InputLabelProps={{ sx: { color: '#fff' } }}
                                InputProps={{ sx: { color: '#fff' } }}
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#ffffff80' },
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
                                    '& .MuiInputLabel-root.Mui-focused': { color: '#fff' }
                                }}
                                fullWidth
                            />
                            <Button onClick={handleJoinVideoCall} className='btn btn-primary' variant='contained' disabled={!meetingCode.trim() || isJoining}>
                                {isJoining ? 'Joining…' : 'Join'}
                            </Button>
                            <Button onClick={handleCreateNewMeeting} variant='outlined'>New meeting</Button>
                        </div>
                    </div>
                </div>
                <div className='rightPanel'>
                    <img srcSet='/logo3.png' alt="" />
                </div>
            </div>
        </>
    )
}


export default withAuth(HomeComponent)