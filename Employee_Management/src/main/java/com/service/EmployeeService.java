package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.Employee;
import com.repository.EmployeeRepository;

@Service
public class EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;
	
	// adds employee data
	public Employee AddEmployee(Employee employee) {
		return employeeRepository.save(employee);
	}
	
	// Get all employees data
	public List<Employee> getAllEmployees(){
		return employeeRepository.findAll();
	}
	
	// update employee data
	public Employee updateEmployee(Long id, Employee employee) {
		employee.setId(id);
		return employeeRepository.save(employee);
	}
	
	// delete employee data
	public void deleteEmployee(Long id) {
		employeeRepository.deleteById(id);
	}
	
	
	// get employee by particular id
	
	public Employee getEmployeeById(Long id) {
	    return employeeRepository.findById(id).orElse(null);
	}
	
	// get employee by email
	public Employee getByEmail(String email) {
	    return employeeRepository.findByEmail(email);
	}
}









