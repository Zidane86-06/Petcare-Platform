package com.pawcare.platform.controller;

import com.pawcare.platform.model.PetCareService;
import com.pawcare.platform.repository.ServiceRepository;
import com.pawcare.platform.service.IdFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceController {
    private final ServiceRepository services;

    public ServiceController(ServiceRepository services) {
        this.services = services;
    }

    @GetMapping
    public List<PetCareService> all() {
        return services.findAll();
    }

    @PostMapping
    public PetCareService create(@RequestBody PetCareService service) {
        service.setId(IdFactory.id("srv"));
        return services.save(service);
    }

    @PutMapping("/{id}")
    public PetCareService update(@PathVariable String id, @RequestBody PetCareService service) {
        service.setId(id);
        return services.save(service);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        services.deleteById(id);
    }
}
