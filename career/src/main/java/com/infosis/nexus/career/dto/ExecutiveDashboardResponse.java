package com.infosis.nexus.career.dto;

public class ExecutiveDashboardResponse {
    private Long activeCareerPlans;
    private Long promotionsThisYear;
    private Double skillCoveragePercentage;
    private Long totalJobOpenings;
    private Long totalEnrollments;
    private Double trainingCompletionRate;

    public Long getActiveCareerPlans() { return activeCareerPlans; }
    public void setActiveCareerPlans(Long activeCareerPlans) { this.activeCareerPlans = activeCareerPlans; }
    public Long getPromotionsThisYear() { return promotionsThisYear; }
    public void setPromotionsThisYear(Long promotionsThisYear) { this.promotionsThisYear = promotionsThisYear; }
    public Double getSkillCoveragePercentage() { return skillCoveragePercentage; }
    public void setSkillCoveragePercentage(Double skillCoveragePercentage) { this.skillCoveragePercentage = skillCoveragePercentage; }
    public Long getTotalJobOpenings() { return totalJobOpenings; }
    public void setTotalJobOpenings(Long totalJobOpenings) { this.totalJobOpenings = totalJobOpenings; }
    public Long getTotalEnrollments() { return totalEnrollments; }
    public void setTotalEnrollments(Long totalEnrollments) { this.totalEnrollments = totalEnrollments; }
    public Double getTrainingCompletionRate() { return trainingCompletionRate; }
    public void setTrainingCompletionRate(Double trainingCompletionRate) { this.trainingCompletionRate = trainingCompletionRate; }
}