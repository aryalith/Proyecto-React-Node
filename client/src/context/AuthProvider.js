import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    // Aquí puedes hacer una llamada a la API para verificar el token y obtener los datos del usuario
    // Este es un ejemplo ficticio:
    // const fetchUser = async () => {
    //     try {
    //         const response = await fetch('http://localhost:5000/user/', {
    //             headers: {
    //                 'Authorization': `Bearer ${token}`
    //             }
    //         });
    //         const data = await response.json();
    //         if (response.ok) {
    //             setUser(data); // Suponiendo que data contiene la información del usuario
    //         } else {
    //             throw new Error('Token invalid or expired');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching user data:', error);
    //         setUser(null); // Si hay un error, asegúrate de limpiar el usuario
    //     }
    // };

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

            setUser(res.data[0]);
            console.log(res.data);

            setRole(res.data[0].role)

            setToken(res.message);
            localStorage.setItem("role", res.data[0].role);
            localStorage.setItem("token", res.message);
            // navigate("/mylibrary");
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
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ token, role, loginAction, logOut }}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};