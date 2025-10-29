package com.Djulia.sistema.pasteleria.controller;

import com.Djulia.sistema.pasteleria.security.jwt.JwtProvider;
import com.Djulia.sistema.pasteleria.util.ApiResponse;
import org.springframework.http.ResponseEntity;

public abstract class SecuredController {

    protected final JwtProvider jwtProvider;

    protected SecuredController(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    protected ResponseEntity<ApiResponse<String>> validarToken(String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(401)
                    .body(new ApiResponse<>(false, "Token no proporcionado o inválido", null));
        }

        String jwt = token.substring(7);

        if (!jwtProvider.validarToken(jwt)) {
            return ResponseEntity.status(401)
                    .body(new ApiResponse<>(false, "Token expirado o inválido", null));
        }

        return null;
    }
}