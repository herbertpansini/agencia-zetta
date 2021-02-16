package br.com.zetta.service;

import br.com.zetta.service.dto.PerfilDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PerfilService {

    List<PerfilDto> findAll();

    Page<PerfilDto> findByNome(String nome, Pageable pageable);

    PerfilDto findById(Long id);

    PerfilDto save(PerfilDto perfilDto);

    PerfilDto update(Long id, PerfilDto perfilDto);

    void delete(Long id);
}
