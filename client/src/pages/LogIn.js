//aquí se hará login o create usuario
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import { useAuth } from "../context/AuthProvider";

function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useAuth();

    const handleLogin = async () => {

        if (email !== "" && password !== "") {
            auth.loginAction({ email, password });
            return;
        }
        // try {
        //     const response = await fetch('http://localhost:5000/user/login', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({ email, password })
        //     });

        //     if (!response.ok) {
        //         throw new Error('Login failed');
        //     }

        //     const data = await response.json();
        //     localStorage.setItem('token', data.message);
        //     console.log(data.message);

        //     navigate('/mylibrary');
        // } catch (error) {
        //     console.error('Login failed', error);
        // }
    };



    return (
        <div className='container home login'>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="info" onClick={handleLogin}>
                    Log In
                </Button>
            </Form>
        </div>
    );
}

export default LogIn;