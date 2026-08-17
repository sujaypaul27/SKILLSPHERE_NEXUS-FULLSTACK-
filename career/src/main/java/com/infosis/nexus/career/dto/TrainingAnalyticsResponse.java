package com.infosis.nexus.career.dto;

public class TrainingAnalyticsResponse {
    private Long totalCourses;
    private Long totalEnrollments;
    private Long completedEnrollments;
    private Double completionRate;
    private Double avgScore;

    public Long getTotalCourses() { return totalCourses; }
    public void setTotalCourses(Long totalCourses) { this.totalCourses = totalCourses; }
    public Long getTotalEnrollments() { return totalEnrollments; }
    public void setTotalEnrollments(Long totalEnrollments) { this.totalEnrollments = totalEnrollments; }
    public Long getCompletedEnrollments() { return completedEnrollments; }
    public void setCompletedEnrollments(Long completedEnrollments) { this.completedEnrollments = completedEnrollments; }
    public Double getCompletionRate() { return completionRate; }
    public void setCompletionRate(Double completionRate) { this.completionRate = completionRate; }
    public Double getAvgScore() { return avgScore; }
    public void setAvgScore(Double avgScore) { this.avgScore = avgScore; }
}