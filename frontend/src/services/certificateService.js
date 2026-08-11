import api from './api';

const certificateService = {
    generate: (enrollmentId) => api.post(`/learning/certificates/generate/${enrollmentId}`),
    getAll: () => api.get('/learning/certificates'),
    getById: (id) => api.get(`/learning/certificates/${id}`),
    getByEmployeeId: (employeeId) => api.get(`/learning/certificates/employee/${employeeId}`),
    getByCourseId: (courseId) => api.get(`/learning/certificates/course/${courseId}`),
};

export default certificateService;