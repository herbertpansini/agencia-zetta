package br.com.zetta.service.impl;

import br.com.zetta.model.Cargo;
import br.com.zetta.repository.CargoRepository;
import br.com.zetta.service.CargoService;
import br.com.zetta.service.dto.CargoDto;
import br.com.zetta.service.mapper.CargoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CargoServiceImpl implements CargoService {

    private final CargoMapper cargoMapper;
    private final CargoRepository cargoRepository;

    @Override
    @Transactional(readOnly = true)
    public List<CargoDto> findAll() {
        return this.cargoMapper.toDto( this.cargoRepository.findAll() );
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CargoDto> findByNome(String nome, Pageable pageable) {
        return this.cargoRepository.findByNome(nome, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public CargoDto findById(Long id) {
        return this.cargoMapper.toDto( this.cargoRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NO_CONTENT, "not.found")) );
    }

    @Override
    public CargoDto save(CargoDto cargoDto) {
        this.validate(cargoDto);
        return this.cargoMapper.toDto( this.cargoRepository.save( this.cargoMapper.toEntity(cargoDto) ) );
    }

    @Override
    public CargoDto update(Long id, CargoDto cargoDto) {
        CargoDto cargoUpdate = this.findById(id);
        this.validate(cargoDto);
        BeanUtils.copyProperties(cargoDto, cargoUpdate, "id");
        return this.cargoMapper.toDto(this.cargoRepository.save(this.cargoMapper.toEntity(cargoUpdate)));
    }

    @Override
    public void delete(Long id) {
        this.isBeingUsed(id);
        this.cargoRepository.deleteById(id);
    }

    private void isBeingUsed(Long id) {
        if (this.cargoRepository.isBeingUsed(id) > 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "is.being.used");
        }
    }

    private void validate(CargoDto cargoDto) {
        if (this.validateNome(cargoDto)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "already.exist");
        }
    }

    private boolean validateNome(CargoDto cargoDto) {
        Cargo cargoExist = this.cargoRepository.findByNomeEqualsIgnoreCase(cargoDto.getNome());
        return !(cargoExist == null || cargoExist.getId().equals(cargoDto.getId()));
    }
}
