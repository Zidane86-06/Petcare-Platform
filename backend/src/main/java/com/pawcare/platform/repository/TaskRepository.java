package com.pawcare.platform.repository;

import com.pawcare.platform.model.UserTask;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<UserTask, String> {
    List<UserTask> findByAssignedToUserId(String userId);
}
