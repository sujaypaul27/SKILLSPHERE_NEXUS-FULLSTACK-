package com.infosis.nexus.learning.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "course_code", unique = true)
    private String courseCode;

    @Column(name = "course_title", nullable = false)
    private String courseTitle;

    @Column(length = 1000)
    private String description;

    private String instructor;

    private String category;

    @Enumerated(EnumType.STRING)
    @Column(name = "course_type")
    private CourseType courseType;

    @Column(name = "difficulty_level")
    private String difficultyLevel;

    @Column(name = "duration_hours")
    private Integer durationHours;

    @Column(name = "total_modules")
    private Integer totalModules;

    @Column(name = "max_score")
    private Double maxScore;

    @Column(name = "passing_score")
    private Double passingScore;

    @Column(name = "rating")
    private Double rating;

    private String status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCourseCode() { return courseCode; }
    public void setCourseCode(String courseCode) { this.courseCode = courseCode; }

    public String getCourseTitle() { return courseTitle; }
    public void setCourseTitle(String courseTitle) { this.courseTitle = courseTitle; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getInstructor() { return instructor; }
    public void setInstructor(String instructor) { this.instructor = instructor; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public CourseType getCourseType() { return courseType; }
    public void setCourseType(CourseType courseType) { this.courseType = courseType; }

    public String getDifficultyLevel() { return difficultyLevel; }
    public void setDifficultyLevel(String difficultyLevel) { this.difficultyLevel = difficultyLevel; }

    public Integer getDurationHours() { return durationHours; }
    public void setDurationHours(Integer durationHours) { this.durationHours = durationHours; }

    public Integer getTotalModules() { return totalModules; }
    public void setTotalModules(Integer totalModules) { this.totalModules = totalModules; }

    public Double getMaxScore() { return maxScore; }
    public void setMaxScore(Double maxScore) { this.maxScore = maxScore; }

    public Double getPassingScore() { return passingScore; }
    public void setPassingScore(Double passingScore) { this.passingScore = passingScore; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}