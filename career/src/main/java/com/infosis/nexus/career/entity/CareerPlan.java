package com.infosis.nexus.career.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "career_plans")
public class CareerPlan {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long employeeId;
    @Column(name = "cur_role")
    private String currentRole;
    @Column(name = "tgt_role")
    private String targetRole;
    private Double progressPercentage;
    private String mentorName;
    private Integer eligibleInMonths;

    @Enumerated(EnumType.STRING)
    private CareerPlanStatus status;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (status == null) status = CareerPlanStatus.ACTIVE;
        if (progressPercentage == null) progressPercentage = 0.0;
    }

    @PreUpdate
    protected void onUpdate() { updatedAt = LocalDateTime.now(); }

    // getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }
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
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}