package com.infosis.nexus.career.repository;

import com.infosis.nexus.career.entity.CareerPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CareerPlanRepository extends JpaRepository<CareerPlan, Long> {
    List<CareerPlan> findByEmployeeId(Long employeeId);
}