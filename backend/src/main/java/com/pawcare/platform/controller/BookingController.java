package com.pawcare.platform.controller;

import com.pawcare.platform.model.Booking;
import com.pawcare.platform.repository.BookingRepository;
import com.pawcare.platform.service.IdFactory;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    private final BookingRepository bookings;

    public BookingController(BookingRepository bookings) {
        this.bookings = bookings;
    }

    @GetMapping
    public List<Booking> all(@RequestParam(required = false) String userId) {
        return userId == null ? bookings.findAll() : bookings.findByUserId(userId);
    }

    @PostMapping
    public Booking create(@RequestBody Booking booking) {
        booking.setId(IdFactory.id("book"));
        booking.setBookingDate(Instant.now());
        return bookings.save(booking);
    }

    @PutMapping("/{id}")
    public Booking update(@PathVariable String id, @RequestBody Booking booking) {
        booking.setId(id);
        return bookings.save(booking);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        bookings.deleteById(id);
    }
}
