// package com.example.server.controller;


// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import com.example.server.dto.AdminDTO;
// import com.example.server.service.AdminService;

// import lombok.RequiredArgsConstructor;
// import lombok.extern.slf4j.Slf4j;

// @RestController
// @RequestMapping("api/admin")
// @RequiredArgsConstructor
// @Slf4j
// public class AdminController {
//     private final AdminService adminService;

//     @PostMapping("/login")
//     public ResponseEntity<AdminDTO> login(@RequestBody AdminDTO adminRequest) {
//         AdminDTO admin = adminService.login(adminRequest.getUsername(), adminRequest.getPassword());
//         if(admin != null){
//             log.info("Admin logged in successfully");
//             return ResponseEntity.ok(admin);
//         }
//         else{
//             log.warn("Admin login failed");
//             return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//         }
//     }
//     @PostMapping("/logout")
//     public ResponseEntity<Void> logout (){
//         return ResponseEntity.noContent().build();
//     }
//     @GetMapping("/users")
//     public String getUsers(){
//         log.info("Fetching users");
//         return "Users";
//     }
// }
