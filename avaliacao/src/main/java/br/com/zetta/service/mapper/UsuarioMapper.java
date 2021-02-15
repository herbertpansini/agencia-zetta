package br.com.zetta.service.mapper;

import br.com.zetta.model.Usuario;
import br.com.zetta.service.dto.UsuarioDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {CargoMapper.class, PerfilMapper.class})
public interface UsuarioMapper extends EntityMapper<UsuarioDto, Usuario> {

}
