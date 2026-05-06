package com.pawcare.platform.controller;

import com.pawcare.platform.dto.ChatRequest;
import com.pawcare.platform.model.ChatMessage;
import com.pawcare.platform.repository.ChatMessageRepository;
import com.pawcare.platform.service.IdFactory;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {
    private final ChatMessageRepository messages;

    public ChatController(ChatMessageRepository messages) {
        this.messages = messages;
    }

    @GetMapping
    public List<ChatMessage> byUser(@RequestParam String userId) {
        return messages.findByUserIdOrderByCreatedAtAsc(userId);
    }

    @PostMapping
    public List<ChatMessage> send(@RequestBody ChatRequest request) {
        ChatMessage userMessage = new ChatMessage();
        userMessage.setId(IdFactory.id("msg"));
        userMessage.setUserId(request.userId());
        userMessage.setSender("user");
        userMessage.setMessage(request.message());
        userMessage.setCreatedAt(Instant.now());

        ChatMessage pawReply = new ChatMessage();
        pawReply.setId(IdFactory.id("msg"));
        pawReply.setUserId(request.userId());
        pawReply.setSender("paw");
        pawReply.setMessage(reply(request.message()));
        pawReply.setCreatedAt(Instant.now());

        messages.save(userMessage);
        messages.save(pawReply);
        return messages.findByUserIdOrderByCreatedAtAsc(request.userId());
    }

    private String reply(String text) {
        String message = text == null ? "" : text.toLowerCase();
        if (message.contains("groom")) return "Paw recommends grooming every 4-6 weeks, with nail and coat checks included.";
        if (message.contains("vet") || message.contains("vaccine")) return "For vet care, keep vaccination records ready and mention any appetite, skin, or energy changes.";
        if (message.contains("food") || message.contains("diet")) return "Diet depends on age, weight, and breed. Keep portions consistent and ask your vet before major changes.";
        if (message.contains("booking")) return "Open Bookings to review status. Pending means the team still needs to confirm the slot.";
        return "I am Paw, your pet care assistant. I can help with grooming, vet visits, training, boarding, bookings, and task reminders.";
    }
}
