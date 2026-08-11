package com.infosis.nexus.competency;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "competencies")
public class Competency {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Long employeeId;

    @NotBlank
    @Size(max = 100)
    private String competencyName;

    @Min(1)
    @Max(10)
    private Integer requiredLevel;

    @Min(1)
    @Max(10)
    private Integer currentLevel;

    public Competency() {
    }

    public Competency(Long employeeId, String competencyName,
                      Integer requiredLevel, Integer currentLevel) {
        this.employeeId = employeeId;
        this.competencyName = competencyName;
        this.requiredLevel = requiredLevel;
        this.currentLevel = currentLevel;
    }

    public Long getId() {
        return id;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getCompetencyName() {
        return competencyName;
    }

    public void setCompetencyName(String competencyName) {
        this.competencyName = competencyName;
    }

    public Integer getRequiredLevel() {
        return requiredLevel;
    }

    public void setRequiredLevel(Integer requiredLevel) {
        this.requiredLevel = requiredLevel;
    }

    public Integer getCurrentLevel() {
        return currentLevel;
    }

    public void setCurrentLevel(Integer currentLevel) {
        this.currentLevel = currentLevel;
    }

    public Integer getGap() {
        if (requiredLevel == null || currentLevel == null) {
            return null;
        }
        return requiredLevel - currentLevel;
    }
}