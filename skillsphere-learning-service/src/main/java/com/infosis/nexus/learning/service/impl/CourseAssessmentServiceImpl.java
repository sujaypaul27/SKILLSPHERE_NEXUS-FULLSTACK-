package com.infosis.nexus.learning.service.impl;

import com.infosis.nexus.learning.dto.CourseAssessmentRequest;
import com.infosis.nexus.learning.dto.CourseAssessmentResponse;
import com.infosis.nexus.learning.entity.Course;
import com.infosis.nexus.learning.entity.CourseAssessment;
import com.infosis.nexus.learning.exception.ResourceNotFoundException;
import com.infosis.nexus.learning.repository.CourseAssessmentRepository;
import com.infosis.nexus.learning.repository.CourseRepository;
import com.infosis.nexus.learning.service.CourseAssessmentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseAssessmentServiceImpl implements CourseAssessmentService {

    private final CourseAssessmentRepository assessmentRepository;
    private final CourseRepository courseRepository;

    public CourseAssessmentServiceImpl(CourseAssessmentRepository assessmentRepository,
                                       CourseRepository courseRepository) {
        this.assessmentRepository = assessmentRepository;
        this.courseRepository = courseRepository;
    }

    @Override
    public CourseAssessmentResponse create(CourseAssessmentRequest request) {
        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + request.getCourseId()));

        CourseAssessment entity = new CourseAssessment();
        entity.setEmployeeId(request.getEmployeeId());
        entity.setCourse(course);
        entity.setAssessmentName(request.getAssessmentName());
        entity.setScore(request.getScore());
        entity.setMaxScore(request.getMaxScore());
        entity.setPassed(computePassed(request.getScore(), request.getMaxScore()));

        CourseAssessment saved = assessmentRepository.save(entity);
        return toResponse(saved);
    }

    @Override
    public CourseAssessmentResponse getById(Long id) {
        return toResponse(findEntity(id));
    }

    @Override
    public List<CourseAssessmentResponse> getAll() {
        return assessmentRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public List<CourseAssessmentResponse> getByEmployeeId(Long employeeId) {
        return assessmentRepository.findByEmployeeId(employeeId).stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public List<CourseAssessmentResponse> getByCourseId(Long courseId) {
        return assessmentRepository.findByCourse_Id(courseId).stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        assessmentRepository.delete(findEntity(id));
    }

    private boolean computePassed(double score, double maxScore) {
        double percentage = (score / maxScore) * 100.0;
        return percentage >= 60.0;
    }

    private CourseAssessment findEntity(Long id) {
        return assessmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course assessment not found with id: " + id));
    }

    private CourseAssessmentResponse toResponse(CourseAssessment e) {
        double percentage = Math.round((e.getScore() / e.getMaxScore()) * 10000.0) / 100.0;
        return new CourseAssessmentResponse(
                e.getId(), e.getEmployeeId(), e.getCourse().getId(), e.getCourse().getCourseTitle(),
                e.getAssessmentName(), e.getScore(), e.getMaxScore(), percentage, e.getPassed(), e.getAssessmentDate()
        );
    }
}