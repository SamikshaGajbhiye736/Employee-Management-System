package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.entity.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long>{
	List<Task> findByEmail(String email); // 🔥 get tasks of logged user
}
