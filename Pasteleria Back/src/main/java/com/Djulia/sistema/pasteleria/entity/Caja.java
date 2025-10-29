package com.Djulia.sistema.pasteleria.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "cajas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Caja {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime apertura;
    private LocalDateTime cierre;

    private Double saldoInicial;
    private Double saldoFinal;

    @OneToMany(mappedBy = "caja", cascade = CascadeType.ALL)
    private List<Venta> ventas;
}