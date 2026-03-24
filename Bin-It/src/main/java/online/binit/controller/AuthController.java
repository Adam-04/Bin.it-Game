package online.binit.controller;
 
import online.binit.dto.AuthResponse;
import online.binit.dto.LoginRequest;
import online.binit.dto.RegisterRequest;
import online.binit.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
 
@RestController
@RequestMapping("/auth")
public class AuthController {
 
    private final AuthService authService;
 
    public AuthController(AuthService authService) {
        this.authService = authService;
    }
 
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
 
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}
