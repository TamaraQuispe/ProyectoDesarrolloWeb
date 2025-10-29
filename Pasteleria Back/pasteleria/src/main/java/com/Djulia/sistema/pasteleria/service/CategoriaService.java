package com.Djulia.sistema.pasteleria.service;

import com.Djulia.sistema.pasteleria.entity.Categoria;

import java.util.List;

public interface CategoriaService {
    List<Categoria> listarCategorias();
    Categoria obtenerPorId(Long id);
    Categoria obtenerPorNombre(String nombre);
    Categoria guardar(Categoria categoria);
    void eliminar(Long id);
}