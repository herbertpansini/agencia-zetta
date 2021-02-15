package br.com.zetta.repository;

import br.com.zetta.model.Cargo;
import br.com.zetta.service.dto.CargoDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CargoRepository extends JpaRepository<Cargo, Long> {

    @Query("SELECT new br.com.zetta.service.dto.CargoDto( " +
            "c.id, " +
            "c.nome) " +
           "FROM Cargo c " +
           "WHERE UPPER(c.nome) LIKE UPPER(CONCAT(CONCAT('%', :nome), '%'))")
    Page<CargoDto> findByNome(@Param("nome") String nome, Pageable pageable);

    Cargo findByNomeEqualsIgnoreCase(String nome);

    @Query("SELECT COUNT(c.id) " +
           "FROM Usuario u " +
           "INNER JOIN u.cargo c " +
           "WHERE c.id = :id")
    Long isBeingUsed(@Param("id") Long id);
}
