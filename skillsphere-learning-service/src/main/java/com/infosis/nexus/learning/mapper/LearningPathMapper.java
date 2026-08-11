package com.infosis.nexus.learning.mapper;

import com.infosis.nexus.learning.dto.CourseResponse;
import com.infosis.nexus.learning.dto.LearningPathResponse;
import com.infosis.nexus.learning.entity.Course;
import com.infosis.nexus.learning.entity.LearningPath;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class LearningPathMapper {

    private final CourseMapper courseMapper;

    public LearningPathMapper(CourseMapper courseMapper) {
        this.courseMapper = courseMapper;
    }

    public LearningPathResponse toResponse(LearningPath entity) {
        LearningPathResponse response = new LearningPathResponse();
        response.setId(entity.getId());
        response.setName(entity.getName());
        response.setDescription(entity.getDescription());
        response.setCareerTrack(entity.getCareerTrack());
        response.setCreatedAt(entity.getCreatedAt());
        response.setUpdatedAt(entity.getUpdatedAt());
        response.setCourses(
                entity.getCourses().stream()
                        .map(courseMapper::toResponse)
                        .collect(Collectors.toSet())
        );
        return response;
    }
}