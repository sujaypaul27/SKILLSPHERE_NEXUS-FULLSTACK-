package com.infosis.nexus.learning.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "course_assessments")
public class CourseAssessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "employee_id", nullable = false)
    private Long employeeId;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(name = "assessment_name", nullable = false)
    private String assessmentName;

    @Column(nullable = false)
    private Double score;

    @Column(name = "max_score", nullable = false)
    private Double maxScore;

    @Column(nullable = false)
    private Boolean passed;

    @Column(name = "assessment_date")
    private LocalDateTime assessmentDate;

    @PrePersist
    protected void onCreate() {
        assessmentDate = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }

    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }

    public String getAssessmentName() { return assessmentName; }
    public void setAssessmentName(String assessmentName) { this.assessmentName = assessmentName; }

    public Double getScore() { return score; }
    public void setScore(Double score) { this.score = score; }

    public Double getMaxScore() { return maxScore; }
    public void setMaxScore(Double maxScore) { this.maxScore = maxScore; }

    public Boolean getPassed() { return passed; }
    public void setPassed(Boolean passed) { this.passed = passed; }

    public LocalDateTime getAssessmentDate() { return assessmentDate; }
    public void setAssessmentDate(LocalDateTime assessmentDate) { this.assessmentDate = assessmentDate; }
}