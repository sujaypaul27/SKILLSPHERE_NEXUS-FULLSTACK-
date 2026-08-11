package com.infosis.nexus.learning.repository;

import com.infosis.nexus.learning.entity.LearningPath;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LearningPathRepository extends JpaRepository<LearningPath, Long> {
    boolean existsByNameIgnoreCase(String name);
}