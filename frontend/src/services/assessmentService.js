import api from "./api";

export const getAssessments = async () => {
    const response = await api.get("/assessments");
    return response.data;
};

export const getAssessmentById = async (id) => {
    const response = await api.get(`/assessments/${id}`);
    return response.data;
};

export const getAssessmentsByEmployee = async (employeeId) => {
    const response = await api.get(
        `/assessments/employee/${employeeId}`
    );
    return response.data;
};

export const createAssessment = async (data) => {
    const response = await api.post(
        "/assessments",
        data
    );
    return response.data;
};

export const deleteAssessment = async (id) => {
    await api.delete(`/assessments/${id}`);
};