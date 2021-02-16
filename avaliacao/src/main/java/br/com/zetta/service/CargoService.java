package br.com.zetta.service;

import br.com.zetta.service.dto.CargoDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CargoService {

    List<CargoDto> findAll();

    Page<CargoDto> findByNome(String nome, Pageable pageable);

    CargoDto findById(Long id);

    CargoDto save(CargoDto cargoDto);

    CargoDto update(Long id, CargoDto cargoDto);

    void delete(Long id);
}
