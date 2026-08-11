package com.infosis.nexus.learning.service.impl;

import com.infosis.nexus.learning.dto.LearningPathProgressResponse;
import com.infosis.nexus.learning.dto.LearningPathRequest;
import com.infosis.nexus.learning.dto.LearningPathResponse;
import com.infosis.nexus.learning.entity.Course;
import com.infosis.nexus.learning.entity.Enrollment;
import com.infosis.nexus.learning.entity.EnrollmentStatus;
import com.infosis.nexus.learning.entity.LearningPath;
import com.infosis.nexus.learning.exception.DuplicateResourceException;
import com.infosis.nexus.learning.exception.ResourceNotFoundException;
import com.infosis.nexus.learning.mapper.LearningPathMapper;
import com.infosis.nexus.learning.repository.CourseRepository;
import com.infosis.nexus.learning.repository.EnrollmentRepository;
import com.infosis.nexus.learning.repository.LearningPathRepository;
import com.infosis.nexus.learning.service.LearningPathService;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class LearningPathServiceImpl implements LearningPathService {

    private final LearningPathRepository learningPathRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final LearningPathMapper learningPathMapper;

    public LearningPathServiceImpl(LearningPathRepository learningPathRepository,
                                   CourseRepository courseRepository,
                                   EnrollmentRepository enrollmentRepository,
                                   LearningPathMapper learningPathMapper) {
        this.learningPathRepository = learningPathRepository;
        this.courseRepository = courseRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.learningPathMapper = learningPathMapper;
    }

    @Override
    public LearningPathResponse create(LearningPathRequest request) {
        if (learningPathRepository.existsByNameIgnoreCase(request.getName())) {
            throw new DuplicateResourceException("Learning path already exists with name: " + request.getName());
        }

        LearningPath entity = new LearningPath();
        entity.setName(request.getName());
        entity.setDescription(request.getDescription());
        entity.setCareerTrack(request.getCareerTrack());
        entity.setCourses(resolveCourses(request.getCourseIds()));

        LearningPath saved = learningPathRepository.save(entity);
        return learningPathMapper.toResponse(saved);
    }

    @Override
    public LearningPathResponse getById(Long id) {
        LearningPath entity = findEntity(id);
        return learningPathMapper.toResponse(entity);
    }

    @Override
    public List<LearningPathResponse> getAll() {
        return learningPathRepository.findAll().stream()
                .map(learningPathMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public LearningPathResponse update(Long id, LearningPathRequest request) {
        LearningPath entity = findEntity(id);
        entity.setName(request.getName());
        entity.setDescription(request.getDescription());
        entity.setCareerTrack(request.getCareerTrack());
        entity.setCourses(resolveCourses(request.getCourseIds()));

        LearningPath updated = learningPathRepository.save(entity);
        return learningPathMapper.toResponse(updated);
    }

    @Override
    public void delete(Long id) {
        LearningPath entity = findEntity(id);
        learningPathRepository.delete(entity);
    }

    @Override
    public LearningPathProgressResponse getProgress(Long learningPathId, Long employeeId) {
        LearningPath path = findEntity(learningPathId);
        Set<Long> pathCourseIds = path.getCourses().stream()
                .map(Course::getId)
                .collect(Collectors.toSet());

        int total = pathCourseIds.size();

        List<Enrollment> employeeEnrollments = enrollmentRepository.findByEmployeeId(employeeId);
        long completed = employeeEnrollments.stream()
                .filter(e -> pathCourseIds.contains(e.getCourse().getId()))
                .filter(e -> e.getCompletionStatus() == EnrollmentStatus.COMPLETED)
                .count();

        double percentage = total == 0 ? 0.0 : (completed * 100.0) / total;
        percentage = Math.round(percentage * 100.0) / 100.0;

        return new LearningPathProgressResponse(
                path.getId(), path.getName(), employeeId, total, (int) completed, percentage
        );
    }

    private Set<Course> resolveCourses(Set<Long> courseIds) {
        Set<Course> courses = new HashSet<>();
        for (Long courseId : courseIds) {
            Course course = courseRepository.findById(courseId)
                    .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));
            courses.add(course);
        }
        return courses;
    }

    private LearningPath findEntity(Long id) {
        return learningPathRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Learning path not found with id: " + id));
    }
}