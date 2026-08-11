package com.infosis.nexus.learning.repository;

import com.infosis.nexus.learning.entity.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CertificateRepository extends JpaRepository<Certificate, Long> {
    List<Certificate> findByEmployeeId(Long employeeId);
    List<Certificate> findByCourse_Id(Long courseId);
    Optional<Certificate> findByEnrollmentId(Long enrollmentId);
    boolean existsByEnrollmentId(Long enrollmentId);
}