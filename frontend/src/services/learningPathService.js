import api from './api';

const learningPathService = {
    getAll: () => api.get('/learning/learning-paths'),
    getById: (id) => api.get(`/learning/learning-paths/${id}`),
    create: (data) => api.post('/learning/learning-paths', data),
    update: (id, data) => api.put(`/learning/learning-paths/${id}`, data),
    delete: (id) => api.delete(`/learning/learning-paths/${id}`),
    getProgress: (id, employeeId) => api.get(`/learning/learning-paths/${id}/progress/${employeeId}`),
};

export default learningPathService;