package com.infosis.nexus.learning.repository;

import com.infosis.nexus.learning.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByEmployeeId(Long employeeId);
    List<Enrollment> findByCourse_Id(Long courseId);
    boolean existsByEmployeeIdAndCourse_Id(Long employeeId, Long courseId);
}