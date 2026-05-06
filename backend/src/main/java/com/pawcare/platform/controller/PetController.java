package com.pawcare.platform.controller;

import com.pawcare.platform.model.Pet;
import com.pawcare.platform.repository.PetRepository;
import com.pawcare.platform.service.IdFactory;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/pets")
public class PetController {
    private final PetRepository pets;

    public PetController(PetRepository pets) {
        this.pets = pets;
    }

    @GetMapping
    public List<Pet> all(@RequestParam(required = false) String userId) {
        return userId == null ? pets.findAll() : pets.findByUserId(userId);
    }

    @PostMapping
    public Pet create(@RequestBody Pet pet) {
        pet.setId(IdFactory.id("pet"));
        pet.setCreatedAt(Instant.now());
        return pets.save(pet);
    }

    @PutMapping("/{id}")
    public Pet update(@PathVariable String id, @RequestBody Pet pet) {
        pet.setId(id);
        return pets.save(pet);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        pets.deleteById(id);
    }
}
