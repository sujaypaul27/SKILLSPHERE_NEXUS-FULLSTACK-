package com.infosis.nexus.learning.service.impl;

import com.infosis.nexus.learning.dto.EnrollmentRequest;
import com.infosis.nexus.learning.dto.EnrollmentResponse;
import com.infosis.nexus.learning.entity.Course;
import com.infosis.nexus.learning.entity.Enrollment;
import com.infosis.nexus.learning.exception.DuplicateResourceException;
import com.infosis.nexus.learning.exception.ResourceNotFoundException;
import com.infosis.nexus.learning.mapper.EnrollmentMapper;
import com.infosis.nexus.learning.repository.CourseRepository;
import com.infosis.nexus.learning.repository.EnrollmentRepository;
import com.infosis.nexus.learning.service.EnrollmentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EnrollmentServiceImpl implements EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentMapper enrollmentMapper;

    public EnrollmentServiceImpl(EnrollmentRepository enrollmentRepository,
                                 CourseRepository courseRepository,
                                 EnrollmentMapper enrollmentMapper) {
        this.enrollmentRepository = enrollmentRepository;
        this.courseRepository = courseRepository;
        this.enrollmentMapper = enrollmentMapper;
    }

    @Override
    public EnrollmentResponse create(EnrollmentRequest request) {
        if (enrollmentRepository.existsByEmployeeIdAndCourse_Id(request.getEmployeeId(), request.getCourseId())) {
            throw new DuplicateResourceException("Employee already enrolled in this course");
        }
        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + request.getCourseId()));

        Enrollment enrollment = new Enrollment();
        enrollment.setEmployeeId(request.getEmployeeId());
        enrollment.setCourse(course);

        return enrollmentMapper.toResponse(enrollmentRepository.save(enrollment));
    }

    @Override
    public EnrollmentResponse getById(Long id) {
        return enrollmentMapper.toResponse(findEntity(id));
    }

    @Override
    public List<EnrollmentResponse> getAll() {
        return enrollmentRepository.findAll().stream().map(enrollmentMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public List<EnrollmentResponse> getByEmployeeId(Long employeeId) {
        return enrollmentRepository.findByEmployeeId(employeeId).stream().map(enrollmentMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public EnrollmentResponse update(Long id, EnrollmentRequest request) {
        Enrollment enrollment = findEntity(id);
        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + request.getCourseId()));
        enrollment.setEmployeeId(request.getEmployeeId());
        enrollment.setCourse(course);
        return enrollmentMapper.toResponse(enrollmentRepository.save(enrollment));
    }

    @Override
    public void delete(Long id) {
        enrollmentRepository.delete(findEntity(id));
    }

    private Enrollment findEntity(Long id) {
        return enrollmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment not found with id: " + id));
    }
}