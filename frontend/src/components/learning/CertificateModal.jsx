import { useEffect, useState } from 'react';
import certificateService from '../../services/certificateService';

const CertificateModal = ({ enrollmentId, onClose }) => {
    const [certificate, setCertificate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                let res;
                try {
                    res = await certificateService.generate(enrollmentId);
                } catch (err) {
                    if (err.response?.status === 409) {
                        const all = await certificateService.getAll();
                        res = { data: all.data.find((c) => c.enrollmentId === enrollmentId) };
                    } else {
                        throw err;
                    }
                }
                setCertificate(res.data);
            } catch (err) {
                setError('Failed to load certificate.');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [enrollmentId]);

    const handlePrint = () => window.print();

    return (
        <div className="cert-modal-overlay" onClick={onClose}>
            <div className="cert-modal" onClick={(e) => e.stopPropagation()}>
                {loading && <p>Loading certificate...</p>}
                {error && <p>{error}</p>}

                {certificate && (
                    <>
                        <div className="certificate-sheet" id="certificate-print-area">
                            <div className="certificate-border">
                                <p className="cert-eyebrow">SkillSphere Nexus</p>
                                <h1>Certificate of Completion</h1>
                                <p className="cert-sub">This certifies that</p>
                                <h2 className="cert-name">Employee #{certificate.employeeId}</h2>
                                <p className="cert-sub">has successfully completed</p>
                                <h3 className="cert-course">{certificate.courseTitle}</h3>
                                <div className="cert-meta-row">
                                    <div>
                                        <span>Score</span>
                                        <strong>{certificate.score}%</strong>
                                    </div>
                                    <div>
                                        <span>Certificate No.</span>
                                        <strong>{certificate.certificateNumber}</strong>
                                    </div>
                                    <div>
                                        <span>Issued</span>
                                        <strong>{new Date(certificate.issueDate).toLocaleDateString()}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="cert-modal-actions">
                            <button className="primary-btn" onClick={handlePrint}>Download / Print PDF</button>
                            <button className="course-btn continue" onClick={onClose}>Close</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CertificateModal;