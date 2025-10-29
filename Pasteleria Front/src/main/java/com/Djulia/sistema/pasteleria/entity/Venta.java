package com.Djulia.sistema.pasteleria.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "ventas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Venta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime fecha = LocalDateTime.now();

    private Double total;

    // Relación con cliente
    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    // Relación con usuario vendedor
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario vendedor;

    // Relación con los productos vendidos
    @OneToMany(mappedBy = "venta", cascade = CascadeType.ALL)
    private List<VentaDetalle> detalles;

    // Relación con caja
    @ManyToOne
    @JoinColumn(name = "caja_id")
    private Caja caja;
}