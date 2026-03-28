package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.Task;
import com.repository.TaskRepository;

@Service
public class TaskService {

	@Autowired
	private TaskRepository taskRepository;
	
	
	// ✅ Save Task
    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

    // ✅ Get All Tasks
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // ✅ Get Tasks by Email (for employee)
    public List<Task> getTasksByEmail(String email) {
        return taskRepository.findByEmail(email);
    }

    // ✅ Get Task by ID
    public Task getTaskById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }

    // ✅ Update Task
    public Task updateTask(Long id, Task newTask) {

        Task existingTask = taskRepository.findById(id).orElse(null);

        if (existingTask != null) {
            existingTask.setTaskName(newTask.getTaskName());
            existingTask.setDescription(newTask.getDescription());
            existingTask.setProject(newTask.getProject());
            existingTask.setAssignedBy(newTask.getAssignedBy());
            existingTask.setAssignedTo(newTask.getAssignedTo());
            existingTask.setEmail(newTask.getEmail());
            existingTask.setPriority(newTask.getPriority());
            existingTask.setStatus(newTask.getStatus());
            existingTask.setStartDate(newTask.getStartDate());
            existingTask.setEndDate(newTask.getEndDate());
            existingTask.setRemarks(newTask.getRemarks());

            return taskRepository.save(existingTask);
        }

        return null;
    }

    // ✅ Delete Task
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
	
}
