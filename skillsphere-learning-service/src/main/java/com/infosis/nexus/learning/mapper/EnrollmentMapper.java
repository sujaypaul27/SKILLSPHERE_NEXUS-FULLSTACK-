package com.infosis.nexus.learning.mapper;

import com.infosis.nexus.learning.dto.EnrollmentResponse;
import com.infosis.nexus.learning.entity.Enrollment;
import org.springframework.stereotype.Component;

@Component
public class EnrollmentMapper {

    public EnrollmentResponse toResponse(Enrollment e) {
        EnrollmentResponse response = new EnrollmentResponse();
        response.setId(e.getId());
        response.setEmployeeId(e.getEmployeeId());
        response.setCourseId(e.getCourse().getId());
        response.setCourseTitle(e.getCourse().getCourseTitle());
        response.setEnrollmentDate(e.getEnrollmentDate());
        response.setCompletionDate(e.getCompletionDate());
        response.setProgressPercentage(e.getProgressPercentage());
        response.setScore(e.getScore());
        response.setCompletionStatus(e.getCompletionStatus());
        response.setCreatedAt(e.getCreatedAt());
        response.setUpdatedAt(e.getUpdatedAt());
        return response;
    }
}