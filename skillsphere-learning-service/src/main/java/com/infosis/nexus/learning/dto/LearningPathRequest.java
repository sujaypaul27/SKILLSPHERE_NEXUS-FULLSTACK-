package com.infosis.nexus.learning.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import java.util.Set;

public class LearningPathRequest {

    @NotBlank(message = "Name is required")
    private String name;

    private String description;

    private String careerTrack;

    @NotEmpty(message = "At least one course must be assigned")
    private Set<Long> courseIds;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCareerTrack() { return careerTrack; }
    public void setCareerTrack(String careerTrack) { this.careerTrack = careerTrack; }

    public Set<Long> getCourseIds() { return courseIds; }
    public void setCourseIds(Set<Long> courseIds) { this.courseIds = courseIds; }
}