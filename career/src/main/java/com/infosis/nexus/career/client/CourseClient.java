package com.infosis.nexus.career.client;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import java.util.List;
import java.util.Map;

@Component
public class CourseClient {
    private final RestTemplate restTemplate = new RestTemplate();
    private final String BASE_URL = "http://localhost:8081/api/courses";

    public List<Map> getAllCourses() {
        Map[] result = restTemplate.getForObject(BASE_URL, Map[].class);
        return result != null ? List.of(result) : List.of();
    }
}