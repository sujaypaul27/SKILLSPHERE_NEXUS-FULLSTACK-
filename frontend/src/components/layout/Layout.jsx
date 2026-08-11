import Sidebar from "./Sidebar";
import { useAuth } from "../../context/AuthContext";

export default function Layout({ children }) {
    const { user, logout } = useAuth();

    return (
        <div className="app">

            {/* Top Header */}
            <header className="header">

                <div className="logo">
                    <div className="logo-icon">S</div>
                    <span>SkillSphere Nexus</span>
                </div>

                <div className="header-title">
                    SkillSphere-Nexus
                </div>

                <div className="user-section">

                    <span>
                        {user?.role === "HR"
                            ? "HR Manager"
                            : "Employee"}
                    </span>

                    <button onClick={logout}>
                        Logout
                    </button>

                </div>

            </header>

            {/* Sidebar + Content */}
            <div className="main-layout">

                <Sidebar />

                <main className="content">
                    {children}
                </main>

            </div>

        </div>
    );
}