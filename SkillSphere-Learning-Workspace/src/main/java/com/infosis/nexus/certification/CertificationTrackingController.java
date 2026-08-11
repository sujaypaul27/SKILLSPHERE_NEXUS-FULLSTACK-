package com.infosis.nexus.certification;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certifications")
@CrossOrigin(origins = "http://localhost:5173")
public class CertificationTrackingController {

    private final CertificationTrackingService trackingService;

    public CertificationTrackingController(CertificationTrackingService trackingService) {
        this.trackingService = trackingService;
    }

    @GetMapping("/stats")
    public CertificationStatsResponse getStats() {
        return trackingService.getStats();
    }

    @GetMapping("/expiring")
    public List<Certification> getExpiring(@RequestParam(defaultValue = "30") int days) {
        return trackingService.getExpiringSoon(days);
    }

    @GetMapping("/expired")
    public List<Certification> getExpired() {
        return trackingService.getExpired();
    }

    @PatchMapping("/{id}/renew")
    public Certification renew(@PathVariable Long id, @Valid @RequestBody RenewalRequest request) {
        return trackingService.renew(id, request);
    }

    @GetMapping("/audit-trail")
    public List<CertificationAudit> getAuditTrail(@RequestParam(required = false) Long certificationId) {
        return trackingService.getAuditTrail(certificationId);
    }

    @PostMapping("/{id}/notify")
    public CertificationAudit sendNotification(@PathVariable Long id) {
        return trackingService.sendNotification(id);
    }

    @GetMapping("/compliance")
    public List<ComplianceStatusResponse> getCompliance() {
        return trackingService.getComplianceReport();
    }

    @GetMapping("/report")
    public CertificationReportResponse getReport() {
        return trackingService.getReport();
    }
}