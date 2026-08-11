package com.infosis.nexus.competency;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompetencyService {

    private final CompetencyRepository competencyRepository;

    public CompetencyService(CompetencyRepository competencyRepository) {
        this.competencyRepository = competencyRepository;
    }

    public List<Competency> getAllCompetencies() {
        return competencyRepository.findAll();
    }

    public Competency getCompetencyById(Long id) {
        return competencyRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Competency not found with id: " + id));
    }

    public List<Competency> getCompetenciesByEmployee(Long employeeId) {
        return competencyRepository.findByEmployeeId(employeeId);
    }

    public Competency createCompetency(Competency competency) {
        return competencyRepository.save(competency);
    }

    public Competency updateCompetency(Long id, Competency updatedCompetency) {

        Competency existing = getCompetencyById(id);

        existing.setEmployeeId(updatedCompetency.getEmployeeId());
        existing.setCompetencyName(updatedCompetency.getCompetencyName());
        existing.setRequiredLevel(updatedCompetency.getRequiredLevel());
        existing.setCurrentLevel(updatedCompetency.getCurrentLevel());

        return competencyRepository.save(existing);
    }

    public void deleteCompetency(Long id) {
        if (!competencyRepository.existsById(id)) {
            throw new RuntimeException(
                    "Competency not found with id: " + id);
        }

        competencyRepository.deleteById(id);
    }
}