package com.infosis.nexus.learning.service.impl;

import com.infosis.nexus.learning.dto.CertificateResponse;
import com.infosis.nexus.learning.entity.Certificate;
import com.infosis.nexus.learning.entity.CertificateStatus;
import com.infosis.nexus.learning.entity.Enrollment;
import com.infosis.nexus.learning.entity.EnrollmentStatus;
import com.infosis.nexus.learning.exception.DuplicateResourceException;
import com.infosis.nexus.learning.exception.ResourceNotFoundException;
import com.infosis.nexus.learning.repository.CertificateRepository;
import com.infosis.nexus.learning.repository.EnrollmentRepository;
import com.infosis.nexus.learning.service.CertificateService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CertificateServiceImpl implements CertificateService {

    private final CertificateRepository certificateRepository;
    private final EnrollmentRepository enrollmentRepository;

    public CertificateServiceImpl(CertificateRepository certificateRepository,
                                  EnrollmentRepository enrollmentRepository) {
        this.certificateRepository = certificateRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    @Override
    public CertificateResponse generate(Long enrollmentId) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment not found with id: " + enrollmentId));

        if (enrollment.getCompletionStatus() != EnrollmentStatus.COMPLETED) {
            throw new IllegalStateException("Certificate cannot be generated: course not completed");
        }

        if (certificateRepository.existsByEnrollmentId(enrollmentId)) {
            throw new DuplicateResourceException("Certificate already generated for enrollment id: " + enrollmentId);
        }

        Certificate certificate = new Certificate();
        certificate.setEmployeeId(enrollment.getEmployeeId());
        certificate.setCourse(enrollment.getCourse());
        certificate.setEnrollmentId(enrollmentId);
        certificate.setCertificateNumber(generateCertificateNumber());
        certificate.setScore(enrollment.getScore() != null ? enrollment.getScore() : 0.0);
        certificate.setStatus(CertificateStatus.ISSUED);

        Certificate saved = certificateRepository.save(certificate);
        return toResponse(saved);
    }

    @Override
    public CertificateResponse getById(Long id) {
        return toResponse(findEntity(id));
    }

    @Override
    public List<CertificateResponse> getByEmployeeId(Long employeeId) {
        return certificateRepository.findByEmployeeId(employeeId).stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public List<CertificateResponse> getByCourseId(Long courseId) {
        return certificateRepository.findByCourse_Id(courseId).stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public List<CertificateResponse> getAll() {
        return certificateRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    private String generateCertificateNumber() {
        return "CERT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    private Certificate findEntity(Long id) {
        return certificateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Certificate not found with id: " + id));
    }

    private CertificateResponse toResponse(Certificate c) {
        return new CertificateResponse(
                c.getId(), c.getEmployeeId(), c.getCourse().getId(), c.getCourse().getCourseTitle(),
                c.getEnrollmentId(), c.getCertificateNumber(), c.getScore(), c.getStatus(), c.getIssueDate()
        );
    }
}