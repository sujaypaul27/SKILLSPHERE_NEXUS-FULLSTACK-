package com.infosis.nexus.learning.controller;

import com.infosis.nexus.learning.dto.CourseRequest;
import com.infosis.nexus.learning.dto.CourseResponse;
import com.infosis.nexus.learning.service.CourseService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @PostMapping
    public ResponseEntity<CourseResponse> create(@Valid @RequestBody CourseRequest request) {
        return new ResponseEntity<>(courseService.create(request), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(courseService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<CourseResponse>> getAll() {
        return ResponseEntity.ok(courseService.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<CourseResponse> update(@PathVariable Long id, @Valid @RequestBody CourseRequest request) {
        return ResponseEntity.ok(courseService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        courseService.delete(id);
        return ResponseEntity.noContent().build();
    }
}