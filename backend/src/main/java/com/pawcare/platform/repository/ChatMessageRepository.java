package com.pawcare.platform.repository;

import com.pawcare.platform.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, String> {
    List<ChatMessage> findByUserIdOrderByCreatedAtAsc(String userId);
}
