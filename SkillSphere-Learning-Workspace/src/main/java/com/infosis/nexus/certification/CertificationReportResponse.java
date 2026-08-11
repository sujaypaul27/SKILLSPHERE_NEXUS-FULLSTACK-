package com.infosis.nexus.certification;

import java.util.Map;

public class CertificationReportResponse {
    private long totalCertifications;
    private long validCount;
    private long expiredCount;
    private long expiringIn30Days;
    private double renewalRate;
    private Map<String, Long> byProvider;

    public CertificationReportResponse(long totalCertifications, long validCount, long expiredCount,
                                       long expiringIn30Days, double renewalRate, Map<String, Long> byProvider) {
        this.totalCertifications = totalCertifications;
        this.validCount = validCount;
        this.expiredCount = expiredCount;
        this.expiringIn30Days = expiringIn30Days;
        this.renewalRate = renewalRate;
        this.byProvider = byProvider;
    }

    public long getTotalCertifications() { return totalCertifications; }
    public long getValidCount() { return validCount; }
    public long getExpiredCount() { return expiredCount; }
    public long getExpiringIn30Days() { return expiringIn30Days; }
    public double getRenewalRate() { return renewalRate; }
    public Map<String, Long> getByProvider() { return byProvider; }
}