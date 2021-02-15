package br.com.zetta.service.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class UsuarioFilterDto implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long cargo;
    private String nome;
}
