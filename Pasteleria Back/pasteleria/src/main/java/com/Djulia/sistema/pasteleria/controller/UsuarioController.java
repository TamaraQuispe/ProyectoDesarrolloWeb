package com.Djulia.sistema.pasteleria.controller;

import com.Djulia.sistema.pasteleria.entity.Usuario;
import com.Djulia.sistema.pasteleria.security.jwt.JwtProvider;
import com.Djulia.sistema.pasteleria.service.UsuarioService;
import com.Djulia.sistema.pasteleria.util.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController extends SecuredController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService, JwtProvider jwtProvider) {
        super(jwtProvider);
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public ResponseEntity<?> listarUsuarios(@RequestHeader("Authorization") String token) {
        var validacion = validarToken(token);
        if (validacion != null) return validacion;

        List<Usuario> lista = usuarioService.listarUsuarios();
        return ResponseEntity.ok(new ApiResponse<>(true, "Lista de usuarios", lista));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerUsuario(@RequestHeader("Authorization") String token, @PathVariable Long id) {
        var validacion = validarToken(token);
        if (validacion != null) return validacion;

        Usuario usuario = usuarioService.obtenerPorId(id);
        if (usuario == null)
            return ResponseEntity.ok(new ApiResponse<>(false, "Usuario no encontrado", null));

        return ResponseEntity.ok(new ApiResponse<>(true, "Usuario encontrado", usuario));
    }

    @GetMapping("/email")
    public ResponseEntity<?> obtenerPorEmail(@RequestHeader("Authorization") String token, @RequestParam String email) {
        var validacion = validarToken(token);
        if (validacion != null) return validacion;

        Usuario usuario = usuarioService.obtenerPorEmail(email);
        if (usuario == null)
            return ResponseEntity.ok(new ApiResponse<>(false, "Usuario no encontrado con email: " + email, null));

        return ResponseEntity.ok(new ApiResponse<>(true, "Usuario encontrado", usuario));
    }

    @PostMapping
    public ResponseEntity<?> crearUsuario(@RequestHeader("Authorization") String token, @Valid @RequestBody Usuario usuario) {
        var validacion = validarToken(token);
        if (validacion != null) return validacion;

        Usuario creado = usuarioService.guardar(usuario);
        return ResponseEntity.ok(new ApiResponse<>(true, "Usuario creado exitosamente", creado));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarUsuario(@RequestHeader("Authorization") String token, @PathVariable Long id, @Valid @RequestBody Usuario usuario) {
        var validacion = validarToken(token);
        if (validacion != null) return validacion;

        Usuario existente = usuarioService.obtenerPorId(id);
        if (existente == null)
            return ResponseEntity.ok(new ApiResponse<>(false, "Usuario no encontrado", null));

        usuario.setId(id);

        if (usuario.getPassword() == null || usuario.getPassword().isBlank()) {
            usuario.setPassword(existente.getPassword());
        }

        Usuario actualizado = usuarioService.guardar(usuario);
        return ResponseEntity.ok(new ApiResponse<>(true, "Usuario actualizado exitosamente", actualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarUsuario(@RequestHeader("Authorization") String token, @PathVariable Long id) {
        var validacion = validarToken(token);
        if (validacion != null) return validacion;

        Usuario existente = usuarioService.obtenerPorId(id);
        if (existente == null)
            return ResponseEntity.ok(new ApiResponse<>(false, "Usuario no encontrado", null));

        usuarioService.eliminar(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Usuario eliminado exitosamente", null));
    }
}