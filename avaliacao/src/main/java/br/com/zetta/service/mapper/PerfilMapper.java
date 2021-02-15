package br.com.zetta.service.mapper;

import br.com.zetta.model.Perfil;
import br.com.zetta.service.dto.PerfilDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PerfilMapper extends EntityMapper<PerfilDto, Perfil> {

}
