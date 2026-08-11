package com.infosis.nexus.certification;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CertificationAuditRepository extends JpaRepository<CertificationAudit, Long> {
    List<CertificationAudit> findByCertificationId(Long certificationId);
    List<CertificationAudit> findByEmployeeId(Long employeeId);
}