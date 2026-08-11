import { useEffect, useState } from 'react';
import certificationTrackingService from '../../services/certificationTrackingService';
import { getEmployees } from '../../services/employeeService';
import StatCard from '../../components/learning/StatCard';

const HRComplianceReports = () => {
    const [report, setReport] = useState(null);
    const [compliance, setCompliance] = useState([]);
    const [employees, setEmployees] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        Promise.all([
            certificationTrackingService.getReport(),
            certificationTrackingService.getCompliance(),
            getEmployees(),
        ])
            .then(([reportRes, complianceRes, employeesRes]) => {
                setReport(reportRes.data);
                setCompliance(complianceRes.data);
                const map = {};
                employeesRes.forEach((e) => { map[e.id] = e.name; });
                setEmployees(map);
            })
            .catch(() => setError('Failed to load reports.'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading reports...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Certification Reports &amp; Compliance</h2>

            <div className="lm-stats-grid">
                <StatCard label="Total Certs" value={report.totalCertifications} sublabel={`${report.validCount} valid`} icon="📜" />
                <StatCard label="Expired" value={report.expiredCount} sublabel="Needs renewal" icon="❌" />
                <StatCard label="Renewal Rate" value={`${report.renewalRate}%`} sublabel="On time" icon="✅" />
            </div>

            <div className="dashboard-card" style={{ marginBottom: '20px' }}>
                <h3>Certifications by Provider</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                    {Object.entries(report.byProvider).map(([provider, count]) => (
                        <span key={provider} className="course-type-badge" style={{ background: '#f0ebff', color: '#4f2aa8' }}>
              {provider}: {count}
            </span>
                    ))}
                </div>
            </div>

            <div className="dashboard-card">
                <h3>Compliance Verification</h3>
                <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '14px' }}>
                    An employee is <strong>Non-Compliant</strong> if any of their certifications have expired and haven't been renewed.
                </p>
                <div className="hr-table-wrapper">
                    <table className="hr-table">
                        <thead>
                        <tr><th>Employee</th><th>Active</th><th>Expired</th><th>Status</th></tr>
                        </thead>
                        <tbody>
                        {compliance.map((c) => (
                            <tr key={c.employeeId}>
                                <td>{employees[c.employeeId] || `Employee #${c.employeeId}`}</td>
                                <td>{c.activeCount}</td>
                                <td>{c.expiredCount}</td>
                                <td>
                    <span className={c.compliant ? 'status valid' : 'status expired'}>
                      {c.compliant ? '✓ Compliant' : '✗ Non-Compliant'}
                    </span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HRComplianceReports;