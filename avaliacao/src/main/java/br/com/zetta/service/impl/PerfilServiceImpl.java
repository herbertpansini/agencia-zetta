package br.com.zetta.service.impl;

import br.com.zetta.model.Perfil;
import br.com.zetta.repository.PerfilRepository;
import br.com.zetta.service.PerfilService;
import br.com.zetta.service.dto.PerfilDto;
import br.com.zetta.service.mapper.PerfilMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@Transactional
@RequiredArgsConstructor
public class PerfilServiceImpl implements PerfilService {

    private final PerfilMapper perfilMapper;
    private final PerfilRepository perfilRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<PerfilDto> findByNome(String nome, Pageable pageable) {
        return this.perfilRepository.findByNome(nome, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public PerfilDto findById(Long id) {
        return this.perfilMapper.toDto( this.perfilRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NO_CONTENT, String.format("perfil.notfound", id))) );
    }

    @Override
    public PerfilDto save(PerfilDto perfilDto) {
        this.validate(perfilDto);
        return this.perfilMapper.toDto( this.perfilRepository.save( this.perfilMapper.toEntity(perfilDto) ) );
    }

    @Override
    public PerfilDto update(Long id, PerfilDto perfilDto) {
        PerfilDto perfilUpdate = this.findById(id);
        this.validate(perfilDto);
        BeanUtils.copyProperties(perfilDto, perfilUpdate, "id");
        return this.perfilMapper.toDto(this.perfilRepository.save(this.perfilMapper.toEntity(perfilUpdate)));
    }

    @Override
    public void delete(Long id) {
        this.isBeingUsed(id);
        this.perfilRepository.deleteById(id);
    }

    private void isBeingUsed(Long id) {
        if (this.perfilRepository.isBeingUsed(id) > 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, String.format("perfil.isbeingused", id));
        }
    }

    private void validate(PerfilDto perfilDto) {
        if (this.validateNome(perfilDto)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, String.format("perfil.already.exist", perfilDto.getNome()));
        }
    }

    private boolean validateNome(PerfilDto perfilDto) {
        Perfil perfilExist = this.perfilRepository.findByNomeEqualsIgnoreCase(perfilDto.getNome());
        return !(perfilExist == null || perfilExist.getId().equals(perfilDto.getId()));
    }
}
