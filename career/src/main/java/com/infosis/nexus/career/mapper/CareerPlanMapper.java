package com.infosis.nexus.career.mapper;

import com.infosis.nexus.career.dto.*;
import com.infosis.nexus.career.entity.CareerPlan;
import org.springframework.stereotype.Component;

@Component
public class CareerPlanMapper {

    public CareerPlan toEntity(CareerPlanRequest req) {
        CareerPlan c = new CareerPlan();
        c.setEmployeeId(req.getEmployeeId());
        c.setCurrentRole(req.getCurrentRole());
        c.setTargetRole(req.getTargetRole());
        c.setMentorName(req.getMentorName());
        c.setEligibleInMonths(req.getEligibleInMonths());
        return c;
    }

    public CareerPlanResponse toResponse(CareerPlan c) {
        CareerPlanResponse r = new CareerPlanResponse();
        r.setId(c.getId());
        r.setEmployeeId(c.getEmployeeId());
        r.setCurrentRole(c.getCurrentRole());
        r.setTargetRole(c.getTargetRole());
        r.setProgressPercentage(c.getProgressPercentage());
        r.setMentorName(c.getMentorName());
        r.setEligibleInMonths(c.getEligibleInMonths());
        r.setStatus(c.getStatus());
        r.setCreatedAt(c.getCreatedAt());
        r.setUpdatedAt(c.getUpdatedAt());
        return r;
    }
}