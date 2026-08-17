package com.infosis.nexus.career.controller;

import com.infosis.nexus.career.dto.*;
import com.infosis.nexus.career.service.JobOpeningService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/job-openings")
public class JobOpeningController {

    private final JobOpeningService service;

    public JobOpeningController(JobOpeningService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public JobOpeningResponse create(@Valid @RequestBody JobOpeningRequest req) {
        return service.create(req);
    }

    @GetMapping
    public List<JobOpeningResponse> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public JobOpeningResponse getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public JobOpeningResponse update(@PathVariable Long id, @Valid @RequestBody JobOpeningRequest req) {
        return service.update(id, req);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/matches/employee/{employeeId}")
    public List<JobMatchResponse> getMatches(@PathVariable Long employeeId) {
        return service.getMatchesForEmployee(employeeId);
    }
}