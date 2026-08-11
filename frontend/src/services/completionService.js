import api from './api';

const completionService = {
    updateProgress: (enrollmentId, data) => api.patch(`/learning/completions/${enrollmentId}/progress`, data),
    getByEnrollmentId: (enrollmentId) => api.get(`/learning/completions/${enrollmentId}`),
    getByEmployeeId: (employeeId) => api.get(`/learning/completions/employee/${employeeId}`),
    getByCourseId: (courseId) => api.get(`/learning/completions/course/${courseId}`),
    getAllCompleted: () => api.get('/learning/completions/completed'),
};

export default completionService;