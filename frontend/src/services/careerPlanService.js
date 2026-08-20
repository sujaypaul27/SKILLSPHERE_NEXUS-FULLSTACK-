import api from './api';

const BASE = '/career/career-plans';

const careerPlanService = {
    getAll: () => api.get(BASE),
    getById: (id) => api.get(`${BASE}/${id}`),
    getByEmployee: (employeeId) => api.get(`${BASE}/employee/${employeeId}`),
    getRoadmap: (id) => api.get(`${BASE}/${id}/roadmap`),
    create: (data) => api.post(BASE, data),
    update: (id, data) => api.put(`${BASE}/${id}`, data),
    updateProgress: (id, progressPercentage) => api.patch(`${BASE}/${id}/progress`, { progressPercentage }),
    delete: (id) => api.delete(`${BASE}/${id}`),
};

export default careerPlanService;