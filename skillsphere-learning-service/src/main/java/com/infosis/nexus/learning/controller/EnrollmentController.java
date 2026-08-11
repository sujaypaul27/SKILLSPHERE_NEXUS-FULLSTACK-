package com.infosis.nexus.learning.controller;

import com.infosis.nexus.learning.dto.EnrollmentRequest;
import com.infosis.nexus.learning.dto.EnrollmentResponse;
import com.infosis.nexus.learning.service.EnrollmentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @PostMapping
    public ResponseEntity<EnrollmentResponse> create(@Valid @RequestBody EnrollmentRequest request) {
        return new ResponseEntity<>(enrollmentService.create(request), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EnrollmentResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(enrollmentService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<EnrollmentResponse>> getAll() {
        return ResponseEntity.ok(enrollmentService.getAll());
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<EnrollmentResponse>> getByEmployeeId(@PathVariable Long employeeId) {
        return ResponseEntity.ok(enrollmentService.getByEmployeeId(employeeId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EnrollmentResponse> update(@PathVariable Long id, @Valid @RequestBody EnrollmentRequest request) {
        return ResponseEntity.ok(enrollmentService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        enrollmentService.delete(id);
        return ResponseEntity.noContent().build();
    }
}