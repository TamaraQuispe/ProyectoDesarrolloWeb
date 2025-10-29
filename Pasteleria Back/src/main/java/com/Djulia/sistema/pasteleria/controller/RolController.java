package com.Djulia.sistema.pasteleria.controller;

import com.Djulia.sistema.pasteleria.entity.Rol;
import com.Djulia.sistema.pasteleria.security.jwt.JwtProvider;
import com.Djulia.sistema.pasteleria.service.RolService;
import com.Djulia.sistema.pasteleria.util.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RolController extends SecuredController {

    private final RolService rolService;

    public RolController(RolService rolService, JwtProvider jwtProvider) {
        super(jwtProvider);
        this.rolService = rolService;
    }

    @GetMapping
    public ResponseEntity<?> listarRoles(@RequestHeader("Authorization") String token) {
        var validacion = validarToken(token);
        if (validacion != null) return validacion;

        List<Rol> lista = rolService.listarRoles();
        return ResponseEntity.ok(new ApiResponse<>(true, "Lista de roles", lista));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerRol(@RequestHeader("Authorization") String token, @PathVariable Long id) {
        var validacion = validarToken(token);
        if (validacion != null) return validacion;

        Rol rol = rolService.obtenerPorId(id);
        if (rol == null)
            return ResponseEntity.ok(new ApiResponse<>(false, "Rol no encontrado", null));

        return ResponseEntity.ok(new ApiResponse<>(true, "Rol encontrado", rol));
    }

    @PostMapping
    public ResponseEntity<?> crearRol(@RequestHeader("Authorization") String token, @Valid @RequestBody Rol rol) {
        var validacion = validarToken(token);
        if (validacion != null) return validacion;

        Rol creado = rolService.guardar(rol);
        return ResponseEntity.ok(new ApiResponse<>(true, "Rol creado exitosamente", creado));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarRol(@RequestHeader("Authorization") String token, @PathVariable Long id, @Valid @RequestBody Rol rol) {
        var validacion = validarToken(token);
        if (validacion != null) return validacion;

        Rol existente = rolService.obtenerPorId(id);
        if (existente == null)
            return ResponseEntity.ok(new ApiResponse<>(false, "Rol no encontrado", null));

        rol.setId(id);
        Rol actualizado = rolService.guardar(rol);
        return ResponseEntity.ok(new ApiResponse<>(true, "Rol actualizado exitosamente", actualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarRol(@RequestHeader("Authorization") String token, @PathVariable Long id) {
        var validacion = validarToken(token);
        if (validacion != null) return validacion;

        Rol existente = rolService.obtenerPorId(id);
        if (existente == null)
            return ResponseEntity.ok(new ApiResponse<>(false, "Rol no encontrado", null));

        rolService.eliminar(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Rol eliminado exitosamente", null));
    }
}