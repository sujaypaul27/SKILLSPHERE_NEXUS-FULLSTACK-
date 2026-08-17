package com.infosis.nexus.career.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;

public class CareerPlanRequest {
    @NotNull
    private Long employeeId;
    @NotBlank
    private String currentRole;
    @NotBlank
    private String targetRole;
    private String mentorName;
    private Integer eligibleInMonths;

    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }
    public String getCurrentRole() { return currentRole; }
    public void setCurrentRole(String currentRole) { this.currentRole = currentRole; }
    public String getTargetRole() { return targetRole; }
    public void setTargetRole(String targetRole) { this.targetRole = targetRole; }
    public String getMentorName() { return mentorName; }
    public void setMentorName(String mentorName) { this.mentorName = mentorName; }
    public Integer getEligibleInMonths() { return eligibleInMonths; }
    public void setEligibleInMonths(Integer eligibleInMonths) { this.eligibleInMonths = eligibleInMonths; }
}