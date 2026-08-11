package com.infosis.nexus.learning.controller;

import com.infosis.nexus.learning.dto.CourseAssessmentRequest;
import com.infosis.nexus.learning.dto.CourseAssessmentResponse;
import com.infosis.nexus.learning.service.CourseAssessmentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/course-assessments")
public class CourseAssessmentController {

    private final CourseAssessmentService assessmentService;

    public CourseAssessmentController(CourseAssessmentService assessmentService) {
        this.assessmentService = assessmentService;
    }

    @PostMapping
    public ResponseEntity<CourseAssessmentResponse> create(@Valid @RequestBody CourseAssessmentRequest request) {
        return new ResponseEntity<>(assessmentService.create(request), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseAssessmentResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(assessmentService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<CourseAssessmentResponse>> getAll() {
        return ResponseEntity.ok(assessmentService.getAll());
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<CourseAssessmentResponse>> getByEmployeeId(@PathVariable Long employeeId) {
        return ResponseEntity.ok(assessmentService.getByEmployeeId(employeeId));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<CourseAssessmentResponse>> getByCourseId(@PathVariable Long courseId) {
        return ResponseEntity.ok(assessmentService.getByCourseId(courseId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        assessmentService.delete(id);
        return ResponseEntity.noContent().build();
    }
}