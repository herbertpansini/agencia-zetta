package br.com.zetta.controller;

import br.com.zetta.service.PerfilService;
import br.com.zetta.service.dto.PerfilDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/perfil")
@RequiredArgsConstructor
public class PerfilController {

    private final PerfilService perfilService;

    @GetMapping
    public ResponseEntity<Page<PerfilDto>> findByNome(@RequestParam(value = "nome", required = false, defaultValue = "") String nome, Pageable pageable) {
        return ResponseEntity.ok( this.perfilService.findByNome(nome, pageable) );
    }

    @GetMapping("/{id}")
    public ResponseEntity<PerfilDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok( this.perfilService.findById(id) );
    }

    @PostMapping
    public ResponseEntity<PerfilDto> save(@Valid @RequestBody PerfilDto perfilDto) {
        return new ResponseEntity<>(this.perfilService.save(perfilDto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PerfilDto> update(@PathVariable Long id, @Valid @RequestBody PerfilDto perfilDto) {
        return ResponseEntity.ok( this.perfilService.update(id, perfilDto) );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.perfilService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
