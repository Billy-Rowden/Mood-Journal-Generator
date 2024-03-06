import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import Calendar from '../Calendar';
import mainLogo from '../../assets/images/mainLogo.png';
import './index.css';

function Login() {
    const [firstName, setFirstName] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (firstName.trim() !== '' && password.trim() !== '') {
            localStorage.setItem('loggedInUser', JSON.stringify({ firstName, password }));
            setLoggedIn(true);
            // Clear input fields after successful login
            setFirstName('');
            setPassword('');
        }
    };

    const handleGoToJournal = () => {
        console.log('Selected date:', selectedDate);
        if (selectedDate) {
            navigate('/journal', { state: { firstName } });
        } else {
            alert('Please select a date before proceeding to your journal');
        }
    };

    const handleNewUser = () => {
        // Clear localStorage of saved user
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('selectedDate');
        setFirstName('');
        setPassword('');
        setLoggedIn(false);
    };

    const handleDateSelect = (date) => {
        console.log('Selected date:', date);
        setSelectedDate(date);
    };

    return (
        <>
            <img src={mainLogo} alt="mainLogo" className="mainLogo" />
            <Container className="login-container">
                <div className="loginPage">
                    {/* Render login form only if not logged in */}
                    {!loggedIn && (
                        <div className="login-form">
                            <Form onSubmit={handleSubmit}>
                                <div className="input-group">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={firstName}
                                        onChange={handleFirstNameChange}
                                        style={{ width: '20em', height: '2.5em', borderRadius: '5px' }}
                                    />
                                </div>
                                <div className="input-group">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        style={{ width: '20em', height: '2.5em', borderRadius: '5px' }}
                                    />
                                </div>
                                <Button
                                    variant=""
                                    type="submit"
                                    className="loginButton"
                                    style={{
                                        width: '10em',
                                        height: '2.5em',
                                        borderRadius: '5px',
                                        color: '#e3e9ff',
                                        marginTop: '1.5em',
                                    }}
                                >
                                    Login
                                </Button>
                                <Button
                                    variant=""
                                    type="button"
                                    className="newUserBtn"
                                    onClick={handleNewUser}
                                    style={{
                                        width: '9em',
                                        height: '2.5em',
                                        borderRadius: '5px',
                                        color: '#e3e9ff',
                                        marginTop: '1.5em',
                                    }}
                                >
                                    New User
                                </Button>
                            </Form>
                        </div>
                    )}
                    {/* Render calendar and go to journal button only if logged in */}
                    {loggedIn && (
                        <div className="calendar-container">
                            <Calendar className="calendar" onSelect={handleDateSelect} />
                            <Button className="gotoJournalButton" onClick={handleGoToJournal}>
                                Go to Journal
                            </Button>
                        </div>
                    )}
                </div>
            </Container>
        </>
    );
}

export default Login;
