package com.infosis.nexus.certification;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface CertificationRepository extends JpaRepository<Certification, Long> {
    List<Certification> findByExpiryDateBetween(java.time.LocalDate start, java.time.LocalDate end);
    List<Certification> findByExpiryDateBefore(java.time.LocalDate date);
    List<Certification> findByEmployeeid(Long employeeId);
    long countByStatus(String status);
}