package com.infosis.nexus.career.controller;

import com.infosis.nexus.career.client.*;
import com.infosis.nexus.career.dto.*;
import com.infosis.nexus.career.entity.CareerPlan;
import com.infosis.nexus.career.exception.ResourceNotFoundException;
import com.infosis.nexus.career.repository.CareerPlanRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/career-plans")
public class CareerRoadmapController {

    private final CareerPlanRepository repository;
    private final EmployeeClient employeeClient;
    private final CompetencyClient competencyClient;

    public CareerRoadmapController(CareerPlanRepository repository, EmployeeClient employeeClient, CompetencyClient competencyClient) {
        this.repository = repository;
        this.employeeClient = employeeClient;
        this.competencyClient = competencyClient;
    }

    @GetMapping("/{id}/roadmap")
    public RoadmapResponse getRoadmap(@PathVariable Long id) {
        CareerPlan plan = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CareerPlan not found: " + id));

        Map employee = employeeClient.getEmployeeById(plan.getEmployeeId());
        List<Map> competencies = competencyClient.getCompetenciesByEmployee(plan.getEmployeeId());

        RoadmapResponse res = new RoadmapResponse();
        res.setEmployeeId(plan.getEmployeeId());
        res.setEmployeeName(employee != null ? (String) employee.get("name") : null);
        res.setCurrentRole(plan.getCurrentRole());
        res.setTargetRole(plan.getTargetRole());
        res.setProgressPercentage(plan.getProgressPercentage());
        res.setMentorName(plan.getMentorName());
        res.setEligibleInMonths(plan.getEligibleInMonths());

        List<SkillGapResponse> gaps = competencies.stream().map(c -> {
            SkillGapResponse g = new SkillGapResponse();
            g.setCompetencyName((String) c.get("competencyName"));
            g.setRequiredLevel((Integer) c.get("requiredLevel"));
            g.setCurrentLevel((Integer) c.get("currentLevel"));
            g.setGap((Integer) c.get("gap"));
            return g;
        }).collect(Collectors.toList());

        res.setSkillGaps(gaps);
        return res;
    }
}