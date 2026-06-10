package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;



@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    public boolean emailExists(String email) {
        return userRepository.findByEmail(email) != null;
    }
    public User login(String email, String password) {

        User user = userRepository.findByEmail(email);
    
        if(user != null &&
           user.getPassword().equals(password)) {
            return user;
        }
    
        return null;
    }
}