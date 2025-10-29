package com.Djulia.sistema.pasteleria.service;


import com.Djulia.sistema.pasteleria.entity.Rol;

import java.util.List;

public interface RolService {
    List<Rol> listarRoles();
    Rol obtenerPorId(Long id);
    Rol obtenerPorNombre(String nombre);
    Rol guardar(Rol rol);
    void eliminar(Long id);
}