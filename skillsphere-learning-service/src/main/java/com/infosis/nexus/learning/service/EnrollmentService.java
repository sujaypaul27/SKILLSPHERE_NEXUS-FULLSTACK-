package com.infosis.nexus.learning.service;

import com.infosis.nexus.learning.dto.EnrollmentRequest;
import com.infosis.nexus.learning.dto.EnrollmentResponse;

import java.util.List;

public interface EnrollmentService {
    EnrollmentResponse create(EnrollmentRequest request);
    EnrollmentResponse getById(Long id);
    List<EnrollmentResponse> getAll();
    List<EnrollmentResponse> getByEmployeeId(Long employeeId);
    EnrollmentResponse update(Long id, EnrollmentRequest request);
    void delete(Long id);
}