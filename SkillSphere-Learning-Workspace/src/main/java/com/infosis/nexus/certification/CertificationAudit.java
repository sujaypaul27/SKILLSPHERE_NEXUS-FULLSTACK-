package com.infosis.nexus.certification;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "certification_audit")
public class CertificationAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "certification_id", nullable = false)
    private Long certificationId;

    @Column(name = "employee_id", nullable = false)
    private Long employeeId;

    @Column(nullable = false)
    private String action;

    @Column(length = 500)
    private String details;

    @Column(name = "performed_at")
    private LocalDateTime performedAt;

    @PrePersist
    protected void onCreate() {
        performedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getCertificationId() { return certificationId; }
    public void setCertificationId(Long certificationId) { this.certificationId = certificationId; }

    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public LocalDateTime getPerformedAt() { return performedAt; }
    public void setPerformedAt(LocalDateTime performedAt) { this.performedAt = performedAt; }
}