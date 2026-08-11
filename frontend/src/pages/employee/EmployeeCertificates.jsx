import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import certificateService from '../../services/certificateService';

const EmployeeCertificates = () => {
    const { user } = useAuth();
    const employeeId = user?.employeeId || user?.id;

    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!employeeId) return;
        certificateService.getByEmployeeId(employeeId)
            .then((res) => setCertificates(res.data))
            .catch(() => setError('Failed to load certificates.'))
            .finally(() => setLoading(false));
    }, [employeeId]);

    if (loading) return <p>Loading certificates...</p>;
    if (error) return <p>{error}</p>;
    if (certificates.length === 0) return <p>No certificates found.</p>;

    return (
        <div>
            <h2>My Certificates</h2>
            {certificates.map((cert) => (
                <div key={cert.id} className="dashboard-card" style={{ padding: '16px', marginBottom: '12px' }}>
                    <h3>{cert.courseTitle}</h3>
                    <p>Certificate No: {cert.certificateNumber}</p>
                    <p>Score: {cert.score}%</p>
                    <p>Status: {cert.status}</p>
                    <p>Issued: {new Date(cert.issueDate).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
};

export default EmployeeCertificates;