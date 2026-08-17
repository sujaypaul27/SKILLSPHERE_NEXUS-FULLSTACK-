package com.infosis.nexus.career.service.impl;

import com.infosis.nexus.career.client.SkillClient;
import com.infosis.nexus.career.dto.*;
import com.infosis.nexus.career.entity.JobOpening;
import com.infosis.nexus.career.exception.ResourceNotFoundException;
import com.infosis.nexus.career.mapper.JobOpeningMapper;
import com.infosis.nexus.career.repository.JobOpeningRepository;
import com.infosis.nexus.career.service.JobOpeningService;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class JobOpeningServiceImpl implements JobOpeningService {

    private final JobOpeningRepository repository;
    private final JobOpeningMapper mapper;
    private final SkillClient skillClient;

    public JobOpeningServiceImpl(JobOpeningRepository repository, JobOpeningMapper mapper, SkillClient skillClient) {
        this.repository = repository;
        this.mapper = mapper;
        this.skillClient = skillClient;
    }

    @Override
    public JobOpeningResponse create(JobOpeningRequest req) {
        return mapper.toResponse(repository.save(mapper.toEntity(req)));
    }

    @Override
    public JobOpeningResponse getById(Long id) {
        return mapper.toResponse(find(id));
    }

    @Override
    public List<JobOpeningResponse> getAll() {
        return repository.findAll().stream().map(mapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public JobOpeningResponse update(Long id, JobOpeningRequest req) {
        JobOpening j = find(id);
        j.setTitle(req.getTitle());
        j.setDepartment(req.getDepartment());
        j.setOpenings(req.getOpenings());
        j.setRequiredSkills(req.getRequiredSkills());
        return mapper.toResponse(repository.save(j));
    }

    @Override
    public void delete(Long id) {
        repository.delete(find(id));
    }

    @Override
    public List<JobMatchResponse> getMatchesForEmployee(Long employeeId) {
        List<Map> empSkills = skillClient.getSkillsByEmployee(employeeId);
        List<String> empSkillNames = empSkills.stream()
                .map(s -> ((String) s.get("skillName")).toLowerCase())
                .collect(Collectors.toList());

        return repository.findAll().stream().map(job -> {
                    List<String> required = job.getRequiredSkills() != null ? job.getRequiredSkills() : List.of();
                    long matched = required.stream()
                            .filter(rs -> empSkillNames.contains(rs.toLowerCase()))
                            .count();

                    JobMatchResponse m = new JobMatchResponse();
                    m.setJobId(job.getId());
                    m.setTitle(job.getTitle());
                    m.setDepartment(job.getDepartment());
                    m.setMatchedSkillCount((int) matched);
                    m.setTotalRequiredSkills(required.size());
                    m.setMatchPercentage(required.isEmpty() ? 0.0 : (matched * 100.0 / required.size()));
                    return m;
                })
                .filter(m -> m.getMatchPercentage() > 0)
                .sorted((a, b) -> Double.compare(b.getMatchPercentage(), a.getMatchPercentage()))
                .collect(Collectors.toList());
    }

    private JobOpening find(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("JobOpening not found: " + id));
    }
}