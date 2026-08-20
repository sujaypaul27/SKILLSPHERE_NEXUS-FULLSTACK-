import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/auth/Login";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import HRDashboard from "./pages/hr/HRDashboard";
import HREmployees from "./pages/hr/HREmployees";
import HRSkills from "./pages/hr/HRSkills";
import HRSkillCatalog from "./pages/hr/HRSkillCatalog";
import HRAssessments from "./pages/hr/HRAssessments";
import HRCompetencies from "./pages/hr/HRCompetencies";
import HRCertifications from "./pages/hr/HRCertifications";
import HRCertificationTracking from "./pages/hr/HRCertificationTracking";

import HRCareerPlans from "./pages/hr/HRCareerPlans";
import HRJobOpenings from "./pages/hr/HRJobOpenings";
import HRExecutiveDashboard from "./pages/hr/HRExecutiveDashboard";
import EmployeeCareerPlan from "./pages/employee/EmployeeCareerPlan";
import EmployeeJobPortal from "./pages/employee/EmployeeJobPortal";
import EmployeeProfile from "./pages/employee/EmployeeProfile";
import EmployeeSkills from "./pages/employee/EmployeeSkills";
import EmployeeAssessments from "./pages/employee/EmployeeAssessments";
import EmployeeCompetencies from "./pages/employee/EmployeeCompetencies";
import EmployeeCertifications from "./pages/employee/EmployeeCertifications";
import EmployeeCourseDetails from "./pages/employee/EmployeeCourseDetails";

import EmployeeLearning from "./pages/employee/EmployeeLearning";
import EmployeeLearningPaths from "./pages/employee/EmployeeLearningPaths";
import EmployeeCertificates from "./pages/employee/EmployeeCertificates";
import HRLearningDashboard from "./pages/hr/HRLearningDashboard";
import HRCourses from "./pages/hr/HRCourses";
import HREnrollments from "./pages/hr/HREnrollments";
import HRLearningPaths from "./pages/hr/HRLearningPaths";
import HRCertificates from "./pages/hr/HRCertificates";
import HRComplianceReports from "./pages/hr/HRComplianceReports";

function ProtectedRoute({ children, role }) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (role && user.role !== role) {
        return (
            <Navigate
                to={user.role === "HR" ? "/hr" : "/employee"}
                replace
            />
        );
    }

    return children;
}

export default function App() {
    return (
        <Routes>

            <Route path="/login" element={<Login />} />

            {/* EMPLOYEE */}
            <Route
                path="/employee"
                element={
                    <ProtectedRoute role="EMPLOYEE">
                        <EmployeeDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/employee/certifications"
                element={
                    <ProtectedRoute role="EMPLOYEE">
                        <EmployeeCertifications />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/employee/profile"
                element={
                    <ProtectedRoute role="EMPLOYEE">
                        <EmployeeProfile />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/employee/skills"
                element={
                    <ProtectedRoute role="EMPLOYEE">
                        <EmployeeSkills />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/employee/assessments"
                element={
                    <ProtectedRoute role="EMPLOYEE">
                        <EmployeeAssessments />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/employee/competencies"
                element={
                    <ProtectedRoute role="EMPLOYEE">
                        <EmployeeCompetencies />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/employee/certifications"
                element={
                    <ProtectedRoute role="EMPLOYEE">
                        <EmployeeCertifications />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/hr"
                element={
                    <ProtectedRoute role="HR">
                        <HRDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/hr/employees"
                element={
                    <ProtectedRoute role="HR">
                        <HREmployees />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/hr/skills"
                element={
                    <ProtectedRoute role="HR">
                        <HRSkills />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/hr/skill-catalog"
                element={
                    <ProtectedRoute role="HR">
                        <HRSkillCatalog />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/hr/assessments"
                element={
                    <ProtectedRoute role="HR">
                        <HRAssessments />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/hr/competencies"
                element={
                    <ProtectedRoute role="HR">
                        <HRCompetencies />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/hr/certifications"
                element={
                    <ProtectedRoute role="HR">
                        <HRCertifications />
                    </ProtectedRoute>
                }
            />
            <Route path="/employee/learning" element={<ProtectedRoute role="EMPLOYEE"><EmployeeLearning /></ProtectedRoute>} />
            <Route path="/employee/learning-paths" element={<ProtectedRoute role="EMPLOYEE"><EmployeeLearningPaths /></ProtectedRoute>} />
            <Route path="/employee/certificates" element={<ProtectedRoute role="EMPLOYEE"><EmployeeCertificates /></ProtectedRoute>} />

            <Route path="/hr/learning" element={<ProtectedRoute role="HR"><HRLearningDashboard /></ProtectedRoute>} />
            <Route path="/hr/courses" element={<ProtectedRoute role="HR"><HRCourses /></ProtectedRoute>} />
            <Route path="/hr/enrollments" element={<ProtectedRoute role="HR"><HREnrollments /></ProtectedRoute>} />
            <Route path="/hr/learning-paths" element={<ProtectedRoute role="HR"><HRLearningPaths /></ProtectedRoute>} />
            <Route path="/hr/certificates" element={<ProtectedRoute role="HR"><HRCertificates /></ProtectedRoute>} />
            <Route path="/employee/courses/:id" element={<ProtectedRoute role="EMPLOYEE"><EmployeeCourseDetails /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/login" replace />} />
            <Route path="/hr/certification-tracking" element={<ProtectedRoute role="HR"><HRCertificationTracking /></ProtectedRoute>} />
            <Route path="/hr/career-plans" element={<ProtectedRoute role="HR"><HRCareerPlans /></ProtectedRoute>} />
            <Route path="/hr/job-openings" element={<ProtectedRoute role="HR"><HRJobOpenings /></ProtectedRoute>} />
            <Route path="/hr/executive-dashboard" element={<ProtectedRoute role="HR"><HRExecutiveDashboard /></ProtectedRoute>} />
            <Route path="/employee/career-plan" element={<ProtectedRoute role="EMPLOYEE"><EmployeeCareerPlan /></ProtectedRoute>} />
            <Route path="/employee/job-portal" element={<ProtectedRoute role="EMPLOYEE"><EmployeeJobPortal /></ProtectedRoute>} />
             <Route path="/hr/compliance-reports" element={<ProtectedRoute role="HR"><HRComplianceReports /></ProtectedRoute>} />
        </Routes>
    );
}