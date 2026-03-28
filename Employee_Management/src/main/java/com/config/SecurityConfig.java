package com.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            .cors(cors -> {}) // ✅ IMPORTANT
            .csrf(csrf -> csrf.disable())

            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/users/**").permitAll()
                .requestMatchers("/employees/**").permitAll()
                .requestMatchers("/tasks/**").permitAll()
                .requestMatchers("/attendance/**").permitAll() 
                
                .requestMatchers(
                	    "/",
                	    "/index.html",
                	    "/assets/**",   // 🔥 IMPORTANT
                	    "/favicon.svg",
                	    "/icons.svg",
                	    "/logo-removebg-preview.png",
                	    "/login-5.jpg"
                	).permitAll()
                
                
                .anyRequest().authenticated()
            )

            .formLogin(form -> form.disable());

        return http.build();
    }

    // ✅ CORS CONFIG HERE
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(List.of("*"));
        config.setAllowedMethods(List.of("*"));
        config.setAllowedHeaders(List.of("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}