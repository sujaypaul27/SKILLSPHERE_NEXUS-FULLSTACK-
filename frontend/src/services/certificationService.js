import api from "./api";

export const getCertifications = async () => {
    const response = await api.get("/certifications");
    return response.data;
};

export const getCertificationById = async (id) => {
    const response = await api.get(
        `/certifications/${id}`
    );
    return response.data;
};

export const createCertification = async (data) => {
    const response = await api.post(
        "/certifications",
        data
    );
    return response.data;
};

export const updateCertification = async (id, data) => {
    const response = await api.put(
        `/certifications/${id}`,
        data
    );
    return response.data;
};

export const deleteCertification = async (id) => {
    await api.delete(`/certifications/${id}`);
};