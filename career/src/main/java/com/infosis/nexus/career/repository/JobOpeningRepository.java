package com.infosis.nexus.career.repository;

import com.infosis.nexus.career.entity.JobOpening;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobOpeningRepository extends JpaRepository<JobOpening, Long> {
}