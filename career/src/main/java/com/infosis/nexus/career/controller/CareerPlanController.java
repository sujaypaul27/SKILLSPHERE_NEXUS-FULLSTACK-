package com.infosis.nexus.career.controller;

import com.infosis.nexus.career.dto.*;
import com.infosis.nexus.career.service.CareerPlanService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/career-plans")
public class CareerPlanController {

    private final CareerPlanService service;

    public CareerPlanController(CareerPlanService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CareerPlanResponse create(@Valid @RequestBody CareerPlanRequest req) {
        return service.create(req);
    }

    @GetMapping
    public List<CareerPlanResponse> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public CareerPlanResponse getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @GetMapping("/employee/{employeeId}")
    public List<CareerPlanResponse> getByEmployee(@PathVariable Long employeeId) {
        return service.getByEmployee(employeeId);
    }

    @PutMapping("/{id}")
    public CareerPlanResponse update(@PathVariable Long id, @Valid @RequestBody CareerPlanRequest req) {
        return service.update(id, req);
    }

    @PatchMapping("/{id}/progress")
    public CareerPlanResponse updateProgress(@PathVariable Long id, @RequestBody ProgressRequest body) {
        return service.updateProgress(id, body.getProgressPercentage());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    public static class ProgressRequest {
        private Double progressPercentage;
        public Double getProgressPercentage() { return progressPercentage; }
        public void setProgressPercentage(Double progressPercentage) { this.progressPercentage = progressPercentage; }
    }
}