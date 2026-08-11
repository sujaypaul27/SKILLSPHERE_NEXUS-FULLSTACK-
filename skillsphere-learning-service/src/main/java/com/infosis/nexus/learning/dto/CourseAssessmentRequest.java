package com.infosis.nexus.learning.dto;

import jakarta.validation.constraints.*;

public class CourseAssessmentRequest {

    @NotNull(message = "Employee id is required")
    private Long employeeId;

    @NotNull(message = "Course id is required")
    private Long courseId;

    @NotBlank(message = "Assessment name is required")
    private String assessmentName;

    @NotNull(message = "Score is required")
    @DecimalMin(value = "0.0", message = "Score cannot be negative")
    private Double score;

    @NotNull(message = "Max score is required")
    @DecimalMin(value = "0.1", message = "Max score must be positive")
    private Double maxScore;

    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }

    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }

    public String getAssessmentName() { return assessmentName; }
    public void setAssessmentName(String assessmentName) { this.assessmentName = assessmentName; }

    public Double getScore() { return score; }
    public void setScore(Double score) { this.score = score; }

    public Double getMaxScore() { return maxScore; }
    public void setMaxScore(Double maxScore) { this.maxScore = maxScore; }
}