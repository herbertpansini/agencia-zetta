package br.com.zetta.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import java.time.LocalDate;
import java.util.List;

@Table(name = "usuario")
@Entity
@Data
public class Usuario extends Pessoa {

    @Column(name = "data_cadastro", nullable = false)
    private LocalDate dataCadastro;

    @ManyToOne
    @JoinColumn(name = "id.cargo", nullable = false)
    private Cargo cargo;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "usuario_perfil",
            joinColumns = @JoinColumn(name = "id.usuario"),
            inverseJoinColumns = @JoinColumn(name = "id.perfil"),
            uniqueConstraints = { @UniqueConstraint(columnNames = {"id.usuario", "id.perfil"}) })
    private List<Perfil> perfis;
}