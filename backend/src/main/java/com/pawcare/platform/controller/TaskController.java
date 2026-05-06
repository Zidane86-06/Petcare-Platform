package com.pawcare.platform.controller;

import com.pawcare.platform.model.UserTask;
import com.pawcare.platform.repository.TaskRepository;
import com.pawcare.platform.service.IdFactory;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskRepository tasks;

    public TaskController(TaskRepository tasks) {
        this.tasks = tasks;
    }

    @GetMapping
    public List<UserTask> all(@RequestParam(required = false) String userId) {
        return userId == null ? tasks.findAll() : tasks.findByAssignedToUserId(userId);
    }

    @PostMapping
    public UserTask create(@RequestBody UserTask task) {
        task.setId(IdFactory.id("task"));
        task.setCreatedAt(Instant.now());
        return tasks.save(task);
    }

    @PutMapping("/{id}")
    public UserTask update(@PathVariable String id, @RequestBody UserTask task) {
        task.setId(id);
        return tasks.save(task);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        tasks.deleteById(id);
    }
}
