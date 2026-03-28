package com.service;


import org.springframework.stereotype.Service;

import com.entity.Attendance;
import com.repository.AttendanceRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AttendanceService {

    private final AttendanceRepository repository;

    public AttendanceService(AttendanceRepository repository) {
        this.repository = repository;
    }

    public List<Attendance> getAttendance(String email, int month, int year) {
        return repository.findByEmail(email).stream()
                .filter(a -> {
                    String[] parts = a.getDate().split("-"); // yyyy-MM-dd
                    int y = Integer.parseInt(parts[0]);
                    int m = Integer.parseInt(parts[1]);
                    return y == year && m == month;
                })
                .collect(Collectors.toList());
    }

	public Attendance save(Attendance attendance) {
		
		return repository.save(attendance);
	}
	
	
	public Attendance getAttendanceByDate(String email, String date) {
	    return repository.findByEmailAndDate(email, date);
	}
}