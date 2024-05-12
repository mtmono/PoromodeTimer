package com.example.pomodoro.model;

import lombok.*;

import java.time.LocalDateTime;

@Data
public class Pomodoro {
    private boolean workStatus = false;
    private long startTime;
    public Pomodoro(){
    }
    public void setStartTime(){
        startTime = System.currentTimeMillis();
    }
}
