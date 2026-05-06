package com.pawcare.platform.repository;

import com.pawcare.platform.model.PetCareService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<PetCareService, String> {
}
