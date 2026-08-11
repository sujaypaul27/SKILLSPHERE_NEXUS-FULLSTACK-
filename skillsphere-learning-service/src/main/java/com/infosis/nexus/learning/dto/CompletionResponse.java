package com.infosis.nexus.learning.dto;

import com.infosis.nexus.learning.entity.EnrollmentStatus;

import java.time.LocalDateTime;

public class CompletionResponse {
    private Long enrollmentId;
    private Long employeeId;
    private Long courseId;
    private String courseTitle;
    private double progressPercentage;
    private EnrollmentStatus completionStatus;
    private Double score;
    private LocalDateTime completionDate;

    public CompletionResponse(Long enrollmentId, Long employeeId, Long courseId, String courseTitle,
                              double progressPercentage, EnrollmentStatus completionStatus,
                              Double score, LocalDateTime completionDate) {
        this.enrollmentId = enrollmentId;
        this.employeeId = employeeId;
        this.courseId = courseId;
        this.courseTitle = courseTitle;
        this.progressPercentage = progressPercentage;
        this.completionStatus = completionStatus;
        this.score = score;
        this.completionDate = completionDate;
    }

    public Long getEnrollmentId() { return enrollmentId; }
    public Long getEmployeeId() { return employeeId; }
    public Long getCourseId() { return courseId; }
    public String getCourseTitle() { return courseTitle; }
    public double getProgressPercentage() { return progressPercentage; }
    public EnrollmentStatus getCompletionStatus() { return completionStatus; }
    public Double getScore() { return score; }
    public LocalDateTime getCompletionDate() { return completionDate; }
}