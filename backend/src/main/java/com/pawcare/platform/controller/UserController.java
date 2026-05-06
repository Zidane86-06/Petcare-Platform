package com.pawcare.platform.controller;

import com.pawcare.platform.model.AppUser;
import com.pawcare.platform.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserRepository users;

    public UserController(UserRepository users) {
        this.users = users;
    }

    @GetMapping
    public List<AppUser> all() {
        return users.findAll();
    }

    @PutMapping("/{id}")
    public AppUser update(@PathVariable String id, @RequestBody AppUser user) {
        user.setId(id);
        return users.save(user);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        users.deleteById(id);
    }
}
