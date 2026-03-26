package online.binit.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.Optional;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import online.binit.dto.AuthResponse;
import online.binit.dto.LoginRequest;
import online.binit.dto.RegisterRequest;
import online.binit.model.UserDetail;
import online.binit.repository.UserRepository;
import online.binit.security.JwtUtil;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthService authService;

    @Test
    void testRegisterSuccess() {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("murtaaz");
        request.setEmail("murtaaz@test.com");
        request.setPassword("1234");

        UUID userId = UUID.randomUUID();

        when(userRepository.existsByUsername("murtaaz")).thenReturn(false);
        when(userRepository.existsByEmail("murtaaz@test.com")).thenReturn(false);
        when(passwordEncoder.encode("1234")).thenReturn("hashed");

        UserDetail savedUser = new UserDetail();
        savedUser.setId(userId);
        savedUser.setUsername("murtaaz");

        when(userRepository.save(any())).thenReturn(savedUser);
        when(jwtUtil.generateToken(userId, "murtaaz")).thenReturn("token");

        AuthResponse response = authService.register(request);

        assertEquals("murtaaz", response.getUsername());
        assertEquals("token", response.getToken());
    }

    @Test
    void testRegisterUsernameExists() {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("murtaaz");

        when(userRepository.existsByUsername("murtaaz")).thenReturn(true);

        assertThrows(IllegalArgumentException.class, () -> authService.register(request));
    }

    @Test
    void testRegisterEmailExists() {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("murtaaz");
        request.setEmail("murtaaz@test.com");

        when(userRepository.existsByUsername("murtaaz")).thenReturn(false);
        when(userRepository.existsByEmail("murtaaz@test.com")).thenReturn(true);

        assertThrows(IllegalArgumentException.class, () -> authService.register(request));
    }

    @Test
    void testLoginSuccess() {
        LoginRequest request = new LoginRequest();
        request.setUsername("murtaaz");
        request.setPassword("1234");

        UUID userId = UUID.randomUUID();

        UserDetail user = new UserDetail();
        user.setId(userId);
        user.setUsername("murtaaz");
        user.setPasswordHash("hashed");

        when(userRepository.findByUsername("murtaaz")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("1234", "hashed")).thenReturn(true);
        when(jwtUtil.generateToken(userId, "murtaaz")).thenReturn("token");

        AuthResponse response = authService.login(request);

        assertEquals("murtaaz", response.getUsername());
        assertEquals("token", response.getToken());
    }

    @Test
    void testLoginUserNotFound() {
        LoginRequest request = new LoginRequest();
        request.setUsername("murtaaz");

        when(userRepository.findByUsername("murtaaz")).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> authService.login(request));
    }

    @Test
    void testLoginWrongPassword() {
        LoginRequest request = new LoginRequest();
        request.setUsername("murtaaz");
        request.setPassword("wrong");

        UserDetail user = new UserDetail();
        user.setUsername("murtaaz");
        user.setPasswordHash("hashed");

        when(userRepository.findByUsername("murtaaz")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("wrong", "hashed")).thenReturn(false);

        assertThrows(IllegalArgumentException.class, () -> authService.login(request));
    }
}