package com.infosis.nexus.career.dto;

public class JobMatchResponse {
    private Long jobId;
    private String title;
    private String department;
    private Integer matchedSkillCount;
    private Integer totalRequiredSkills;
    private Double matchPercentage;

    public Long getJobId() { return jobId; }
    public void setJobId(Long jobId) { this.jobId = jobId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public Integer getMatchedSkillCount() { return matchedSkillCount; }
    public void setMatchedSkillCount(Integer matchedSkillCount) { this.matchedSkillCount = matchedSkillCount; }
    public Integer getTotalRequiredSkills() { return totalRequiredSkills; }
    public void setTotalRequiredSkills(Integer totalRequiredSkills) { this.totalRequiredSkills = totalRequiredSkills; }
    public Double getMatchPercentage() { return matchPercentage; }
    public void setMatchPercentage(Double matchPercentage) { this.matchPercentage = matchPercentage; }
}