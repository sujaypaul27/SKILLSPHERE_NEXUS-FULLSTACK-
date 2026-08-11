package com.infosis.nexus.learning.controller;

import com.infosis.nexus.learning.dto.CertificateResponse;
import com.infosis.nexus.learning.service.CertificateService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certificates")
public class CertificateController {

    private final CertificateService certificateService;

    public CertificateController(CertificateService certificateService) {
        this.certificateService = certificateService;
    }

    @PostMapping("/generate/{enrollmentId}")
    public ResponseEntity<CertificateResponse> generate(@PathVariable Long enrollmentId) {
        return new ResponseEntity<>(certificateService.generate(enrollmentId), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CertificateResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(certificateService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<CertificateResponse>> getAll() {
        return ResponseEntity.ok(certificateService.getAll());
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<CertificateResponse>> getByEmployeeId(@PathVariable Long employeeId) {
        return ResponseEntity.ok(certificateService.getByEmployeeId(employeeId));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<CertificateResponse>> getByCourseId(@PathVariable Long courseId) {
        return ResponseEntity.ok(certificateService.getByCourseId(courseId));
    }
}