package com.pawcare.platform.config;

import com.pawcare.platform.model.*;
import com.pawcare.platform.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {
    private final UserRepository users;
    private final PetRepository pets;
    private final ServiceRepository services;
    private final BookingRepository bookings;
    private final PaymentRepository payments;
    private final TaskRepository tasks;
    private final ChatMessageRepository messages;

    public DataSeeder(UserRepository users, PetRepository pets, ServiceRepository services, BookingRepository bookings,
                      PaymentRepository payments, TaskRepository tasks, ChatMessageRepository messages) {
        this.users = users;
        this.pets = pets;
        this.services = services;
        this.bookings = bookings;
        this.payments = payments;
        this.tasks = tasks;
        this.messages = messages;
    }

    @Override
    public void run(String... args) {
        if (users.count() > 0) return;

        AppUser admin = user("admin_1", "Avery Stone", "admin@pawcare.com", "admin123", "admin", "+1 555 0100");
        AppUser mia = user("user_1", "Mia Carter", "mia@pawcare.com", "user123", "user", "+1 555 0144");
        AppUser noah = user("user_2", "Noah Brooks", "noah@pawcare.com", "user123", "user", "+1 555 0187");
        users.saveAll(List.of(admin, mia, noah));

        pets.saveAll(List.of(
                pet("pet_1", "user_1", "Luna", "Dog", "Golden Retriever", 4, 58.0, "Female"),
                pet("pet_2", "user_1", "Mochi", "Cat", "Ragdoll", 2, 11.0, "Male"),
                pet("pet_3", "user_2", "Rocky", "Dog", "Beagle", 5, 30.0, "Male")
        ));

        services.saveAll(List.of(
                service("srv_1", "Signature Grooming", "Grooming", "Bath, brush, nail trim, ear cleaning, and coat refresh.", "65", "90 min"),
                service("srv_2", "Wellness Vet Visit", "Vet", "Routine checkup, vitals, vaccine review, and care plan.", "120", "45 min"),
                service("srv_3", "Positive Training", "Training", "Behavior coaching, leash work, and home practice notes.", "85", "60 min"),
                service("srv_4", "Cozy Boarding", "Boarding", "Overnight stay with meals, walks, and daily photo updates.", "48", "1 night")
        ));

        bookings.saveAll(List.of(
                booking("book_1", "user_1", "pet_1", "srv_1", "2026-05-10", "Confirmed", "65", "Use sensitive shampoo."),
                booking("book_2", "user_1", "pet_2", "srv_2", "2026-05-15", "Pending", "120", "Annual wellness check."),
                booking("book_3", "user_2", "pet_3", "srv_3", "2026-05-18", "Completed", "85", "Focus on recall.")
        ));

        payments.saveAll(List.of(
                payment("pay_1", "book_1", "user_1", "65", "Card"),
                payment("pay_2", "book_3", "user_2", "85", "Wallet")
        ));

        tasks.saveAll(List.of(
                task("task_1", "admin_1", "user_1", "Upload Luna vaccination record", "Add the latest vaccine document before the vet visit.", "High", "Pending", "2026-05-09"),
                task("task_2", "admin_1", "user_2", "Confirm Rocky training goals", "Share three behavior goals for the trainer.", "Medium", "In Progress", "2026-05-12")
        ));

        ChatMessage welcome = new ChatMessage();
        welcome.setId("msg_1");
        welcome.setUserId("user_1");
        welcome.setSender("paw");
        welcome.setMessage("Hi Mia, I am Paw. Ask me about care, bookings, feeding, or reminders.");
        welcome.setCreatedAt(Instant.now());
        messages.save(welcome);
    }

    private AppUser user(String id, String name, String email, String password, String role, String phone) {
        AppUser user = new AppUser();
        user.setId(id);
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password);
        user.setRole(role);
        user.setPhone(phone);
        user.setCreatedAt(Instant.now());
        return user;
    }

    private Pet pet(String id, String userId, String name, String species, String breed, int age, double weight, String gender) {
        Pet pet = new Pet();
        pet.setId(id);
        pet.setUserId(userId);
        pet.setName(name);
        pet.setSpecies(species);
        pet.setBreed(breed);
        pet.setAge(age);
        pet.setWeight(weight);
        pet.setGender(gender);
        pet.setImage("");
        pet.setCreatedAt(Instant.now());
        return pet;
    }

    private PetCareService service(String id, String name, String category, String description, String price, String duration) {
        PetCareService service = new PetCareService();
        service.setId(id);
        service.setName(name);
        service.setCategory(category);
        service.setDescription(description);
        service.setPrice(new BigDecimal(price));
        service.setDuration(duration);
        service.setStatus("Active");
        return service;
    }

    private Booking booking(String id, String userId, String petId, String serviceId, String date, String status, String amount, String notes) {
        Booking booking = new Booking();
        booking.setId(id);
        booking.setUserId(userId);
        booking.setPetId(petId);
        booking.setServiceId(serviceId);
        booking.setBookingDate(Instant.now());
        booking.setPreferredDate(LocalDate.parse(date));
        booking.setStatus(status);
        booking.setAmount(new BigDecimal(amount));
        booking.setNotes(notes);
        return booking;
    }

    private Payment payment(String id, String bookingId, String userId, String amount, String method) {
        Payment payment = new Payment();
        payment.setId(id);
        payment.setBookingId(bookingId);
        payment.setUserId(userId);
        payment.setAmount(new BigDecimal(amount));
        payment.setPaymentMethod(method);
        payment.setPaymentStatus("Paid");
        payment.setPaidAt(Instant.now());
        return payment;
    }

    private UserTask task(String id, String adminId, String userId, String title, String description, String priority, String status, String dueDate) {
        UserTask task = new UserTask();
        task.setId(id);
        task.setAssignedByAdminId(adminId);
        task.setAssignedToUserId(userId);
        task.setTitle(title);
        task.setDescription(description);
        task.setPriority(priority);
        task.setStatus(status);
        task.setDueDate(LocalDate.parse(dueDate));
        task.setCreatedAt(Instant.now());
        return task;
    }
}
