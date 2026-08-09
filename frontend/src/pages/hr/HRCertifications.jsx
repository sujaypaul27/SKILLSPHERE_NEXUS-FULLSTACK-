import { useEffect, useState } from "react";
import { Award } from "lucide-react";

import Layout from "../../components/layout/Layout";
import { getCertifications } from "../../services/certificationService";

export default function HRCertifications() {

    const [certifications, setCertifications] = useState([]);

    useEffect(() => {
        getCertifications()
            .then(setCertifications)
            .catch(console.error);
    }, []);

    return (
        <Layout>

            <div className="page-heading">
                <h1>Certifications</h1>
                <p>Track employee certification status</p>
            </div>

            <div className="dashboard-card">

                <div className="card-header">
                    <div>
                        <h3>Certification Tracking</h3>
                        <p>{certifications.length} certifications</p>
                    </div>

                    <Award size={22} />
                </div>

                <table className="hr-table">

                    <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Certification</th>
                        <th>Provider</th>
                        <th>Issue Date</th>
                        <th>Expiry Date</th>
                        <th>Status</th>
                    </tr>
                    </thead>

                    <tbody>

                    {certifications.map(cert => (

                        <tr key={cert.id}>

                            <td>#{cert.employeeid}</td>

                            <td>
                                <strong>
                                    {cert.certificationName}
                                </strong>
                            </td>

                            <td>{cert.provider}</td>

                            <td>{cert.issueDate}</td>

                            <td>{cert.expiryDate}</td>

                            <td>
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
                            </td>

                        </tr>

                    ))}

                    </tbody>

                </table>

            </div>

        </Layout>
    );
}