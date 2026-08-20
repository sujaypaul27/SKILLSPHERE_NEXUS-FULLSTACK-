import api from './api';

const BASE = '/career/analytics';

const analyticsService = {
    getTrainingAnalytics: () => api.get(`${BASE}/training`),
    getExecutiveDashboard: () => api.get(`${BASE}/executive-dashboard`),
};

export default analyticsService;