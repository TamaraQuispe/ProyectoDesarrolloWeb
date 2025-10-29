package com.Djulia.sistema.pasteleria.controller;

import com.Djulia.sistema.pasteleria.entity.Producto;
import com.Djulia.sistema.pasteleria.security.jwt.JwtProvider;
import com.Djulia.sistema.pasteleria.service.ProductoService;
import com.Djulia.sistema.pasteleria.util.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
public class ProductoController extends SecuredController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService, JwtProvider jwtProvider) {
        super(jwtProvider);
        this.productoService = productoService;
    }

    @GetMapping
    public ResponseEntity<?> listarProductos(@RequestHeader("Authorization") String token) {
        var validacion = validarToken(token);
        if (validacion != null) return validacion;

        return ResponseEntity.ok(new ApiResponse<>(true, "Lista de productos", productoService.listarProductos()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerProducto(@RequestHeader("Authorization") String token, @PathVariable Long id) {
        var validacion = validarToken(token);
        if (validacion != null) return validacion;

        Producto producto = productoService.obtenerPorId(id);
        if (producto == null)
            return ResponseEntity.ok(new ApiResponse<>(false, "Producto no encontrado", null));

        return ResponseEntity.ok(new ApiResponse<>(true, "Producto encontrado", producto));
    }

    @GetMapping("/categoria/{categoriaId}")
    public ResponseEntity<?> listarPorCategoria(@RequestHeader("Authorization") String token, @PathVariable Long categoriaId) {
        var validacion = validarToken(token);
        if (validacion != null) return validacion;

        List<Producto> lista = productoService.listarPorCategoria(categoriaId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Productos por categoría", lista));
    }

    @PostMapping
    public ResponseEntity<?> crearProducto(@RequestHeader("Authorization") String token, @Valid @RequestBody Producto producto) {
        var validacion = validarToken(token);
        if (validacion != null) return validacion;

        Producto creado = productoService.guardar(producto);
        return ResponseEntity.ok(new ApiResponse<>(true, "Producto creado exitosamente", creado));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarProducto(@RequestHeader("Authorization") String token, @PathVariable Long id, @Valid @RequestBody Producto producto) {
        var validacion = validarToken(token);
        if (validacion != null) return validacion;

        Producto existente = productoService.obtenerPorId(id);
        if (existente == null)
            return ResponseEntity.ok(new ApiResponse<>(false, "Producto no encontrado", null));

        producto.setId(id);
        Producto actualizado = productoService.guardar(producto);
        return ResponseEntity.ok(new ApiResponse<>(true, "Producto actualizado exitosamente", actualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarProducto(@RequestHeader("Authorization") String token, @PathVariable Long id) {
        var validacion = validarToken(token);
        if (validacion != null) return validacion;

        Producto existente = productoService.obtenerPorId(id);
        if (existente == null)
            return ResponseEntity.ok(new ApiResponse<>(false, "Producto no encontrado", null));

        productoService.eliminar(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Producto eliminado exitosamente", null));
    }
}