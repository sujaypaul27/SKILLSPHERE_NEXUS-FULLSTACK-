import { useEffect, useState } from 'react';
import certificateService from '../../services/certificateService';

const HRCertificates = () => {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        certificateService.getAll()
            .then((res) => setCertificates(res.data))
            .catch(() => setError('Failed to load certificates.'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading certificates...</p>;
    if (error) return <p>{error}</p>;
    if (certificates.length === 0) return <p>No certificates found.</p>;

    return (
        <div>
            <h2>Certificates</h2>
            <div className="hr-table-wrapper"><table className="hr-table">
                <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Course</th>
                    <th>Certificate No</th>
                    <th>Score</th>
                    <th>Status</th>
                    <th>Issued</th>
                </tr>
                </thead>
                <tbody>
                {certificates.map((c) => (
                    <tr key={c.id}>
                        <td>{c.employeeId}</td>
                        <td>{c.courseTitle}</td>
                        <td>{c.certificateNumber}</td>
                        <td>{c.score}%</td>
                        <td>{c.status}</td>
                        <td>{new Date(c.issueDate).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </table></div>
        </div>
    );
};

export default HRCertificates;