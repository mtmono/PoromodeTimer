package com.example.pomodoro.controller;

import java.sql.Timestamp;
import java.util.Objects;
import jakarta.servlet.http.HttpServletRequest;
import com.example.pomodoro.model.Pomodoro;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
//@RestController
@SessionAttributes(value = "PomodoroSession")
public class PomodoroController {

    private static final Logger logger = LoggerFactory.getLogger(PomodoroController.class);

    //  Pomodoroクラスのインスタンス作成
    @ModelAttribute(value = "PomodoroSession")
    public Pomodoro createPomodoro() {
        logger.info("createPomodoro");
        return new Pomodoro();
    }
    @ResponseBody
    public ResponseEntity<String> responseEntity() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Accept-Ranges", "none");
        HttpStatus status = HttpStatus.OK;
        return new ResponseEntity<>(headers, status);
    }

    //  作業画面に遷移
    @GetMapping("/work")
    private String readWork(@ModelAttribute("PomodoroSession") Pomodoro pomodoro, Model model,HttpServletRequest request) {
        String referer = request.getHeader("referer");
        if (referer == null || referer.endsWith("/") || referer.endsWith("/index") || referer.endsWith("/break?") || referer.endsWith("/break")) {
            if(Objects.equals(pomodoro.getStartTime(), 0L)){
                pomodoro.setStartTime();
                Timestamp timestamp = new Timestamp(pomodoro.getStartTime());
                logger.info("setStartTime :" + timestamp);
            }
            logger.info("GET:work");
            model.addAttribute(pomodoro);
            return "work";
        } else {
            return "redirect:/index";
        }
    }

    //  休憩画面に遷移
    @GetMapping("/break")
    private String readBreak(@ModelAttribute("PomodoroSession") Pomodoro pomodoro, Model model,HttpServletRequest request) {
        String referer = request.getHeader("referer");
        if (referer == null || referer.endsWith("/") || referer.endsWith("/index") || referer.endsWith("/work?") || referer.endsWith("/work")) {
            if(Objects.equals(pomodoro.getStartTime(), 0L)){
                pomodoro.setStartTime();
                Timestamp timestamp = new Timestamp(pomodoro.getStartTime());
                logger.info("setStartTime :" + timestamp);
            }
            logger.info("GET:break");
            pomodoro.setWorkStatus(true);
            logger.info("setWorkStatus : true");
            model.addAttribute(pomodoro);
            return "break";
        } else {
            return "redirect:/index";
        }
    }

    //  ホーム画面に遷移
    @GetMapping({"/","/index"})
    private String readIndex(@ModelAttribute("PomodoroSession") Pomodoro pomodoro, Model model) {
        logger.info("GET:index");
        return "index";
    }

    @ExceptionHandler(Exception.class)
    public String exceptionHandler(Exception e, Model model) {
        logger.error("error", e);
        return "error";
    }

}
