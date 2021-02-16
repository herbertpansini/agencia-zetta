package br.com.zetta.repository;

import br.com.zetta.model.Usuario;
import br.com.zetta.service.dto.UsuarioFilterDto;
import br.com.zetta.service.dto.UsuarioListDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Usuario findByCpf(String cpf);

    @Query("SELECT new br.com.zetta.service.dto.UsuarioListDto( " +
            "u.id, " +
            "u.dataCadastro, " +
            "u.nome, " +
            "u.cpf, " +
            "u.dataNascimento, " +
            "u.sexo, " +
            "u.cargo.nome) " +
            "FROM Usuario u " +
            "WHERE (:#{#filter.cargo} IS NULL OR u.cargo.id = :#{#filter.cargo}) " +
            "  AND UPPER(u.nome) LIKE UPPER(CONCAT(CONCAT('%', :#{#filter.nome}), '%'))")
    Page<UsuarioListDto> findByUsuario(@Param("filter") UsuarioFilterDto usuarioFilterDto, Pageable pageable);
}
