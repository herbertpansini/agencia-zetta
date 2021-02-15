package br.com.zetta.service.mapper;

import org.mapstruct.Mapper;

import br.com.zetta.model.Cargo;
import br.com.zetta.service.dto.CargoDto;

@Mapper(componentModel = "spring")
public interface CargoMapper extends EntityMapper<CargoDto, Cargo> {

}