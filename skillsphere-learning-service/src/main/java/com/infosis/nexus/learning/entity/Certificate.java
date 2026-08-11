package com.infosis.nexus.learning.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "certificates")
public class Certificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "employee_id", nullable = false)
    private Long employeeId;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(name = "enrollment_id", nullable = false)
    private Long enrollmentId;

    @Column(name = "certificate_number", nullable = false, unique = true)
    private String certificateNumber;

    @Column(nullable = false)
    private Double score;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CertificateStatus status;

    @Column(name = "issue_date")
    private LocalDateTime issueDate;

    @PrePersist
    protected void onCreate() {
        issueDate = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }

    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }

    public Long getEnrollmentId() { return enrollmentId; }
    public void setEnrollmentId(Long enrollmentId) { this.enrollmentId = enrollmentId; }

    public String getCertificateNumber() { return certificateNumber; }
    public void setCertificateNumber(String certificateNumber) { this.certificateNumber = certificateNumber; }

    public Double getScore() { return score; }
    public void setScore(Double score) { this.score = score; }

    public CertificateStatus getStatus() { return status; }
    public void setStatus(CertificateStatus status) { this.status = status; }

    public LocalDateTime getIssueDate() { return issueDate; }
    public void setIssueDate(LocalDateTime issueDate) { this.issueDate = issueDate; }
}