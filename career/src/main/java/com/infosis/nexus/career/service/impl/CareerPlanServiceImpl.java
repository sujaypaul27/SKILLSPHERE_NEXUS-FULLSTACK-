package com.infosis.nexus.career.service.impl;

import com.infosis.nexus.career.dto.*;
import com.infosis.nexus.career.entity.CareerPlan;
import com.infosis.nexus.career.exception.ResourceNotFoundException;
import com.infosis.nexus.career.mapper.CareerPlanMapper;
import com.infosis.nexus.career.repository.CareerPlanRepository;
import com.infosis.nexus.career.service.CareerPlanService;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CareerPlanServiceImpl implements CareerPlanService {

    private final CareerPlanRepository repository;
    private final CareerPlanMapper mapper;

    public CareerPlanServiceImpl(CareerPlanRepository repository, CareerPlanMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public CareerPlanResponse create(CareerPlanRequest req) {
        CareerPlan saved = repository.save(mapper.toEntity(req));
        return mapper.toResponse(saved);
    }

    @Override
    public CareerPlanResponse getById(Long id) {
        return mapper.toResponse(find(id));
    }

    @Override
    public List<CareerPlanResponse> getAll() {
        return repository.findAll().stream().map(mapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public List<CareerPlanResponse> getByEmployee(Long employeeId) {
        return repository.findByEmployeeId(employeeId).stream().map(mapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public CareerPlanResponse update(Long id, CareerPlanRequest req) {
        CareerPlan c = find(id);
        c.setCurrentRole(req.getCurrentRole());
        c.setTargetRole(req.getTargetRole());
        c.setMentorName(req.getMentorName());
        c.setEligibleInMonths(req.getEligibleInMonths());
        return mapper.toResponse(repository.save(c));
    }

    @Override
    public void delete(Long id) {
        repository.delete(find(id));
    }

    @Override
    public CareerPlanResponse updateProgress(Long id, Double progress) {
        CareerPlan c = find(id);
        c.setProgressPercentage(progress);
        if (progress >= 100.0) c.setStatus(com.infosis.nexus.career.entity.CareerPlanStatus.COMPLETED);
        return mapper.toResponse(repository.save(c));
    }

    private CareerPlan find(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CareerPlan not found: " + id));
    }
}