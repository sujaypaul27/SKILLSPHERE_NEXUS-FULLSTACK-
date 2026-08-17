package com.infosis.nexus.career.client;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import java.util.List;
import java.util.Map;

@Component
public class CompetencyClient {
    private final RestTemplate restTemplate = new RestTemplate();
    private final String BASE_URL = "http://localhost:8080/api/competencies/employee";

    public List<Map> getCompetenciesByEmployee(Long employeeId) {
        Map[] result = restTemplate.getForObject(BASE_URL + "/" + employeeId, Map[].class);
        return result != null ? List.of(result) : List.of();
    }
}