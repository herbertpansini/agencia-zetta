package br.com.zetta.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CargoDto implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    private Long id;
    @NotNull
    private String nome;
}
