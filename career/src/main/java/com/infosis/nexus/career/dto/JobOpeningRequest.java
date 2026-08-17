package com.infosis.nexus.career.dto;

import java.util.List;
import jakarta.validation.constraints.NotBlank;

public class JobOpeningRequest {
    @NotBlank
    private String title;
    private String department;
    private Integer openings;
    private List<String> requiredSkills;

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public Integer getOpenings() { return openings; }
    public void setOpenings(Integer openings) { this.openings = openings; }
    public List<String> getRequiredSkills() { return requiredSkills; }
    public void setRequiredSkills(List<String> requiredSkills) { this.requiredSkills = requiredSkills; }
}