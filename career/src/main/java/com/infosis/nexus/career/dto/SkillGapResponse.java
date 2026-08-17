package com.infosis.nexus.career.dto;

public class SkillGapResponse {
    private String competencyName;
    private Integer requiredLevel;
    private Integer currentLevel;
    private Integer gap;

    public String getCompetencyName() { return competencyName; }
    public void setCompetencyName(String competencyName) { this.competencyName = competencyName; }
    public Integer getRequiredLevel() { return requiredLevel; }
    public void setRequiredLevel(Integer requiredLevel) { this.requiredLevel = requiredLevel; }
    public Integer getCurrentLevel() { return currentLevel; }
    public void setCurrentLevel(Integer currentLevel) { this.currentLevel = currentLevel; }
    public Integer getGap() { return gap; }
    public void setGap(Integer gap) { this.gap = gap; }
}