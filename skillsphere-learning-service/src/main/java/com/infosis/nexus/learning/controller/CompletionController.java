package com.infosis.nexus.learning.controller;

import com.infosis.nexus.learning.dto.CompletionResponse;
import com.infosis.nexus.learning.dto.ProgressUpdateRequest;
import com.infosis.nexus.learning.service.CompletionService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/completions")
public class CompletionController {

    private final CompletionService completionService;

    public CompletionController(CompletionService completionService) {
        this.completionService = completionService;
    }

    @PatchMapping("/{enrollmentId}/progress")
    public ResponseEntity<CompletionResponse> updateProgress(@PathVariable Long enrollmentId,
                                                             @Valid @RequestBody ProgressUpdateRequest request) {
        return ResponseEntity.ok(completionService.updateProgress(enrollmentId, request));
    }

    @GetMapping("/{enrollmentId}")
    public ResponseEntity<CompletionResponse> getByEnrollmentId(@PathVariable Long enrollmentId) {
        return ResponseEntity.ok(completionService.getByEnrollmentId(enrollmentId));
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<CompletionResponse>> getByEmployeeId(@PathVariable Long employeeId) {
        return ResponseEntity.ok(completionService.getByEmployeeId(employeeId));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<CompletionResponse>> getByCourseId(@PathVariable Long courseId) {
        return ResponseEntity.ok(completionService.getByCourseId(courseId));
    }

    @GetMapping("/completed")
    public ResponseEntity<List<CompletionResponse>> getAllCompleted() {
        return ResponseEntity.ok(completionService.getAllCompleted());
    }
}