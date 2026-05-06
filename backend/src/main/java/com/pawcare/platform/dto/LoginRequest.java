package com.pawcare.platform.dto;

public record LoginRequest(String email, String password, String role) {
}
