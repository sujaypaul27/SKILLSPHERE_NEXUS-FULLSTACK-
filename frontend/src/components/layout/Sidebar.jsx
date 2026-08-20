import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    Brain,
    BookOpen,
    ClipboardCheck,
    Award,
    Target,
    LogOut,
    GraduationCap,
    Briefcase,
    TrendingUp,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
    const { user, logout } = useAuth();

    const employeeLinks = [
        {
            name: "Dashboard",
            path: "/employee",
            icon: LayoutDashboard,
        },
        {
            name: "My Profile",
            path: "/employee/profile",
            icon: Users,
        },
        {
            name: "My Skills",
            path: "/employee/skills",
            icon: Brain,
        },
        {
            name: "Assessments",
            path: "/employee/assessments",
            icon: ClipboardCheck,
        },
        {
            name: "Competencies",
            path: "/employee/competencies",
            icon: Target,
        },
        {
            name: "Certifications",
            path: "/employee/certifications",
            icon: Award,
        },
        {
            name: "Learning",
            path: "/employee/learning",
            icon: GraduationCap,
        },
        {
            name: "Learning Paths",
            path: "/employee/learning-paths",
            icon: BookOpen,
        },
        {
            name: "My Certificates",
            path: "/employee/certificates",
            icon: Award,
        },
        {
            name: "Career Plan",
            path: "/employee/career-plan",
            icon: TrendingUp,
        },
        {
            name: "Job Portal",
            path: "/employee/job-portal",
            icon: Briefcase,
        },
    ];

    const hrLinks = [
        {
            name: "Dashboard",
            path: "/hr",
            icon: LayoutDashboard,
        },
        {
            name: "Cert. Tracking",
            path: "/hr/certification-tracking",
            icon: GraduationCap
        },
        {
            name: "Employees",
            path: "/hr/employees",
            icon: Users,
        },
        {
            name: "Skill Management",
            path: "/hr/skills",
            icon: Brain,
        },
        {
            name: "Skill Catalog",
            path: "/hr/skill-catalog",
            icon: BookOpen,
        },
        {
            name: "Assessments",
            path: "/hr/assessments",
            icon: ClipboardCheck,
        },
        {
            name: "Competencies",
            path: "/hr/competencies",
            icon: Target,
        },
        {
            name: "Certifications",
            path: "/hr/certifications",
            icon: Award,
        },
        {
            name: "Learning Dashboard",
            path: "/hr/learning",
            icon: GraduationCap,
        },
        {
            name: "Courses",
            path: "/hr/courses",
            icon: BookOpen,
        },
        {
            name: "Enrollments",
            path: "/hr/enrollments",
            icon: ClipboardCheck,
        },
        {
            name: "Learning Paths",
            path: "/hr/learning-paths",
            icon: Target,
        },
        {
            name: "Certificates",
            path: "/hr/certificates",
            icon: Award,
        },
        {
            name: "Compliance & Reports",
            path: "/hr/compliance-reports",
            icon: Award,
        },
        {
            name: "Career Plans",
            path: "/hr/career-plans",
            icon: TrendingUp,
        },
        {
            name: "Job Openings",
            path: "/hr/job-openings",
            icon: Briefcase,
        },
        {
            name: "Executive Dashboard",
            path: "/hr/executive-dashboard",
            icon: LayoutDashboard,
        }
    ];

    const links = user?.role === "HR"
        ? hrLinks
        : employeeLinks;

    return (
        <aside className="sidebar">

            <div className="sidebar-brand">

                <div className="sidebar-logo">
                    S
                </div>

                <div>
                    <h2>SkillSphere</h2>
                    <span>Nexus</span>
                </div>

            </div>

            <div className="sidebar-section-title">
                {user?.role === "HR"
                    ? "HR MANAGEMENT"
                    : "EMPLOYEE"}
            </div>

            <nav className="sidebar-nav">

                {links.map((link) => {

                    const Icon = link.icon;

                    return (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            end={link.path === "/hr" || link.path === "/employee"}
                            className={({ isActive }) =>
                                `sidebar-link ${
                                    isActive ? "active" : ""
                                }`
                            }
                        >
                            <Icon size={18} />
                            <span>{link.name}</span>
                        </NavLink>
                    );
                })}

            </nav>

            <div className="sidebar-bottom">

                <div className="user-mini">

                    <div className="avatar">
                        {user?.name?.charAt(0) || "U"}
                    </div>

                    <div className="user-mini-info">
                        <strong>{user?.name}</strong>
                        <span>{user?.role}</span>
                    </div>

                </div>

                <button
                    className="logout-button"
                    onClick={logout}
                >
                    <LogOut size={17} />
                    Logout
                </button>

            </div>

        </aside>
    );
}