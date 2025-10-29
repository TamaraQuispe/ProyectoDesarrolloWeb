package com.Djulia.sistema.pasteleria.service;

import com.Djulia.sistema.pasteleria.entity.Producto;

import java.util.List;

public interface ProductoService {
    List<Producto> listarProductos();
    Producto obtenerPorId(Long id);
    List<Producto> listarPorCategoria(Long categoriaId);
    Producto guardar(Producto producto);
    void eliminar(Long id);
}