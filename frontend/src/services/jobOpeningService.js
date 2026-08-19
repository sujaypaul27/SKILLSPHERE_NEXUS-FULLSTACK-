import api from './api';

const BASE = '/api/career/job-openings';

const jobOpeningService = {
    getAll: () => api.get(BASE),
    getById: (id) => api.get(`${BASE}/${id}`),
    create: (data) => api.post(BASE, data),
    update: (id, data) => api.put(`${BASE}/${id}`, data),
    delete: (id) => api.delete(`${BASE}/${id}`),
    getMatchesForEmployee: (employeeId) => api.get(`${BASE}/matches/employee/${employeeId}`),
};

export default jobOpeningService;