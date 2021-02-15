package br.com.zetta.repository;

import br.com.zetta.model.Perfil;
import br.com.zetta.service.dto.PerfilDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PerfilRepository extends JpaRepository<Perfil, Long> {

    @Query("SELECT new br.com.zetta.service.dto.PerfilDto( " +
            "p.id, " +
            "p.nome) " +
            "FROM Perfil p " +
            "WHERE UPPER(p.nome) LIKE UPPER(CONCAT(CONCAT('%', :nome), '%'))")
    Page<PerfilDto> findByNome(@Param("nome") String nome, Pageable pageable);

    Perfil findByNomeEqualsIgnoreCase(String nome);

    @Query(value = "SELECT COUNT(p.id) " +
                   "FROM perfil p " +
                   "INNER JOIN usuario_perfil up ON (up.id_perfil = p.id) " +
                   "WHERE p.id = :id", nativeQuery = true)
    Long isBeingUsed(@Param("id") Long id);
}