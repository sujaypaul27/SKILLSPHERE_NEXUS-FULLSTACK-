package com.infosis.nexus.learning.dto;

public class LearningPathProgressResponse {

    private Long learningPathId;
    private String learningPathName;
    private Long employeeId;
    private int totalCourses;
    private int completedCourses;
    private double progressPercentage;

    public LearningPathProgressResponse(Long learningPathId, String learningPathName, Long employeeId,
                                        int totalCourses, int completedCourses, double progressPercentage) {
        this.learningPathId = learningPathId;
        this.learningPathName = learningPathName;
        this.employeeId = employeeId;
        this.totalCourses = totalCourses;
        this.completedCourses = completedCourses;
        this.progressPercentage = progressPercentage;
    }

    public Long getLearningPathId() { return learningPathId; }
    public String getLearningPathName() { return learningPathName; }
    public Long getEmployeeId() { return employeeId; }
    public int getTotalCourses() { return totalCourses; }
    public int getCompletedCourses() { return completedCourses; }
    public double getProgressPercentage() { return progressPercentage; }
}