package com.infosis.nexus.certification;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public class RenewalRequest {

    @NotNull(message = "New expiry date is required")
    private LocalDate newExpiryDate;

    public LocalDate getNewExpiryDate() { return newExpiryDate; }
    public void setNewExpiryDate(LocalDate newExpiryDate) { this.newExpiryDate = newExpiryDate; }
}