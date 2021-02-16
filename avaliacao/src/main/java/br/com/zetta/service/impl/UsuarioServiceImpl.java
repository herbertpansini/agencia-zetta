package br.com.zetta.service.impl;

import br.com.zetta.model.Usuario;
import br.com.zetta.repository.UsuarioRepository;
import br.com.zetta.service.UsuarioService;
import br.com.zetta.service.dto.UsuarioDto;
import br.com.zetta.service.dto.UsuarioFilterDto;
import br.com.zetta.service.dto.UsuarioListDto;
import br.com.zetta.service.mapper.UsuarioMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;

@Service
@Transactional
@RequiredArgsConstructor
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioMapper usuarioMapper;
    private final UsuarioRepository usuarioRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<UsuarioListDto> findByUsuario(UsuarioFilterDto usuarioFilterDto, Pageable pageable) {
        return this.usuarioRepository.findByUsuario(usuarioFilterDto, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public UsuarioDto findById(Long id) {
        return this.usuarioMapper.toDto( this.usuarioRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NO_CONTENT, "not.found")) );
    }

    @Override
    public UsuarioDto save(UsuarioDto usuarioDto) {
        this.validate(usuarioDto);
        if (usuarioDto.getDataCadastro() == null) {
            usuarioDto.setDataCadastro(LocalDate.now());
        }
        return this.usuarioMapper.toDto(this.usuarioRepository.save(this.usuarioMapper.toEntity(usuarioDto)));
    }

    @Override
    public UsuarioDto update(Long id, UsuarioDto usuarioDto) {
        UsuarioDto usuarioUpdate = this.findById(id);
        this.validate(usuarioDto);
        BeanUtils.copyProperties(usuarioDto, usuarioUpdate, "id");
        return this.usuarioMapper.toDto(this.usuarioRepository.save(this.usuarioMapper.toEntity(usuarioUpdate)));
    }

    @Override
    public void delete(Long id) {
        this.usuarioRepository.deleteById(id);
    }

    private void validate(UsuarioDto usuarioDto) {
        if (this.validateCpf(usuarioDto)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "cpf.already.exist");
        }
    }

    private boolean validateCpf(UsuarioDto usuarioDto) {
        Usuario usuarioExist = this.usuarioRepository.findByCpf(usuarioDto.getCpf());
        return !(usuarioExist == null || usuarioExist.getId().equals(usuarioDto.getId()));
    }
}
