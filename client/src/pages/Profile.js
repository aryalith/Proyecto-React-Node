//Aqui tu perfil de usuario
// UserPage.js
import React, { useEffect, useState } from 'react';

function Pofile() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/user/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json();
                console.log(data);

                setMessage(data.data);
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        };

        fetchData();
    }, []);

    return <h1>{message}</h1>;
}

export default Pofile;
