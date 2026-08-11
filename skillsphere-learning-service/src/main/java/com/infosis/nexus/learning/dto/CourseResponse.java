package com.infosis.nexus.learning.dto;

import com.infosis.nexus.learning.entity.CourseType;
import java.time.LocalDateTime;

public class CourseResponse {

    private Long id;
    private String courseCode;
    private String courseTitle;
    private String description;
    private String instructor;
    private String category;
    private CourseType courseType;
    private String difficultyLevel;
    private Integer durationHours;
    private Integer totalModules;
    private Double maxScore;
    private Double passingScore;
    private Double rating;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

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