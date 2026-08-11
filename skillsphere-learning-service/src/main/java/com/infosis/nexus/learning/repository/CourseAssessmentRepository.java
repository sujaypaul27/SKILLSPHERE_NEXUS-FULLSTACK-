package com.infosis.nexus.learning.repository;

import com.infosis.nexus.learning.entity.CourseAssessment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseAssessmentRepository extends JpaRepository<CourseAssessment, Long> {
    List<CourseAssessment> findByEmployeeId(Long employeeId);
    List<CourseAssessment> findByCourse_Id(Long courseId);
}