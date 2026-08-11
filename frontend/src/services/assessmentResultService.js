import api from './api';

const assessmentResultService = {
    getAll: () => api.get('/learning/course-assessments'),
    getById: (id) => api.get(`/learning/course-assessments/${id}`),
    getByEmployeeId: (employeeId) => api.get(`/learning/course-assessments/employee/${employeeId}`),
    getByCourseId: (courseId) => api.get(`/learning/course-assessments/course/${courseId}`),
    create: (data) => api.post('/learning/course-assessments', data),
    delete: (id) => api.delete(`/learning/course-assessments/${id}`),
};

export default assessmentResultService;