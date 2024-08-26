import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [role, setRole] = useState(localStorage.getItem("role") || "");
    const [userData, setUserData] = useState(localStorage.getItem("userData") || "");
    const navigate = useNavigate();

    const loginAction = async ({ email, password }) => {
        try {
            const response = await fetch('http://localhost:5000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const res = await response.json();
            if (!response.ok) {
                throw new Error('Login failed');
            }

            setUser(res.data);
            setUserData(res.data[0])
            setRole(res.data[0].role)

            setToken(res.message);
            localStorage.setItem("role", res.data[0].role);
            localStorage.setItem("token", res.message);
            localStorage.setItem("userData", JSON.stringify(res.data[0]));
            navigate("/mylibrary");
            return;


        } catch (err) {
            console.error(err);
        }
    };

    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userData");
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ token, role, userData, user, loginAction, logOut }}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};