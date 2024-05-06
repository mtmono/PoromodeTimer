package com.example.pomodoro.model;

import lombok.*;

import java.time.LocalDateTime;

@Data
public class Pomodoro {
    private LocalDateTime startTime;
    private boolean workStatus = false;
    public Pomodoro(){
    }
    public void setStartTime(){
        startTime = LocalDateTime.now();
    }
}
