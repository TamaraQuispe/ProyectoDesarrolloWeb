package com.Djulia.sistema.pasteleria.repository;

import com.Djulia.sistema.pasteleria.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {


    Categoria findByNombre(String nombre);
}