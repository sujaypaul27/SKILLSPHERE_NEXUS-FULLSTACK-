package com.infosis.nexus.learning.repository;

import com.infosis.nexus.learning.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
    boolean existsByCourseCode(String courseCode);
}