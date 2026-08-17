package com.infosis.nexus.career.controller;

import com.infosis.nexus.career.client.*;
import com.infosis.nexus.career.dto.*;
import com.infosis.nexus.career.entity.CareerPlanStatus;
import com.infosis.nexus.career.repository.CareerPlanRepository;
import com.infosis.nexus.career.repository.JobOpeningRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final CareerPlanRepository careerPlanRepository;
    private final JobOpeningRepository jobOpeningRepository;
    private final CourseClient courseClient;
    private final EnrollmentClient enrollmentClient;

    public AnalyticsController(CareerPlanRepository careerPlanRepository, JobOpeningRepository jobOpeningRepository,
                               CourseClient courseClient, EnrollmentClient enrollmentClient) {
        this.careerPlanRepository = careerPlanRepository;
        this.jobOpeningRepository = jobOpeningRepository;
        this.courseClient = courseClient;
        this.enrollmentClient = enrollmentClient;
    }

    @GetMapping("/training")
    public TrainingAnalyticsResponse getTrainingAnalytics() {
        List<Map> courses = courseClient.getAllCourses();
        List<Map> enrollments = enrollmentClient.getAllEnrollments();

        long completed = enrollments.stream()
                .filter(e -> "COMPLETED".equals(e.get("completionStatus")))
                .count();

        double avgScore = enrollments.stream()
                .filter(e -> e.get("score") != null)
                .mapToDouble(e -> ((Number) e.get("score")).doubleValue())
                .average().orElse(0.0);

        TrainingAnalyticsResponse res = new TrainingAnalyticsResponse();
        res.setTotalCourses((long) courses.size());
        res.setTotalEnrollments((long) enrollments.size());
        res.setCompletedEnrollments(completed);
        res.setCompletionRate(enrollments.isEmpty() ? 0.0 : (completed * 100.0 / enrollments.size()));
        res.setAvgScore(avgScore);
        return res;
    }

    @GetMapping("/executive-dashboard")
    public ExecutiveDashboardResponse getExecutiveDashboard() {
        long activePlans = careerPlanRepository.findAll().stream()
                .filter(p -> p.getStatus() == CareerPlanStatus.ACTIVE)
                .count();

        long promotions = careerPlanRepository.findAll().stream()
                .filter(p -> p.getStatus() == CareerPlanStatus.COMPLETED)
                .count();

        List<Map> enrollments = enrollmentClient.getAllEnrollments();
        long completed = enrollments.stream()
                .filter(e -> "COMPLETED".equals(e.get("completionStatus")))
                .count();

        ExecutiveDashboardResponse res = new ExecutiveDashboardResponse();
        res.setActiveCareerPlans(activePlans);
        res.setPromotionsThisYear(promotions);
        res.setSkillCoveragePercentage(87.0);
        res.setTotalJobOpenings((long) jobOpeningRepository.findAll().size());
        res.setTotalEnrollments((long) enrollments.size());
        res.setTrainingCompletionRate(enrollments.isEmpty() ? 0.0 : (completed * 100.0 / enrollments.size()));
        return res;
    }
}