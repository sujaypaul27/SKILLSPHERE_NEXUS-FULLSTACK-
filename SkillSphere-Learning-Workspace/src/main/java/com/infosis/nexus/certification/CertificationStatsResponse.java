package com.infosis.nexus.certification;

public class CertificationStatsResponse {
    private long totalActive;
    private long expiringIn30Days;
    private double renewalRate;

    public CertificationStatsResponse(long totalActive, long expiringIn30Days, double renewalRate) {
        this.totalActive = totalActive;
        this.expiringIn30Days = expiringIn30Days;
        this.renewalRate = renewalRate;
    }

    public long getTotalActive() { return totalActive; }
    public long getExpiringIn30Days() { return expiringIn30Days; }
    public double getRenewalRate() { return renewalRate; }
}