import { useEffect, useState } from "react";
import { Target } from "lucide-react";

import Layout from "../../components/layout/Layout";
import { getCompetencies } from "../../services/competencyService";
import { getEmployees } from "../../services/employeeService";

export default function HRCompetencies() {
    const [competencies, setCompetencies] = useState([]);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        Promise.all([
            getCompetencies(),
            getEmployees()
        ])
            .then(([competencyData, employeeData]) => {
                setCompetencies(competencyData);
                setEmployees(employeeData);
            })
            .catch(console.error);
    }, []);

    const getEmployeeName = (employeeId) => {
        const employee = employees.find(
            emp => emp.id === employeeId
        );

        return employee
            ? employee.name
            : `Employee #${employeeId}`;
    };

    return (
        <Layout>

            <div className="page-heading">
                <h1>Competencies</h1>
                <p>Monitor competency gaps across employees</p>
            </div>

            <div className="dashboard-card">

                <div className="card-header">
                    <div>
                        <h3>Competency Mapping</h3>
                        <p>Required vs current competency levels</p>
                    </div>

                    <Target size={22} />
                </div>

                <table className="hr-table">

                    <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Competency</th>
                        <th>Required</th>
                        <th>Current</th>
                        <th>Gap</th>
                    </tr>
                    </thead>

                    <tbody>

                    {competencies.map(item => (

                        <tr key={item.id}>

                            <td>
                                <strong>
                                    {getEmployeeName(item.employeeId)}
                                </strong>
                            </td>

                            <td>
                                <strong>
                                    {item.competencyName}
                                </strong>
                            </td>

                            <td>
                                {item.requiredLevel}/10
                            </td>

                            <td>
                                {item.currentLevel}/10
                            </td>

                            <td>
                                <span
                                    className={
                                        item.gap === 0
                                            ? "status valid"
                                            : "gap-badge"
                                    }
                                >
                                    {item.gap === 0
                                        ? "No Gap"
                                        : `Gap ${item.gap}`}
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
// import { useEffect, useState } from "react";
// import { Target } from "lucide-react";
//
// import Layout from "../../components/layout/Layout";
// import { getCompetencies } from "../../services/competencyService";
//
// export default function HRCompetencies() {
//
//     const [competencies, setCompetencies] = useState([]);
//
//     useEffect(() => {
//         getCompetencies()
//             .then(setCompetencies)
//             .catch(console.error);
//     }, []);
//
//     return (
//         <Layout>
//
//             <div className="page-heading">
//                 <h1>Competencies</h1>
//                 <p>Monitor competency gaps across employees</p>
//             </div>
//
//             <div className="dashboard-card">
//
//                 <div className="card-header">
//                     <div>
//                         <h3>Competency Mapping</h3>
//                         <p>Required vs current competency levels</p>
//                     </div>
//
//                     <Target size={22} />
//                 </div>
//
//                 <table className="hr-table">
//
//                     <thead>
//                     <tr>
//                         <th>Employee</th>
//                         <th>Competency</th>
//                         <th>Required</th>
//                         <th>Current</th>
//                         <th>Gap</th>
//                     </tr>
//                     </thead>
//
//                     <tbody>
//
//                     {competencies.map(item => (
//
//                         <tr key={item.id}>
//
//                             <td>#{item.employeeId}</td>
//
//                             <td>
//                                 <strong>
//                                     {item.competencyName}
//                                 </strong>
//                             </td>
//
//                             <td>{item.requiredLevel}/10</td>
//
//                             <td>{item.currentLevel}/10</td>
//
//                             <td>
//                                     <span
//                                         className={
//                                             item.gap === 0
//                                                 ? "status valid"
//                                                 : "gap-badge"
//                                         }
//                                     >
//                                         {item.gap === 0
//                                             ? "No Gap"
//                                             : `Gap ${item.gap}`}
//                                     </span>
//                             </td>
//
//                         </tr>
//
//                     ))}
//
//                     </tbody>
//
//                 </table>
//
//             </div>
//
//         </Layout>
//     );
// }