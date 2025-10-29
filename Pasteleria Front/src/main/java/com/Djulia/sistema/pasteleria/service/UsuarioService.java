package com.Djulia.sistema.pasteleria.service;

import com.Djulia.sistema.pasteleria.entity.Usuario;

import java.util.List;

public interface UsuarioService {
    List<Usuario> listarUsuarios();
    Usuario obtenerPorId(Long id);
    Usuario obtenerPorEmail(String email);
    Usuario guardar(Usuario usuario);
    void eliminar(Long id);
}