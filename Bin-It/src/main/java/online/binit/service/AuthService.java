package online.binit.service;

import org.springframework.stereotype.Service;

import online.binit.dto.AuthResponse;
import online.binit.dto.LoginRequest;
import online.binit.dto.RegisterRequest;
import online.binit.model.UserDetail;
import online.binit.repository.UserRepository;
import online.binit.security.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse register(RegisterRequest request) {
        // Registration logic (e.g., save user to database)
        
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("Username already taken");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("An account with this email already exists");
        }

        UserDetail newUser = new UserDetail();
        newUser.setUsername(request.getUsername());
        newUser.setEmail(request.getEmail());
        newUser.setPasswordHash(passwordEncoder.encode(request.getPassword()));

        userRepository.save(newUser);

        String token = jwtUtil.generateToken(newUser.getId(), newUser.getUsername());

        return new AuthResponse(newUser.getId(), newUser.getUsername(), token, "User registered successfully");
    }

    public AuthResponse login(LoginRequest request) {
        // Authentication logic (e.g., verify credentials, generate JWT)
        
        UserDetail user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid username or password");
        }

        String token = jwtUtil.generateToken(user.getId(), user.getUsername());

        return new AuthResponse(user.getId(), user.getUsername(), token, "Login successful");
    }



 

}
