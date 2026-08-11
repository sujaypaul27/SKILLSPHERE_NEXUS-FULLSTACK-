import api from './api';

const certificationTrackingService = {
    getStats: () => api.get('/certifications/stats'),
    getExpiring: (days = 30) => api.get(`/certifications/expiring?days=${days}`),
    getExpired: () => api.get('/certifications/expired'),
    renew: (id, newExpiryDate) => api.patch(`/certifications/${id}/renew`, { newExpiryDate }),
    getAuditTrail: (certificationId) =>
        api.get(certificationId ? `/certifications/audit-trail?certificationId=${certificationId}` : '/certifications/audit-trail'),
    getAll: () => api.get('/certifications'),
    sendNotification: (id) => api.post(`/certifications/${id}/notify`),
    getCompliance: () => api.get('/certifications/compliance'),
    getReport: () => api.get('/certifications/report'),
};

export default certificationTrackingService;