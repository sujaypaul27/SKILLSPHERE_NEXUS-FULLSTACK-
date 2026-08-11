package com.infosis.nexus.certification;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CertificationTrackingService {

    private final CertificationRepository certificationRepository;
    private final CertificationAuditRepository auditRepository;

    public CertificationTrackingService(CertificationRepository certificationRepository,
                                        CertificationAuditRepository auditRepository) {
        this.certificationRepository = certificationRepository;
        this.auditRepository = auditRepository;
    }

    public CertificationStatsResponse getStats() {
        long totalActive = certificationRepository.countByStatus("Valid");
        LocalDate today = LocalDate.now();
        long expiringIn30Days = certificationRepository
                .findByExpiryDateBetween(today, today.plusDays(30)).size();

        long renewedOnTime = auditRepository.findAll().stream()
                .filter(a -> "RENEWED_ON_TIME".equals(a.getAction()))
                .count();
        long renewalActions = auditRepository.findAll().stream()
                .filter(a -> a.getAction().startsWith("RENEW"))
                .count();
        double renewalRate = renewalActions == 0 ? 0.0 : Math.round((renewedOnTime * 10000.0) / renewalActions) / 100.0;

        return new CertificationStatsResponse(totalActive, expiringIn30Days, renewalRate);
    }

    public List<Certification> getExpiringSoon(int days) {
        LocalDate today = LocalDate.now();
        return certificationRepository.findByExpiryDateBetween(today, today.plusDays(days));
    }

    public List<Certification> getExpired() {
        return certificationRepository.findByExpiryDateBefore(LocalDate.now());
    }

    public Certification renew(Long id, RenewalRequest request) {
        Certification cert = certificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Certification not found with id: " + id));

        boolean onTime = !cert.getExpiryDate().isBefore(LocalDate.now());

        cert.setIssueDate(LocalDate.now());
        cert.setExpiryDate(request.getNewExpiryDate());
        cert.setStatus("Valid");
        certificationRepository.save(cert);

        CertificationAudit audit = new CertificationAudit();
        audit.setCertificationId(cert.getId());
        audit.setEmployeeId(cert.getEmployeeid());
        audit.setAction(onTime ? "RENEWED_ON_TIME" : "RENEWED_LATE");
        audit.setDetails("Renewed " + cert.getCertificationName() + " to expire " + request.getNewExpiryDate());
        auditRepository.save(audit);

        return cert;
    }

    public List<CertificationAudit> getAuditTrail(Long certificationId) {
        return certificationId == null
                ? auditRepository.findAll()
                : auditRepository.findByCertificationId(certificationId);
    }

    public CertificationAudit sendNotification(Long certificationId) {
        Certification cert = certificationRepository.findById(certificationId)
                .orElseThrow(() -> new RuntimeException("Certification not found with id: " + certificationId));

        CertificationAudit audit = new CertificationAudit();
        audit.setCertificationId(cert.getId());
        audit.setEmployeeId(cert.getEmployeeid());
        audit.setAction("NOTIFICATION_SENT");
        audit.setDetails("Renewal reminder sent for " + cert.getCertificationName() + " (expires " + cert.getExpiryDate() + ")");
        return auditRepository.save(audit);
    }

    public List<ComplianceStatusResponse> getComplianceReport() {
        List<Certification> all = certificationRepository.findAll();
        Map<Long, List<Certification>> byEmployee = all.stream()
                .collect(Collectors.groupingBy(Certification::getEmployeeid));

        List<ComplianceStatusResponse> result = new java.util.ArrayList<>();
        for (Map.Entry<Long, List<Certification>> entry : byEmployee.entrySet()) {
            long expired = entry.getValue().stream().filter(c -> "Expired".equals(c.getStatus())).count();
            long active = entry.getValue().stream().filter(c -> "Valid".equals(c.getStatus())).count();
            result.add(new ComplianceStatusResponse(entry.getKey(), expired == 0, expired, active));
        }
        return result;
    }

    public CertificationReportResponse getReport() {
        List<Certification> all = certificationRepository.findAll();
        long total = all.size();
        long valid = all.stream().filter(c -> "Valid".equals(c.getStatus())).count();
        long expired = all.stream().filter(c -> "Expired".equals(c.getStatus())).count();
        LocalDate today = LocalDate.now();
        long expiring = certificationRepository.findByExpiryDateBetween(today, today.plusDays(30)).size();

        Map<String, Long> byProvider = all.stream()
                .collect(Collectors.groupingBy(Certification::getProvider, Collectors.counting()));

        double renewalRate = getStats().getRenewalRate();

        return new CertificationReportResponse(total, valid, expired, expiring, renewalRate, byProvider);
    }
}