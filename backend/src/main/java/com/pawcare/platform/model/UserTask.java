package com.pawcare.platform.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(name = "tasks")
public class UserTask {
    @Id
    private String id;
    private String assignedByAdminId;
    private String assignedToUserId;
    private String title;
    private String description;
    private String priority;
    private String status;
    private LocalDate dueDate;
    private Instant createdAt;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getAssignedByAdminId() { return assignedByAdminId; }
    public void setAssignedByAdminId(String assignedByAdminId) { this.assignedByAdminId = assignedByAdminId; }
    public String getAssignedToUserId() { return assignedToUserId; }
    public void setAssignedToUserId(String assignedToUserId) { this.assignedToUserId = assignedToUserId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
