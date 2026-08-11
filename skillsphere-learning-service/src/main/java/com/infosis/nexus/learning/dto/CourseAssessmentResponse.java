package com.infosis.nexus.learning.dto;

import java.time.LocalDateTime;

public class CourseAssessmentResponse {

    private Long id;
    private Long employeeId;
    private Long courseId;
    private String courseTitle;
    private String assessmentName;
    private Double score;
    private Double maxScore;
    private Double percentage;
    private Boolean passed;
    private LocalDateTime assessmentDate;

    public CourseAssessmentResponse(Long id, Long employeeId, Long courseId, String courseTitle,
                                    String assessmentName, Double score, Double maxScore,
                                    Double percentage, Boolean passed, LocalDateTime assessmentDate) {
        this.id = id;
        this.employeeId = employeeId;
        this.courseId = courseId;
        this.courseTitle = courseTitle;
        this.assessmentName = assessmentName;
        this.score = score;
        this.maxScore = maxScore;
        this.percentage = percentage;
        this.passed = passed;
        this.assessmentDate = assessmentDate;
    }

    public Long getId() { return id; }
    public Long getEmployeeId() { return employeeId; }
    public Long getCourseId() { return courseId; }
    public String getCourseTitle() { return courseTitle; }
    public String getAssessmentName() { return assessmentName; }
    public Double getScore() { return score; }
    public Double getMaxScore() { return maxScore; }
    public Double getPercentage() { return percentage; }
    public Boolean getPassed() { return passed; }
    public LocalDateTime getAssessmentDate() { return assessmentDate; }
}