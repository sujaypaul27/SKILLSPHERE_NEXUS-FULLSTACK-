import api from './api';

const enrollmentService = {
    getAll: () => api.get('/learning/enrollments'),
    getById: (id) => api.get(`/learning/enrollments/${id}`),
    getByEmployeeId: (employeeId) => api.get(`/learning/enrollments/employee/${employeeId}`),
    create: (data) => api.post('/learning/enrollments', data),
    update: (id, data) => api.put(`/learning/enrollments/${id}`, data),
    delete: (id) => api.delete(`/learning/enrollments/${id}`),
};

export default enrollmentService;
