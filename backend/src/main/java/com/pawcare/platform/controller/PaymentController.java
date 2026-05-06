package com.pawcare.platform.controller;

import com.pawcare.platform.dto.PaymentRequest;
import com.pawcare.platform.model.Booking;
import com.pawcare.platform.model.Payment;
import com.pawcare.platform.repository.BookingRepository;
import com.pawcare.platform.repository.PaymentRepository;
import com.pawcare.platform.service.IdFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    private final PaymentRepository payments;
    private final BookingRepository bookings;

    public PaymentController(PaymentRepository payments, BookingRepository bookings) {
        this.payments = payments;
        this.bookings = bookings;
    }

    @GetMapping
    public List<Payment> all(@RequestParam(required = false) String userId) {
        return userId == null ? payments.findAll() : payments.findByUserId(userId);
    }

    @PostMapping
    public Payment create(@RequestBody Payment payment) {
        payment.setId(IdFactory.id("pay"));
        payment.setPaidAt(Instant.now());
        return payments.save(payment);
    }

    @PostMapping("/mock-pay")
    public Payment mockPay(@RequestBody PaymentRequest request) {
        Booking booking = bookings.findById(request.bookingId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));
        booking.setStatus("Confirmed");
        bookings.save(booking);

        Payment payment = new Payment();
        payment.setId(IdFactory.id("pay"));
        payment.setBookingId(booking.getId());
        payment.setUserId(booking.getUserId());
        payment.setAmount(booking.getAmount());
        payment.setPaymentMethod(request.paymentMethod());
        payment.setPaymentStatus("Paid");
        payment.setPaidAt(Instant.now());
        return payments.save(payment);
    }

    @PutMapping("/{id}")
    public Payment update(@PathVariable String id, @RequestBody Payment payment) {
        payment.setId(id);
        return payments.save(payment);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        payments.deleteById(id);
    }
}
