import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const DEMO_USERS = [
    {
        email: "hr@skillsphere.com",
        password: "hr123",
        role: "HR",
        name: "HR Manager",
    },
    {
        email: "employee@skillsphere.com",
        password: "employee123",
        role: "EMPLOYEE",
        name: "John Smith",
        employeeId: 1,
    },
];

export function AuthProvider({ children }) {

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("skillsphere_user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (email, password) => {

        const foundUser = DEMO_USERS.find(
            (u) =>
                u.email === email &&
                u.password === password
        );

        if (!foundUser) {
            return {
                success: false,
                message: "Invalid email or password",
            };
        }

        const userData = { ...foundUser };
        delete userData.password;

        localStorage.setItem(
            "skillsphere_user",
            JSON.stringify(userData)
        );

        setUser(userData);

        return {
            success: true,
            user: userData,
        };
    };

    const logout = () => {
        localStorage.removeItem("skillsphere_user");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}