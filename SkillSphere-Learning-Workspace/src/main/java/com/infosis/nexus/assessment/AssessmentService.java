package com.infosis.nexus.assessment;

import com.infosis.nexus.Employee.EmployeeService;
import com.infosis.nexus.Employee.Employee;
import com.infosis.nexus.skill.Skill;
import com.infosis.nexus.skill.SkillRepository;
import com.infosis.nexus.assessment.dto.AssessmentResponse;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AssessmentService {

    private final AssessmentRepository repository;
    private final EmployeeService employeeService;
    private final SkillRepository skillRepository;

    private static final double PASS_THRESHOLD = 75.0;

    public AssessmentService(
            AssessmentRepository repository,
            EmployeeService employeeService,
            SkillRepository skillRepository) {

        this.repository = repository;
        this.employeeService = employeeService;
        this.skillRepository = skillRepository;
    }

    public List<AssessmentResponse> getAll() {

        return repository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public AssessmentResponse getById(Long id) {

        Assessment assessment = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Assessment not found with id: " + id));

        return toResponse(assessment);
    }

    public List<AssessmentResponse> getAssessmentsByEmployeeId(Long employeeId) {

        employeeService.getById(employeeId);

        return repository.findByEmployeeId(employeeId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public Assessment createAssessment(
            Long employeeId,
            Long skillId,
            Double score) {

        Employee employee = employeeService.getById(employeeId);

        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Skill not found with id: " + skillId));

        boolean passed = score >= PASS_THRESHOLD;

        Assessment assessment = new Assessment(
                null,
                employeeId,
                skillId,
                score,
                passed
        );

        return repository.save(assessment);
    }

    public void delete(Long id) {

        Assessment existing = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Assessment not found with id: " + id));

        repository.delete(existing);
    }

    private AssessmentResponse toResponse(Assessment assessment) {

        Employee employee =
                employeeService.getById(assessment.getEmployeeId());

        Skill skill =
                skillRepository.findById(assessment.getSkillId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Skill not found with id: "
                                                + assessment.getSkillId()));

        return new AssessmentResponse(
                assessment.getId(),
                assessment.getEmployeeId(),
                employee.getName(),
                assessment.getSkillId(),
                skill.getSkillName(),
                assessment.getScore(),
                assessment.getPassed()
        );
    }
}