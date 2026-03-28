package com.controller;


import org.springframework.web.bind.annotation.*;

import com.entity.Attendance;
import com.service.AttendanceService;

import java.util.List;

@RestController
@CrossOrigin(origins = ("*"))
@RequestMapping("/attendance")
public class AttendanceController {

    private final AttendanceService service;

    public AttendanceController(AttendanceService service) {
        this.service = service;
    }
    
    @PostMapping("/add")
    public Attendance addAttendance(@RequestBody Attendance attendance) {
        return service.save(attendance); // save record to DB
    }

    @GetMapping("/{email}")
    public List<Attendance> getAttendance(
            @PathVariable String email,
            @RequestParam int month,
            @RequestParam int year) {
        return service.getAttendance(email, month, year);
    }
    
    
    
    @GetMapping("/day")
    public Attendance getAttendanceByDate(
            @RequestParam String email,
            @RequestParam String date) {

        return service.getAttendanceByDate(email, date);
    }
}