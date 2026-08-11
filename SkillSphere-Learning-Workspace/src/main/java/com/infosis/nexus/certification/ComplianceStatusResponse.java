package com.infosis.nexus.certification;

public class ComplianceStatusResponse {
    private Long employeeId;
    private boolean compliant;
    private long expiredCount;
    private long activeCount;

    public ComplianceStatusResponse(Long employeeId, boolean compliant, long expiredCount, long activeCount) {
        this.employeeId = employeeId;
        this.compliant = compliant;
        this.expiredCount = expiredCount;
        this.activeCount = activeCount;
    }

    public Long getEmployeeId() { return employeeId; }
    public boolean isCompliant() { return compliant; }
    public long getExpiredCount() { return expiredCount; }
    public long getActiveCount() { return activeCount; }
}