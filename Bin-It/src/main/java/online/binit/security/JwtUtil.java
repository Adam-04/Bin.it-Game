package online.binit.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.UUID;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration-ms}")
    private long expirationMs;

    public String generateToken(UUID userId, String username) {
        return JWT.create()
                .withSubject(username)
                .withClaim("userId", userId.toString())
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + expirationMs))
                .sign(Algorithm.HMAC256(secret));
    }

    public String extractUsername(String token) {
        return decode(token).getSubject();
    }

    public UUID extractUserId(String token) {
        return UUID.fromString(decode(token).getClaim("userId").asString());
    }

    public boolean isTokenValid(String token) {
        try {
            JWT.require(Algorithm.HMAC256(secret)).build().verify(token);
            return true;
        } catch (JWTVerificationException e) {
            return false;
        }
    }

    private DecodedJWT decode(String token) {
        return JWT.require(Algorithm.HMAC256(secret)).build().verify(token);
    }
}