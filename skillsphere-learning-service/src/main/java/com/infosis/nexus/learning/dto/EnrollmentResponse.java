package com.infosis.nexus.learning.dto;

import com.infosis.nexus.learning.entity.EnrollmentStatus;
import java.time.LocalDateTime;

public class EnrollmentResponse {

    private Long id;
    private Long employeeId;
    private Long courseId;
    private String courseTitle;
    private LocalDateTime enrollmentDate;
    private LocalDateTime completionDate;
    private Double progressPercentage;
    private Double score;
    private EnrollmentStatus completionStatus;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }

    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }

    public String getCourseTitle() { return courseTitle; }
    public void setCourseTitle(String courseTitle) { this.courseTitle = courseTitle; }

    public LocalDateTime getEnrollmentDate() { return enrollmentDate; }
    public void setEnrollmentDate(LocalDateTime enrollmentDate) { this.enrollmentDate = enrollmentDate; }

    public LocalDateTime getCompletionDate() { return completionDate; }
    public void setCompletionDate(LocalDateTime completionDate) { this.completionDate = completionDate; }

    public Double getProgressPercentage() { return progressPercentage; }
    public void setProgressPercentage(Double progressPercentage) { this.progressPercentage = progressPercentage; }

    public Double getScore() { return score; }
    public void setScore(Double score) { this.score = score; }

    public EnrollmentStatus getCompletionStatus() { return completionStatus; }
    public void setCompletionStatus(EnrollmentStatus completionStatus) { this.completionStatus = completionStatus; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}