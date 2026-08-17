package com.infosis.nexus.career.dto;

import com.infosis.nexus.career.entity.CareerPlanStatus;
import java.time.LocalDateTime;

public class CareerPlanResponse {
    private Long id;
    private Long employeeId;
    private String employeeName;
    private String currentRole;
    private String targetRole;
    private Double progressPercentage;
    private String mentorName;
    private Integer eligibleInMonths;
    private CareerPlanStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
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
    public CareerPlanStatus getStatus() { return status; }
    public void setStatus(CareerPlanStatus status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}