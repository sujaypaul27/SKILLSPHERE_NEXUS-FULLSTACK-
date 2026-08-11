package com.infosis.nexus.learning.service;

import com.infosis.nexus.learning.dto.CertificateResponse;

import java.util.List;

public interface CertificateService {
    CertificateResponse generate(Long enrollmentId);
    CertificateResponse getById(Long id);
    List<CertificateResponse> getByEmployeeId(Long employeeId);
    List<CertificateResponse> getByCourseId(Long courseId);
    List<CertificateResponse> getAll();
}