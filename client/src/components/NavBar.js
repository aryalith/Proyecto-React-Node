import React from "react";
import Nav from 'react-bootstrap/Nav';
import { useAuth } from "../context/AuthProvider";

export default function NavBar() {
    const user = useAuth();
    return (
        <div className="container mainNav">
            <Nav defaultActiveKey="/" className="pages justify-content-start" as="ul">
                <Nav.Item as="li">
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link href="/allgames">Game Library</Nav.Link>
                </Nav.Item>
                {user.token ?
                    <Nav.Item as="li">
                        <Nav.Link href="/mylibrary">My Library</Nav.Link>
                    </Nav.Item>
                    : ""
                }
            </Nav>
            <Nav defaultActiveKey="/" className="usernav justify-content-end" as="ul">
                {!user.token ?
                    <>
                        <Nav.Item as="li">
                            <Nav.Link href="/login">Log In</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link href="/register">Register</Nav.Link>
                        </Nav.Item>
                    </>
                    :
                    <Nav.Item as="li">
                        <Nav.Link href="/login" onClick={() => user.logOut()}>Log Out</Nav.Link>
                    </Nav.Item>
                }
            </Nav>
        </div>
    );
}

