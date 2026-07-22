package com.example.demo.controller;

import com.example.demo.dto.AuthResponse;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.entity.User;
import com.example.demo.service.JWTService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins="*")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
private JWTService jwtService;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
    
        if(userService.emailExists(request.getEmail())) {
            return "Email already registered";
        }
    
        User user = new User();
    
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setUniversity(request.getUniversity());
    
        userService.saveUser(user);
    
        return "Registration Successful";
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    
        User user = userService.login(
            request.getEmail(),
            request.getPassword()
    );
    
        if(user == null){
            return ResponseEntity.badRequest().body("Invalid Credentials");
        }
    
        String token = jwtService.generateToken(user.getEmail());
        return ResponseEntity.ok(new AuthResponse(token, user));
    }
    }
