package com.pawcare.platform.repository;

import com.pawcare.platform.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<AppUser, String> {
    Optional<AppUser> findByEmailIgnoreCaseAndPasswordAndRole(String email, String password, String role);
    boolean existsByEmailIgnoreCase(String email);
}
