package com.infosis.nexus.learning.dto;

import jakarta.validation.constraints.NotNull;

public class EnrollmentRequest {

    @NotNull(message = "Employee id is required")
    private Long employeeId;

    @NotNull(message = "Course id is required")
    private Long courseId;

    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }

    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }
}