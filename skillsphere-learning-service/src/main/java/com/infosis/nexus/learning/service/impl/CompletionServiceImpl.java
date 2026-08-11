package com.infosis.nexus.learning.service.impl;

import com.infosis.nexus.learning.dto.CompletionResponse;
import com.infosis.nexus.learning.dto.ProgressUpdateRequest;
import com.infosis.nexus.learning.entity.Enrollment;
import com.infosis.nexus.learning.entity.EnrollmentStatus;
import com.infosis.nexus.learning.exception.ResourceNotFoundException;
import com.infosis.nexus.learning.repository.EnrollmentRepository;
import com.infosis.nexus.learning.service.CompletionService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CompletionServiceImpl implements CompletionService {

    private final EnrollmentRepository enrollmentRepository;

    public CompletionServiceImpl(EnrollmentRepository enrollmentRepository) {
        this.enrollmentRepository = enrollmentRepository;
    }

    @Override
    public CompletionResponse updateProgress(Long enrollmentId, ProgressUpdateRequest request) {
        Enrollment enrollment = findEnrollment(enrollmentId);

        enrollment.setProgressPercentage(request.getProgressPercentage());

        if (request.getScore() != null) {
            enrollment.setScore(request.getScore());
        }

        if (request.getProgressPercentage() >= 100.0) {
            enrollment.setCompletionStatus(EnrollmentStatus.COMPLETED);
            enrollment.setCompletionDate(LocalDateTime.now());
        } else if (request.getProgressPercentage() > 0.0) {
            enrollment.setCompletionStatus(EnrollmentStatus.IN_PROGRESS);
        }

        Enrollment saved = enrollmentRepository.save(enrollment);
        return toResponse(saved);
    }

    @Override
    public CompletionResponse getByEnrollmentId(Long enrollmentId) {
        return toResponse(findEnrollment(enrollmentId));
    }

    @Override
    public List<CompletionResponse> getByEmployeeId(Long employeeId) {
        return enrollmentRepository.findByEmployeeId(employeeId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<CompletionResponse> getByCourseId(Long courseId) {
        return enrollmentRepository.findAll().stream()
                .filter(e -> e.getCourse().getId().equals(courseId))
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<CompletionResponse> getAllCompleted() {
        return enrollmentRepository.findAll().stream()
                .filter(e -> e.getCompletionStatus() == EnrollmentStatus.COMPLETED)
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private Enrollment findEnrollment(Long id) {
        return enrollmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment not found with id: " + id));
    }

    private CompletionResponse toResponse(Enrollment e) {
        return new CompletionResponse(
                e.getId(),
                e.getEmployeeId(),
                e.getCourse().getId(),
                e.getCourse().getCourseTitle(),
                e.getProgressPercentage(),
                e.getCompletionStatus(),
                e.getScore(),
                e.getCompletionDate()
        );
    }
}