package com.banana.client.notification;

import java.util.ArrayDeque;
import java.util.Deque;

public final class NotificationManager {
    private final Deque<Notification> queue = new ArrayDeque<>();

    public void push(String title, String message) {
        queue.addFirst(new Notification(title, message, System.currentTimeMillis()));
        while (queue.size() > 5) {
            queue.removeLast();
        }
    }

    public Deque<Notification> queue() {
        return queue;
    }
}
