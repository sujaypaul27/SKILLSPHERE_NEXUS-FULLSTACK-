package com.infosis.nexus.learning.service;

import com.infosis.nexus.learning.dto.LearningPathProgressResponse;
import com.infosis.nexus.learning.dto.LearningPathRequest;
import com.infosis.nexus.learning.dto.LearningPathResponse;

import java.util.List;

public interface LearningPathService {
    LearningPathResponse create(LearningPathRequest request);
    LearningPathResponse getById(Long id);
    List<LearningPathResponse> getAll();
    LearningPathResponse update(Long id, LearningPathRequest request);
    void delete(Long id);
    LearningPathProgressResponse getProgress(Long learningPathId, Long employeeId);
}