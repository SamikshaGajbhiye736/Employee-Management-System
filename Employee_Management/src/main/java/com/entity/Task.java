package com.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Task {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String taskName;
	private String description;
	private String project;
	private String assignedBy;
	private String assignedTo;
	private String email;
	private String priority;
	private String status;
	private String startDate;
	private String endDate;
	private String remarks;
	private String assigendBy;
	
	
	public Task() {
		
	}


	public Task(Long id, String taskName, String description, String project, String assignedBy, String assignedTo,
			String email, String priority, String status, String startDate, String endDate, String remarks,
			String assigendBy) {
		super();
		this.id = id;
		this.taskName = taskName;
		this.description = description;
		this.project = project;
		this.assignedBy = assignedBy;
		this.assignedTo = assignedTo;
		this.email = email;
		this.priority = priority;
		this.status = status;
		this.startDate = startDate;
		this.endDate = endDate;
		this.remarks = remarks;
		this.assigendBy = assigendBy;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getTaskName() {
		return taskName;
	}


	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public String getProject() {
		return project;
	}


	public void setProject(String project) {
		this.project = project;
	}


	public String getAssignedBy() {
		return assignedBy;
	}


	public void setAssignedBy(String assignedBy) {
		this.assignedBy = assignedBy;
	}


	public String getAssignedTo() {
		return assignedTo;
	}


	public void setAssignedTo(String assignedTo) {
		this.assignedTo = assignedTo;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getPriority() {
		return priority;
	}


	public void setPriority(String priority) {
		this.priority = priority;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public String getStartDate() {
		return startDate;
	}


	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}


	public String getEndDate() {
		return endDate;
	}


	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}


	public String getRemarks() {
		return remarks;
	}


	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}


	public String getAssigendBy() {
		return assigendBy;
	}


	public void setAssigendBy(String assigendBy) {
		this.assigendBy = assigendBy;
	}


	
	
	
	
	
	
}
