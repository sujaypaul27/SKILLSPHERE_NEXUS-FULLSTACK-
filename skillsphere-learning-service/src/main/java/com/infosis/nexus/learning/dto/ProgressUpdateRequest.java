package com.infosis.nexus.learning.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

public class ProgressUpdateRequest {

    @NotNull(message = "Progress percentage is required")
    @DecimalMin(value = "0.0", message = "Progress cannot be less than 0")
    @DecimalMax(value = "100.0", message = "Progress cannot be more than 100")
    private Double progressPercentage;

    private Double score;

    public Double getProgressPercentage() { return progressPercentage; }
    public void setProgressPercentage(Double progressPercentage) { this.progressPercentage = progressPercentage; }

    public Double getScore() { return score; }
    public void setScore(Double score) { this.score = score; }
}