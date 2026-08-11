import { useEffect, useState } from 'react';
import certificationTrackingService from '../../services/certificationTrackingService';
import { getEmployees } from '../../services/employeeService';
import StatCard from '../../components/learning/StatCard';

const HRCertificationTracking = () => {
    const [stats, setStats] = useState(null);
    const [expiring, setExpiring] = useState([]);
    const [employees, setEmployees] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [renewingId, setRenewingId] = useState(null);
    const [newDate, setNewDate] = useState('');

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [statsRes, expiringRes, employeesRes] = await Promise.all([
                certificationTrackingService.getStats(),
                certificationTrackingService.getExpiring(30),
                getEmployees(),
            ]);
            setStats(statsRes.data);
            setExpiring(expiringRes.data);
            const map = {};
            employeesRes.forEach((e) => { map[e.id] = e.name; });
            setEmployees(map);
        } catch (err) {
            setError('Failed to load certification data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadData(); }, []);

    const handleRenew = async (id) => {
        if (!newDate) { alert('Pick a new expiry date first.'); return; }
        try {
            await certificationTrackingService.renew(id, newDate);
            setRenewingId(null);
            setNewDate('');
            loadData();
        } catch (err) {
            alert(err.response?.data?.message || 'Renewal failed.');
        }
    };

    const handleNotify = (id) => {
        certificationTrackingService.sendNotification(id).then(() => alert('Renewal reminder sent.'));
    };

    if (loading) return <p>Loading certification tracking...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Tracking &amp; Renewals</h2>

            <div className="lm-stats-grid">
                <StatCard label="Certifications" value={stats.totalActive.toLocaleString()} sublabel="Active" icon="📜" />
                <StatCard label="Expiring" value={stats.expiringIn30Days} sublabel="Next 30 days" icon="⏳" />
                <StatCard label="Renewal Rate" value={`${stats.renewalRate}%`} sublabel="On time" icon="✅" />
            </div>

            <h3 style={{ marginTop: '10px' }}>Expiring Soon</h3>

            {expiring.length === 0 && <p>No certifications expiring in the next 30 days.</p>}

            <div className="course-grid">
                {expiring.map((cert) => {
                    const daysLeft = Math.ceil((new Date(cert.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
                    return (
                        <div key={cert.id} className="course-card">
                            <div className="course-card-banner">
                                <span className="course-type-badge">{cert.provider}</span>
                                <span className="course-rating-badge">⏳ {daysLeft}d left</span>
                            </div>
                            <div className="course-card-body">
                                <h3>{cert.certificationName}</h3>
                                <p className="course-card-desc">{employees[cert.employeeid] || `Employee #${cert.employeeid}`}</p>
                                <div className="course-meta-row">
                                    <span>📅 Expires {cert.expiryDate}</span>
                                    <span>{cert.status === 'Expired' ? '❌ Expired' : '✅ Valid'}</span>
                                </div>
                                <div className="course-card-footer">
                                    {renewingId === cert.id ? (
                                        <>
                                            <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
                                            <button className="course-btn certificate" onClick={() => handleRenew(cert.id)}>Confirm</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="course-btn continue" onClick={() => handleNotify(cert.id)}>Notify</button>
                                            <button className="course-btn enroll" onClick={() => setRenewingId(cert.id)}>Renew</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HRCertificationTracking;