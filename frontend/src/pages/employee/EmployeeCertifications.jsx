import { useEffect, useState } from "react";
import { Award } from "lucide-react";

import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/AuthContext";
import { getCertifications } from "../../services/certificationService";

export default function EmployeeCertifications() {
    const { user } = useAuth();

    const [certifications, setCertifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCertifications = async () => {
            try {
                const data = await getCertifications();

                setCertifications(
                    (data || []).filter(
                        (cert) =>
                            cert.employeeid === user?.employeeId
                    )
                );
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadCertifications();
    }, [user]);

    if (loading) {
        return (
            <Layout>
                <div className="loading">
                    Loading certifications...
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="page-heading">
                <h1>My Certifications</h1>
                <p>Track your professional certifications and validity.</p>
            </div>

            <div className="dashboard-card">
                {certifications.length === 0 ? (
                    <div className="empty-state">
                        No certifications found.
                    </div>
                ) : (
                    <div className="certification-grid">
                        {certifications.map((cert) => (
                            <div
                                className="certification-item"
                                key={cert.id}
                            >
                                <div className="cert-icon">
                                    <Award size={20} />
                                </div>

                                <div>
                                    <strong>
                                        {cert.certificationName}
                                    </strong>

                                    <span>
                                        {cert.provider}
                                    </span>

                                    <span>
                                        Issued: {cert.issueDate}
                                    </span>

                                    <span>
                                        Expires: {cert.expiryDate}
                                    </span>
                                </div>

                                <span
                                    className={`status ${
                                        cert.status
                                            ?.toLowerCase()
                                            .includes("expired")
                                            ? "expired"
                                            : "valid"
                                    }`}
                                >
                                    {cert.status}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}