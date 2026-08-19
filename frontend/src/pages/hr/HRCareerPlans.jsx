import { useState, useEffect } from 'react';
import careerPlanService from '../../services/careerPlanService';

const HRCareerPlans = () => {
    const [plans, setPlans] = useState([]);
    const [roadmap, setRoadmap] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        employeeId: '',
        currentRole: '',
        targetRole: '',
        mentorName: '',
        eligibleInMonths: ''
    });


    const loadPlans = async () => {
        try {
            const res = await careerPlanService.getAll();
            setPlans(res.data);
        } catch (error) {
            console.error('Error loading career plans:', error);
        }
    };
    useEffect(() => {
        loadPlans();
    }, []);

    const viewRoadmap = async (id) => {
        try {
            const res = await careerPlanService.getRoadmap(id);
            setRoadmap(res.data);
        } catch (error) {
            console.error('Error loading roadmap:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                ...form,
                eligibleInMonths: Number(form.eligibleInMonths)
            };

            await careerPlanService.create(payload);

            setShowModal(false);

            setForm({
                employeeId: '',
                currentRole: '',
                targetRole: '',
                mentorName: '',
                eligibleInMonths: ''
            });

            loadPlans();
        } catch (error) {
            console.error('Error creating career plan:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await careerPlanService.delete(id);
            loadPlans();

            if (roadmap?.id === id) {
                setRoadmap(null);
            }
        } catch (error) {
            console.error('Error deleting career plan:', error);
        }
    };

    return (
        <div className="hr-page">

            <div className="page-header">
                <h2>Career Planning</h2>

                <button
                    className="btn-primary"
                    onClick={() => setShowModal(true)}
                >
                    + New Career Plan
                </button>
            </div>

            <div className="dashboard-cards">
                <div className="dashboard-card">
                    <h3>{plans.length}</h3>
                    <p>Career Plans</p>
                </div>
            </div>

            <table className="hr-table">
                <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Current Role</th>
                    <th>Target Role</th>
                    <th>Progress</th>
                    <th>Mentor</th>
                    <th>Eligible In</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {plans.length > 0 ? (
                    plans.map(plan => (
                        <tr key={plan.id}>
                            <td>{plan.employeeId}</td>

                            <td>{plan.currentRole}</td>

                            <td>{plan.targetRole}</td>

                            <td>
                                {plan.progressPercentage ??
                                    plan.progress ??
                                    0}%
                            </td>

                            <td>{plan.mentorName || 'Not Assigned'}</td>

                            <td>
                                {plan.eligibleInMonths != null
                                    ? `${plan.eligibleInMonths} months`
                                    : 'N/A'}
                            </td>

                            <td>
                                <button
                                    onClick={() =>
                                        viewRoadmap(plan.id)
                                    }
                                >
                                    View Roadmap
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(plan.id)
                                    }
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7">
                            No career plans found.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            {showModal && (
                <div
                    className="modal-overlay"
                    onClick={() => setShowModal(false)}
                >
                    <form
                        className="modal"
                        onClick={e => e.stopPropagation()}
                        onSubmit={handleSubmit}
                    >
                        <h3>New Career Plan</h3>

                        <input
                            type="text"
                            placeholder="Employee ID"
                            value={form.employeeId}
                            onChange={e =>
                                setForm({
                                    ...form,
                                    employeeId: e.target.value
                                })
                            }
                            required
                        />

                        <input
                            type="text"
                            placeholder="Current Role"
                            value={form.currentRole}
                            onChange={e =>
                                setForm({
                                    ...form,
                                    currentRole: e.target.value
                                })
                            }
                            required
                        />

                        <input
                            type="text"
                            placeholder="Target Role"
                            value={form.targetRole}
                            onChange={e =>
                                setForm({
                                    ...form,
                                    targetRole: e.target.value
                                })
                            }
                            required
                        />

                        <input
                            type="text"
                            placeholder="Mentor Name"
                            value={form.mentorName}
                            onChange={e =>
                                setForm({
                                    ...form,
                                    mentorName: e.target.value
                                })
                            }
                        />

                        <input
                            type="number"
                            placeholder="Eligible In (Months)"
                            value={form.eligibleInMonths}
                            onChange={e =>
                                setForm({
                                    ...form,
                                    eligibleInMonths: e.target.value
                                })
                            }
                            min="0"
                            required
                        />

                        <div className="modal-actions">
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="btn-primary"
                            >
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {roadmap && (
                <div
                    className="modal-overlay"
                    onClick={() => setRoadmap(null)}
                >
                    <div
                        className="modal"
                        onClick={e => e.stopPropagation()}
                    >
                        <h3>Career Roadmap</h3>

                        <p>
                            <strong>Employee:</strong>{' '}
                            {roadmap.employeeName || roadmap.employeeId}
                        </p>

                        <p>
                            <strong>Current Role:</strong>{' '}
                            {roadmap.currentRole}
                        </p>

                        <p>
                            <strong>Target Role:</strong>{' '}
                            {roadmap.targetRole}
                        </p>

                        <p>
                            <strong>Progress:</strong>{' '}
                            {roadmap.progressPercentage}%
                        </p>

                        <p>
                            <strong>Mentor:</strong>{' '}
                            {roadmap.mentorName || 'Not Assigned'}
                        </p>

                        <p>
                            <strong>Eligible In:</strong>{' '}
                            {roadmap.eligibleInMonths != null
                                ? `${roadmap.eligibleInMonths} months`
                                : 'N/A'}
                        </p>

                        {roadmap.skillGaps && (
                            <div>
                                <h4>Skill Gaps</h4>

                                <ul>
                                    {roadmap.skillGaps.map((g, index) => (
                                        <li key={index}>
                                            {g.competencyName}: +{g.gap}{' '}
                                            (current {g.currentLevel}/
                                            {g.requiredLevel})
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={() => setRoadmap(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default HRCareerPlans;