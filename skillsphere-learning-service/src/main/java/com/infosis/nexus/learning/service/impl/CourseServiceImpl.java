package com.infosis.nexus.learning.service.impl;

import com.infosis.nexus.learning.dto.CourseRequest;
import com.infosis.nexus.learning.dto.CourseResponse;
import com.infosis.nexus.learning.entity.Course;
import com.infosis.nexus.learning.exception.DuplicateResourceException;
import com.infosis.nexus.learning.exception.ResourceNotFoundException;
import com.infosis.nexus.learning.mapper.CourseMapper;
import com.infosis.nexus.learning.repository.CourseRepository;
import com.infosis.nexus.learning.service.CourseService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;

    public CourseServiceImpl(CourseRepository courseRepository, CourseMapper courseMapper) {
        this.courseRepository = courseRepository;
        this.courseMapper = courseMapper;
    }

    @Override
    public CourseResponse create(CourseRequest request) {
        if (courseRepository.existsByCourseCode(request.getCourseCode())) {
            throw new DuplicateResourceException("Course already exists with code: " + request.getCourseCode());
        }
        Course saved = courseRepository.save(courseMapper.toEntity(request));
        return courseMapper.toResponse(saved);
    }

    @Override
    public CourseResponse getById(Long id) {
        return courseMapper.toResponse(findEntity(id));
    }

    @Override
    public List<CourseResponse> getAll() {
        return courseRepository.findAll().stream().map(courseMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public CourseResponse update(Long id, CourseRequest request) {
        Course course = findEntity(id);
        course.setCourseCode(request.getCourseCode());
        course.setCourseTitle(request.getCourseTitle());
        course.setDescription(request.getDescription());
        course.setInstructor(request.getInstructor());
        course.setCategory(request.getCategory());
        course.setCourseType(request.getCourseType());
        course.setDifficultyLevel(request.getDifficultyLevel());
        course.setDurationHours(request.getDurationHours());
        course.setTotalModules(request.getTotalModules());
        course.setMaxScore(request.getMaxScore());
        course.setPassingScore(request.getPassingScore());
        course.setRating(request.getRating());
        course.setStatus(request.getStatus());
        return courseMapper.toResponse(courseRepository.save(course));
    }

    @Override
    public void delete(Long id) {
        courseRepository.delete(findEntity(id));
    }

    private Course findEntity(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
    }
}