package com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dto.RegisterDTO;
import com.entity.User;
import com.repository.userRepository;

@Service
public class userService {

    @Autowired
    private userRepository UserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // register
    public User saveUser(RegisterDTO dto) {

        User user = new User();

        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole(dto.getRole());

        return UserRepository.save(user);
    }

    // login
    public User loginUser(String email, String password) {
        User user = UserRepository.findByEmail(email);

        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user;
        } else {
            return null;
        }
    }
}