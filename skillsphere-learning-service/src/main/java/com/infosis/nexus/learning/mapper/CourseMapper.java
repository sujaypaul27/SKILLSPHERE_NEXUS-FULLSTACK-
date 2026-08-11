package com.infosis.nexus.learning.mapper;

import com.infosis.nexus.learning.dto.CourseRequest;
import com.infosis.nexus.learning.dto.CourseResponse;
import com.infosis.nexus.learning.entity.Course;
import org.springframework.stereotype.Component;

@Component
public class CourseMapper {

    public Course toEntity(CourseRequest request) {
        Course course = new Course();
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
        course.setStatus(request.getStatus() != null ? request.getStatus() : "ACTIVE");
        return course;
    }

    public CourseResponse toResponse(Course course) {
        CourseResponse response = new CourseResponse();
        response.setId(course.getId());
        response.setCourseCode(course.getCourseCode());
        response.setCourseTitle(course.getCourseTitle());
        response.setDescription(course.getDescription());
        response.setInstructor(course.getInstructor());
        response.setCategory(course.getCategory());
        response.setCourseType(course.getCourseType());
        response.setDifficultyLevel(course.getDifficultyLevel());
        response.setDurationHours(course.getDurationHours());
        response.setTotalModules(course.getTotalModules());
        response.setMaxScore(course.getMaxScore());
        response.setPassingScore(course.getPassingScore());
        response.setRating(course.getRating());
        response.setStatus(course.getStatus());
        response.setCreatedAt(course.getCreatedAt());
        response.setUpdatedAt(course.getUpdatedAt());
        return response;
    }
}