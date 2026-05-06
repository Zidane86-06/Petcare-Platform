package com.pawcare.platform.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HomeController {
    @GetMapping("/")
    public Map<String, String> home() {
        return Map.of(
                "app", "PawCare Pet Care Platform API",
                "status", "running",
                "frontend", "http://localhost:5173",
                "servicesEndpoint", "/api/services"
        );
    }

    @GetMapping("/api/health")
    public Map<String, String> health() {
        return Map.of("status", "ok");
    }
}
