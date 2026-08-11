import api from './api';

const learningService = {
    getAllCourses: () => api.get('/learning/courses'),
    getCourseById: (id) => api.get(`/learning/courses/${id}`),
    createCourse: (data) => api.post('/learning/courses', data),
    updateCourse: (id, data) => api.put(`/learning/courses/${id}`, data),
    deleteCourse: (id) => api.delete(`/learning/courses/${id}`),
};

export default learningService;