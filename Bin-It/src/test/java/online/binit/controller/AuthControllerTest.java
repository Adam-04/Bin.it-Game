package online.binit.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import static org.mockito.Mockito.when;

import online.binit.dto.AuthResponse;
import online.binit.dto.LoginRequest;
import online.binit.dto.RegisterRequest;
import online.binit.service.AuthService;

class AuthControllerTest {

    @Test
    void testRegister() {
        AuthService mockService = Mockito.mock(AuthService.class);
        AuthController controller = new AuthController(mockService);

        RegisterRequest request = new RegisterRequest();
        request.setUsername("murtaaz");
        request.setEmail("test@test.com");
        request.setPassword("1234");

        AuthResponse response =
                new AuthResponse(null, "murtaaz", "token", "User registered successfully");

        when(mockService.register(request)).thenReturn(response);

        var result = controller.register(request);

        assertEquals(201, result.getStatusCode().value());
        assertEquals("murtaaz", result.getBody().getUsername());
    }

    @Test
    void testLogin() {
        AuthService mockService = Mockito.mock(AuthService.class);
        AuthController controller = new AuthController(mockService);

        LoginRequest request = new LoginRequest();
        request.setUsername("murtaaz");
        request.setPassword("1234");

        AuthResponse response =
                new AuthResponse(null, "murtaaz", "token", "Login successful");

        when(mockService.login(request)).thenReturn(response);

        var result = controller.login(request);

        assertEquals(200, result.getStatusCode().value());
        assertEquals("murtaaz", result.getBody().getUsername());
    }
}