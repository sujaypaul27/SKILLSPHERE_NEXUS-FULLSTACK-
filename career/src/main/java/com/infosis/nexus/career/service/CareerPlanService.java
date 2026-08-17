package com.infosis.nexus.career.service;

import com.infosis.nexus.career.dto.*;
import java.util.List;

public interface CareerPlanService {
    CareerPlanResponse create(CareerPlanRequest req);
    CareerPlanResponse getById(Long id);
    List<CareerPlanResponse> getAll();
    List<CareerPlanResponse> getByEmployee(Long employeeId);
    CareerPlanResponse update(Long id, CareerPlanRequest req);
    void delete(Long id);
    CareerPlanResponse updateProgress(Long id, Double progress);
}