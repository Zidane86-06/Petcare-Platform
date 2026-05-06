package com.pawcare.platform.repository;

import com.pawcare.platform.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PetRepository extends JpaRepository<Pet, String> {
    List<Pet> findByUserId(String userId);
}
