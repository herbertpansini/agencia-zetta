package br.com.zetta.service.dto;

import br.com.zetta.model.Sexo;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class UsuarioDto implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

    private LocalDate dataCadastro;

    @NotNull
    private String nome;

    @NotNull
    private String cpf;

    private LocalDate dataNascimento;

    private Sexo sexo;

    @NotNull
    private CargoDto cargo;

    private List<PerfilDto> perfis = new ArrayList<>();
}
