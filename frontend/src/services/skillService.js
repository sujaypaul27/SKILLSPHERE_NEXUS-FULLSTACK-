import api from "./api";

export const getSkills = async () => {
    const response = await api.get("/skills");
    return response.data;
};

export const getSkillById = async (id) => {
    const response = await api.get(`/skills/${id}`);
    return response.data;
};

export const getSkillsByEmployee = async (employeeId) => {
    const response = await api.get(
        `/skills/employee/${employeeId}`
    );
    return response.data;
};

export const getVerifiedSkills = async () => {
    const response = await api.get("/skills/verified");
    return response.data;
};

export const getSkillsByCategory = async (category) => {
    const response = await api.get(
        `/skills/category/${category}`
    );
    return response.data;
};

export const createSkill = async (skill) => {
    const response = await api.post("/skills", skill);
    return response.data;
};

export const updateSkill = async (id, skill) => {
    const response = await api.put(`/skills/${id}`, skill);
    return response.data;
};

export const verifySkill = async (id) => {
    const response = await api.patch(
        `/skills/${id}/verify`
    );
    return response.data;
};

export const deleteSkill = async (id) => {
    await api.delete(`/skills/${id}`);
};