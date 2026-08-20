import { useState, useEffect } from 'react';
import jobOpeningService from '../../services/jobOpeningService';

const HRJobOpenings = () => {
    const [jobs, setJobs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        title: '',
        department: '',
        openings: '',
        requiredSkills: ''
    });



    const loadJobs = async () => {
        try {
            const res = await jobOpeningService.getAll();
            setJobs(res.data);
        } catch (error) {
            console.error('Error loading jobs:', error);
        }
    };

    useEffect(() => {
        loadJobs();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                ...form,
                openings: Number(form.openings),
                requiredSkills: form.requiredSkills
                    .split(',')
                    .map(s => s.trim())
                    .filter(s => s !== '')
            };

            await jobOpeningService.create(payload);

            setShowModal(false);

            setForm({
                title: '',
                department: '',
                openings: '',
                requiredSkills: ''
            });

            loadJobs();
        } catch (error) {
            console.error('Error creating job opening:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await jobOpeningService.delete(id);
            loadJobs();
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };

    return (
        <div className="hr-page">

            <div className="page-header">
                <h2>Internal Job Portal</h2>

                <button
                    className="btn-primary"
                    onClick={() => setShowModal(true)}
                >
                    + New Job Opening
                </button>
            </div>

            <table className="hr-table">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Department</th>
                    <th>Openings</th>
                    <th>Required Skills</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {jobs.map(j => (
                    <tr key={j.id}>
                        <td>{j.title}</td>
                        <td>{j.department}</td>
                        <td>{j.openings}</td>
                        <td>
                            {j.requiredSkills?.join(', ')}
                        </td>
                        <td>{j.status}</td>
                        <td>
                            <button
                                onClick={() => handleDelete(j.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
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
                        <h3>New Job Opening</h3>

                        <input
                            placeholder="Title"
                            value={form.title}
                            onChange={e =>
                                setForm({
                                    ...form,
                                    title: e.target.value
                                })
                            }
                            required
                        />

                        <input
                            placeholder="Department"
                            value={form.department}
                            onChange={e =>
                                setForm({
                                    ...form,
                                    department: e.target.value
                                })
                            }
                        />

                        <input
                            type="number"
                            placeholder="Openings"
                            value={form.openings}
                            onChange={e =>
                                setForm({
                                    ...form,
                                    openings: e.target.value
                                })
                            }
                            min="1"
                            required
                        />

                        <input
                            placeholder="Required Skills (comma separated)"
                            value={form.requiredSkills}
                            onChange={e =>
                                setForm({
                                    ...form,
                                    requiredSkills: e.target.value
                                })
                            }
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

        </div>
    );
};

export default HRJobOpenings;
