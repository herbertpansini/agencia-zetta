package br.com.zetta.service;

import br.com.zetta.service.dto.UsuarioDto;
import br.com.zetta.service.dto.UsuarioFilterDto;
import br.com.zetta.service.dto.UsuarioListDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UsuarioService {

    Page<UsuarioListDto> findByUsuario(UsuarioFilterDto usuarioFilterDto, Pageable pageable);

    UsuarioDto findById(Long id);

    UsuarioDto save(UsuarioDto usuarioDto);

    UsuarioDto update(Long id, UsuarioDto usuarioDto);

    void delete(Long id);
}
