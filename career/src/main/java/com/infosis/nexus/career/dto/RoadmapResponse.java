package com.infosis.nexus.career.dto;

import java.util.List;

public class RoadmapResponse {
    private Long employeeId;
    private String employeeName;
    private String currentRole;
    private String targetRole;
    private Double progressPercentage;
    private String mentorName;
    private Integer eligibleInMonths;
    private List<SkillGapResponse> skillGaps;

    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }
    public String getEmployeeName() { return employeeName; }
    public void setEmployeeName(String employeeName) { this.employeeName = employeeName; }
    public String getCurrentRole() { return currentRole; }
    public void setCurrentRole(String currentRole) { this.currentRole = currentRole; }
    public String getTargetRole() { return targetRole; }
    public void setTargetRole(String targetRole) { this.targetRole = targetRole; }
    public Double getProgressPercentage() { return progressPercentage; }
    public void setProgressPercentage(Double progressPercentage) { this.progressPercentage = progressPercentage; }
    public String getMentorName() { return mentorName; }
    public void setMentorName(String mentorName) { this.mentorName = mentorName; }
    public Integer getEligibleInMonths() { return eligibleInMonths; }
    public void setEligibleInMonths(Integer eligibleInMonths) { this.eligibleInMonths = eligibleInMonths; }
    public List<SkillGapResponse> getSkillGaps() { return skillGaps; }
    public void setSkillGaps(List<SkillGapResponse> skillGaps) { this.skillGaps = skillGaps; }
}