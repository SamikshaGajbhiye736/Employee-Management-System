package com.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.entity.Attendance;
import com.entity.Attendance.AttendanceKey;

import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, AttendanceKey> {
    List<Attendance> findByEmail(String email);

	Attendance findByEmailAndDate(String email, String date);
}