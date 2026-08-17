package com.infosis.nexus.career.client;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import java.util.Map;

@Component
public class EmployeeClient {
    private final RestTemplate restTemplate = new RestTemplate();
    private final String BASE_URL = "http://localhost:8080/api/employees";

    public Map getEmployeeById(Long id) {
        return restTemplate.getForObject(BASE_URL + "/" + id, Map.class);
    }
}