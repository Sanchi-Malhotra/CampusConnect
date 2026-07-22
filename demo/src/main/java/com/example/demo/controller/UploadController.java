package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@RestController
@CrossOrigin("*")
public class UploadController {

    private final String UPLOAD_DIR =
    System.getProperty("user.dir")
    + File.separator
    + "uploads"
    + File.separator;

    @PostMapping("/upload")
    public String uploadImage(
            @RequestParam("image") MultipartFile file)
            throws IOException {
    
        File dir = new File(UPLOAD_DIR);
    
        if (!dir.exists()) {
            dir.mkdirs();
        }
    
        String fileName =
                UUID.randomUUID() + "_" +
                file.getOriginalFilename();
    
                File uploadFile =
                new File(dir, fileName);
    
        file.transferTo(uploadFile);
  
    
        return "/uploads/" + fileName;
    }
    }
