package com.Djulia.sistema.pasteleria.controller;

import com.Djulia.sistema.pasteleria.entity.Categoria;
import com.Djulia.sistema.pasteleria.security.jwt.JwtProvider;
import com.Djulia.sistema.pasteleria.service.CategoriaService;
import com.Djulia.sistema.pasteleria.util.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/categorias")
public class CategoriaController extends SecuredController {

    private final CategoriaService categoriaService;

    public CategoriaController(CategoriaService categoriaService, JwtProvider jwtProvider) {
        super(jwtProvider);
        this.categoriaService = categoriaService;
    }

    @GetMapping
    public ResponseEntity<?> listarCategorias(@RequestHeader("Authorization") String token) {
        var validacion = validarToken(token);
        if (validacion != null) return validacion;

        return ResponseEntity.ok(new ApiResponse<>(true, "Lista de categorías", categoriaService.listarCategorias()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerCategoria(@RequestHeader("Authorization") String token, @PathVariable Long id) {
        var validacion = validarToken(token);
        if (validacion != null) return validacion;

        Categoria categoria = categoriaService.obtenerPorId(id);
        if (categoria == null)
            return ResponseEntity.ok(new ApiResponse<>(false, "Categoría no encontrada", null));

        return ResponseEntity.ok(new ApiResponse<>(true, "Categoría encontrada", categoria));
    }

    @PostMapping
    public ResponseEntity<?> crearCategoria(@RequestHeader("Authorization") String token, @Valid @RequestBody Categoria categoria) {
        var validacion = validarToken(token);
        if (validacion != null) return validacion;

        Categoria creada = categoriaService.guardar(categoria);
        return ResponseEntity.ok(new ApiResponse<>(true, "Categoría creada exitosamente", creada));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarCategoria(@RequestHeader("Authorization") String token, @PathVariable Long id, @Valid @RequestBody Categoria categoria) {
        var validacion = validarToken(token);
        if (validacion != null) return validacion;

        Categoria existente = categoriaService.obtenerPorId(id);
        if (existente == null)
            return ResponseEntity.ok(new ApiResponse<>(false, "Categoría no encontrada", null));

        categoria.setId(id);
        Categoria actualizada = categoriaService.guardar(categoria);
        return ResponseEntity.ok(new ApiResponse<>(true, "Categoría actualizada exitosamente", actualizada));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarCategoria(@RequestHeader("Authorization") String token, @PathVariable Long id) {
        var validacion = validarToken(token);
        if (validacion != null) return validacion;

        Categoria existente = categoriaService.obtenerPorId(id);
        if (existente == null)
            return ResponseEntity.ok(new ApiResponse<>(false, "Categoría no encontrada", null));

        categoriaService.eliminar(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Categoría eliminada exitosamente", null));
    }
}