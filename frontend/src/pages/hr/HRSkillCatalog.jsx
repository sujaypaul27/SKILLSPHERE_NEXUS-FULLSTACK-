import { useEffect, useState } from "react";
import { BookOpen, Plus, Trash2 } from "lucide-react";

import Layout from "../../components/layout/Layout";
import api from "../../services/api";

export default function HRSkillCatalog() {

    const [skills, setSkills] = useState([]);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("TECHNICAL");

    const loadSkills = async () => {
        const response = await api.get("/skillcatalog");
        setSkills(response.data);
    };

    useEffect(() => {
        loadSkills();
    }, []);

    const addSkill = async (e) => {
        e.preventDefault();

        await api.post("/skillcatalog", {
            name,
            category,
        });

        setName("");
        loadSkills();
    };

    const deleteSkill = async (id) => {
        if (!window.confirm("Delete this skill from catalog?")) return;

        await api.delete(`/skillcatalog/${id}`);
        loadSkills();
    };

    return (
        <Layout>

            <div className="page-heading">
                <h1>Skill Catalog</h1>
                <p>Manage the organization's competency skill library</p>
            </div>

            <div className="dashboard-card">

                <div className="card-header">

                    <div>
                        <h3>Add Skill</h3>
                        <p>Create a new skill in the catalog</p>
                    </div>

                    <BookOpen size={22} />

                </div>

                <form
                    className="inline-form"
                    onSubmit={addSkill}
                >

                    <input
                        placeholder="Skill name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />

                    <select
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        <option value="TECHNICAL">Technical</option>
                        <option value="DOMAIN">Domain</option>
                        <option value="SOFT">Soft Skill</option>
                    </select>

                    <button
                        className="primary-btn"
                        type="submit"
                    >
                        <Plus size={16} />
                        Add Skill
                    </button>

                </form>

            </div>

            <div className="dashboard-card">

                <div className="card-header">
                    <div>
                        <h3>Skill Library</h3>
                        <p>{skills.length} skills</p>
                    </div>

                    <BookOpen size={22} />
                </div>

                <div className="catalog-grid">

                    {skills.map(skill => (

                        <div
                            className="catalog-item"
                            key={skill.id}
                        >

                            <div>
                                <strong>{skill.name}</strong>
                                <span>{skill.category}</span>
                            </div>

                            <button
                                className="icon-danger"
                                onClick={() =>
                                    deleteSkill(skill.id)
                                }
                            >
                                <Trash2 size={17} />
                            </button>

                        </div>

                    ))}

                </div>

                {skills.length === 0 && (
                    <div className="empty-state">
                        No skills in catalog.
                    </div>
                )}

            </div>

        </Layout>
    );
}