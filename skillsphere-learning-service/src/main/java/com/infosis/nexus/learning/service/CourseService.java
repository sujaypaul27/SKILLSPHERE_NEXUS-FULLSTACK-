package com.infosis.nexus.learning.service;

import com.infosis.nexus.learning.dto.CourseRequest;
import com.infosis.nexus.learning.dto.CourseResponse;

import java.util.List;

public interface CourseService {
    CourseResponse create(CourseRequest request);
    CourseResponse getById(Long id);
    List<CourseResponse> getAll();
    CourseResponse update(Long id, CourseRequest request);
    void delete(Long id);
}