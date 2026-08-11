package com.infosis.nexus.learning.dto;

import com.infosis.nexus.learning.entity.CertificateStatus;
import java.time.LocalDateTime;

public class CertificateResponse {
    private Long id;
    private Long employeeId;
    private Long courseId;
    private String courseTitle;
    private Long enrollmentId;
    private String certificateNumber;
    private Double score;
    private CertificateStatus status;
    private LocalDateTime issueDate;

    public CertificateResponse(Long id, Long employeeId, Long courseId, String courseTitle, Long enrollmentId,
                               String certificateNumber, Double score, CertificateStatus status, LocalDateTime issueDate) {
        this.id = id;
        this.employeeId = employeeId;
        this.courseId = courseId;
        this.courseTitle = courseTitle;
        this.enrollmentId = enrollmentId;
        this.certificateNumber = certificateNumber;
        this.score = score;
        this.status = status;
        this.issueDate = issueDate;
    }

    public Long getId() { return id; }
    public Long getEmployeeId() { return employeeId; }
    public Long getCourseId() { return courseId; }
    public String getCourseTitle() { return courseTitle; }
    public Long getEnrollmentId() { return enrollmentId; }
    public String getCertificateNumber() { return certificateNumber; }
    public Double getScore() { return score; }
    public CertificateStatus getStatus() { return status; }
    public LocalDateTime getIssueDate() { return issueDate; }
}