import api from "./api";

export const getSkillCatalog = async () => {
    const response = await api.get("/skillcatalog");
    return response.data;
};

export const getSkillCatalogById = async (id) => {
    const response = await api.get(`/skillcatalog/${id}`);
    return response.data;
};

export const createSkillCatalog = async (data) => {
    const response = await api.post("/skillcatalog", data);
    return response.data;
};

export const updateSkillCatalog = async (id, data) => {
    const response = await api.put(
        `/skillcatalog/${id}`,
        data
    );
    return response.data;
};

export const deleteSkillCatalog = async (id) => {
    await api.delete(`/skillcatalog/${id}`);
};