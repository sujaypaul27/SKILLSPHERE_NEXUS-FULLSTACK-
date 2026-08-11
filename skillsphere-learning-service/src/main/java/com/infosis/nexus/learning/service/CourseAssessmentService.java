package com.infosis.nexus.learning.service;

import com.infosis.nexus.learning.dto.CourseAssessmentRequest;
import com.infosis.nexus.learning.dto.CourseAssessmentResponse;

import java.util.List;

public interface CourseAssessmentService {
    CourseAssessmentResponse create(CourseAssessmentRequest request);
    CourseAssessmentResponse getById(Long id);
    List<CourseAssessmentResponse> getAll();
    List<CourseAssessmentResponse> getByEmployeeId(Long employeeId);
    List<CourseAssessmentResponse> getByCourseId(Long courseId);
    void delete(Long id);
}