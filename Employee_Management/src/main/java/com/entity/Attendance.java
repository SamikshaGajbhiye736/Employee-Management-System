package com.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@IdClass(Attendance.AttendanceKey.class)
public class Attendance {

    @Id
    private String email;

    @Id
    private String date; // format: yyyy-MM-dd

    private String day;
    private String status;
    private String checkIn;
    private String checkOut;

    // getters and setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getDay() { return day; }
    public void setDay(String day) { this.day = day; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getCheckIn() { return checkIn; }
    public void setCheckIn(String checkIn) { this.checkIn = checkIn; }

    public String getCheckOut() { return checkOut; }
    public void setCheckOut(String checkOut) { this.checkOut = checkOut; }

    // Composite key class
    public static class AttendanceKey implements Serializable {
        private String email;
        private String date;

        public AttendanceKey() {}
        public AttendanceKey(String email, String date) {
            this.email = email;
            this.date = date;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof AttendanceKey)) return false;
            AttendanceKey that = (AttendanceKey) o;
            return Objects.equals(email, that.email) && Objects.equals(date, that.date);
        }

        @Override
        public int hashCode() {
            return Objects.hash(email, date);
        }
    }
}