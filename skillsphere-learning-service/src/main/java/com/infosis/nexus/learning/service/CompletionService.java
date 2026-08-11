package com.infosis.nexus.learning.service;

import com.infosis.nexus.learning.dto.CompletionResponse;
import com.infosis.nexus.learning.dto.ProgressUpdateRequest;

import java.util.List;

public interface CompletionService {
    CompletionResponse updateProgress(Long enrollmentId, ProgressUpdateRequest request);
    CompletionResponse getByEnrollmentId(Long enrollmentId);
    List<CompletionResponse> getByEmployeeId(Long employeeId);
    List<CompletionResponse> getByCourseId(Long courseId);
    List<CompletionResponse> getAllCompleted();
}