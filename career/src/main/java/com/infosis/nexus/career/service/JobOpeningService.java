package com.infosis.nexus.career.service;

import com.infosis.nexus.career.dto.*;
import java.util.List;

public interface JobOpeningService {
    JobOpeningResponse create(JobOpeningRequest req);
    JobOpeningResponse getById(Long id);
    List<JobOpeningResponse> getAll();
    JobOpeningResponse update(Long id, JobOpeningRequest req);
    void delete(Long id);
    List<JobMatchResponse> getMatchesForEmployee(Long employeeId);
}