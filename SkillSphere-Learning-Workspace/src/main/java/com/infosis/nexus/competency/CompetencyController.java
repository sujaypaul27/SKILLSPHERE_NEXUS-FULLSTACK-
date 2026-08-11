package com.infosis.nexus.competency;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/competencies")
@CrossOrigin(origins = "http://localhost:5173")
public class CompetencyController {

    private final CompetencyService competencyService;

    public CompetencyController(CompetencyService competencyService) {
        this.competencyService = competencyService;
    }

    @GetMapping
    public ResponseEntity<List<Competency>> getAllCompetencies() {
        return ResponseEntity.ok(
                competencyService.getAllCompetencies()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Competency> getCompetencyById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                competencyService.getCompetencyById(id)
        );
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Competency>> getByEmployee(
            @PathVariable Long employeeId) {

        return ResponseEntity.ok(
                competencyService.getCompetenciesByEmployee(employeeId)
        );
    }

    @PostMapping
    public ResponseEntity<Competency> createCompetency(
            @RequestBody Competency competency) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(competencyService.createCompetency(competency));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Competency> updateCompetency(
            @PathVariable Long id,
            @RequestBody Competency competency) {

        return ResponseEntity.ok(
                competencyService.updateCompetency(id, competency)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompetency(
            @PathVariable Long id) {

        competencyService.deleteCompetency(id);

        return ResponseEntity.noContent().build();
    }
}