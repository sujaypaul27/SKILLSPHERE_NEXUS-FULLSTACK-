package com.infosis.nexus.learning.controller;

import com.infosis.nexus.learning.dto.LearningPathProgressResponse;
import com.infosis.nexus.learning.dto.LearningPathRequest;
import com.infosis.nexus.learning.dto.LearningPathResponse;
import com.infosis.nexus.learning.service.LearningPathService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/learning-paths")
public class LearningPathController {

    private final LearningPathService learningPathService;

    public LearningPathController(LearningPathService learningPathService) {
        this.learningPathService = learningPathService;
    }

    @PostMapping
    public ResponseEntity<LearningPathResponse> create(@Valid @RequestBody LearningPathRequest request) {
        return new ResponseEntity<>(learningPathService.create(request), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LearningPathResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(learningPathService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<LearningPathResponse>> getAll() {
        return ResponseEntity.ok(learningPathService.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<LearningPathResponse> update(@PathVariable Long id, @Valid @RequestBody LearningPathRequest request) {
        return ResponseEntity.ok(learningPathService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        learningPathService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/progress/{employeeId}")
    public ResponseEntity<LearningPathProgressResponse> getProgress(@PathVariable Long id, @PathVariable Long employeeId) {
        return ResponseEntity.ok(learningPathService.getProgress(id, employeeId));
    }
}