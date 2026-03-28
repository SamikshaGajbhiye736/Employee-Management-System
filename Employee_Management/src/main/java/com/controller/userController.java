package com.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dto.LoginDTO;
import com.dto.RegisterDTO;
import com.entity.User;
import com.service.userService;

@RestController
@CrossOrigin(origins = "/*")
@RequestMapping("/users")

public class userController {
	
	// to create object
	@Autowired
	private userService UserService;
	
	// register logic
	@PostMapping("/register")
	public String registeruser(@RequestBody RegisterDTO dto) {
		UserService.saveUser(dto);
		return "register data added Successfully!!!";
	}
	
	// login logic
	@PostMapping("/login")
	public Map<String, Object> loginUser(@RequestBody LoginDTO dto) {

	    User existingUser = UserService.loginUser(dto.getEmail(), dto.getPassword());

	    Map<String, Object> response = new HashMap<>();

	    if (existingUser != null) {

	        
	        if (existingUser.getRole().equals(dto.getRole())) {
	            response.put("message", "Login Successful");
	            response.put("role", existingUser.getRole());
	            response.put("id", existingUser.getId());
	            response.put("email", existingUser.getEmail());
	            response.put("name", existingUser.getName());
	        } else {
	            response.put("message", "Invalid Role Selected");
	        }

	    } else {
	        response.put("message", "Invalid Email or Password");
	    }

	    return response;
	}
	
	

	
}
