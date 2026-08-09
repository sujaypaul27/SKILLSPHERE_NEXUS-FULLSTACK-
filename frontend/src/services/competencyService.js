import api from "./api";

export const getCompetencies = async () => {
    const response = await api.get("/competencies");
    return response.data;
};

export const getCompetencyById = async (id) => {
    const response = await api.get(
        `/competencies/${id}`
    );
    return response.data;
};

export const getCompetenciesByEmployee = async (employeeId) => {
    const response = await api.get(
        `/competencies/employee/${employeeId}`
    );
    return response.data;
};

export const createCompetency = async (data) => {
    const response = await api.post(
        "/competencies",
        data
    );
    return response.data;
};

export const updateCompetency = async (id, data) => {
    const response = await api.put(
        `/competencies/${id}`,
        data
    );
    return response.data;
};

export const deleteCompetency = async (id) => {
    await api.delete(`/competencies/${id}`);
};