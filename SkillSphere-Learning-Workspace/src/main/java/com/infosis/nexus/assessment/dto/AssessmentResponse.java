package com.infosis.nexus.assessment.dto;

public class AssessmentResponse {

    private Long id;
    private Long employeeId;
    private String employeeName;

    private Long skillId;
    private String skillName;

    private Double score;
    private Boolean passed;

    public AssessmentResponse() {
    }

    public AssessmentResponse(
            Long id,
            Long employeeId,
            String employeeName,
            Long skillId,
            String skillName,
            Double score,
            Boolean passed) {

        this.id = id;
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.skillId = skillId;
        this.skillName = skillName;
        this.score = score;
        this.passed = passed;
    }

    public Long getId() {
        return id;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public Long getSkillId() {
        return skillId;
    }

    public String getSkillName() {
        return skillName;
    }

    public Double getScore() {
        return score;
    }

    public Boolean getPassed() {
        return passed;
    }
}