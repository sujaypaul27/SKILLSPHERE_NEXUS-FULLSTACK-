package com.infosis.nexus.career.mapper;

import com.infosis.nexus.career.dto.*;
import com.infosis.nexus.career.entity.JobOpening;
import org.springframework.stereotype.Component;

@Component
public class JobOpeningMapper {
    public JobOpening toEntity(JobOpeningRequest req) {
        JobOpening j = new JobOpening();
        j.setTitle(req.getTitle());
        j.setDepartment(req.getDepartment());
        j.setOpenings(req.getOpenings());
        j.setRequiredSkills(req.getRequiredSkills());
        return j;
    }

    public JobOpeningResponse toResponse(JobOpening j) {
        JobOpeningResponse r = new JobOpeningResponse();
        r.setId(j.getId());
        r.setTitle(j.getTitle());
        r.setDepartment(j.getDepartment());
        r.setOpenings(j.getOpenings());
        r.setRequiredSkills(j.getRequiredSkills());
        r.setStatus(j.getStatus());
        return r;
    }
}