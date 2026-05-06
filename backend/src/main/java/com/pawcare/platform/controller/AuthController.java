package com.pawcare.platform.controller;

import com.pawcare.platform.dto.LoginRequest;
import com.pawcare.platform.model.AppUser;
import com.pawcare.platform.repository.UserRepository;
import com.pawcare.platform.service.IdFactory;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository users;

    public AuthController(UserRepository users) {
        this.users = users;
    }

    @PostMapping("/login")
    public AppUser login(@RequestBody LoginRequest request) {
        return users.findByEmailIgnoreCaseAndPasswordAndRole(request.email(), request.password(), request.role())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials or role"));
    }

    @PostMapping("/register")
    public AppUser register(@Valid @RequestBody AppUser user) {
        if (users.existsByEmailIgnoreCase(user.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
        }
        user.setId(IdFactory.id("usr"));
        user.setCreatedAt(Instant.now());
        return users.save(user);
    }
}
