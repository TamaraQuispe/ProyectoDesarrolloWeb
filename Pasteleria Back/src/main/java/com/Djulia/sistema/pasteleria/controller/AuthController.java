package com.Djulia.sistema.pasteleria.controller;

import com.Djulia.sistema.pasteleria.entity.Usuario;
import com.Djulia.sistema.pasteleria.repository.UsuarioRepository;
import com.Djulia.sistema.pasteleria.security.jwt.JwtProvider;
import com.Djulia.sistema.pasteleria.util.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController extends SecuredController {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UsuarioRepository usuarioRepository,
                          PasswordEncoder passwordEncoder,
                          JwtProvider jwtProvider) {
        super(jwtProvider);
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<String>> login(@RequestParam String email, @RequestParam String password) {
        try {
            Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email);

            if (usuarioOpt.isEmpty()) {
                return ResponseEntity.ok(new ApiResponse<>(false, "Credenciales inválidas", null));
            }

            Usuario usuario = usuarioOpt.get();

            if (!passwordEncoder.matches(password, usuario.getPassword())) {
                return ResponseEntity.ok(new ApiResponse<>(false, "Credenciales inválidas", null));
            }

            if (!usuario.getRol().getNombre().equalsIgnoreCase("ADMIN")) {
                return ResponseEntity.ok(new ApiResponse<>(false, "Solo los administradores pueden iniciar sesión", null));
            }

            String token = jwtProvider.generarToken(usuario.getEmail(), "ADMIN");
            return ResponseEntity.ok(new ApiResponse<>(true, "Login exitoso", token));

        } catch (Exception e) {
            return ResponseEntity.ok(new ApiResponse<>(false, "Error al iniciar sesión: " + e.getMessage(), null));
        }
    }

    @PutMapping("/cambiar-password")
    public ResponseEntity<ApiResponse<String>> cambiarPassword(
            @RequestHeader("Authorization") String token,
            @RequestParam String actualPassword,
            @RequestParam String nuevaPassword
    ) {
        try {
            var validacion = validarToken(token);
            if (validacion != null) return ResponseEntity.ok(new ApiResponse<>(false, "Token inválido o expirado", null));

            Usuario usuario = obtenerUsuarioDesdeToken(token);
            if (usuario == null) {
                return ResponseEntity.ok(new ApiResponse<>(false, "Usuario no encontrado", null));
            }

            if (!passwordEncoder.matches(actualPassword, usuario.getPassword())) {
                return ResponseEntity.ok(new ApiResponse<>(false, "La contraseña actual es incorrecta", null));
            }

            if (nuevaPassword.length() < 6) {
                return ResponseEntity.ok(new ApiResponse<>(false, "La nueva contraseña debe tener al menos 6 caracteres", null));
            }

            usuario.setPassword(passwordEncoder.encode(nuevaPassword));
            usuarioRepository.save(usuario);

            return ResponseEntity.ok(new ApiResponse<>(true, "Contraseña actualizada exitosamente", null));

        } catch (Exception e) {
            return ResponseEntity.ok(new ApiResponse<>(false, "Error al cambiar contraseña: " + e.getMessage(), null));
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<Usuario>> obtenerPerfil(@RequestHeader("Authorization") String token) {
        try {
            Usuario usuario = obtenerUsuarioDesdeToken(token);
            if (usuario == null) {
                return ResponseEntity.ok(new ApiResponse<>(false, "Usuario no encontrado o token inválido", null));
            }

            usuario.setPassword("********");
            return ResponseEntity.ok(new ApiResponse<>(true, "Perfil obtenido exitosamente", usuario));

        } catch (Exception e) {
            return ResponseEntity.ok(new ApiResponse<>(false, "Error al obtener perfil: " + e.getMessage(), null));
        }
    }

    private Usuario obtenerUsuarioDesdeToken(String token) {
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                return null;
            }

            String jwt = token.substring(7);
            if (!jwtProvider.validarToken(jwt)) {
                return null;
            }

            String email = jwtProvider.obtenerUsername(jwt);
            return usuarioRepository.findByEmail(email).orElse(null);

        } catch (Exception e) {
            return null;
        }
    }
}