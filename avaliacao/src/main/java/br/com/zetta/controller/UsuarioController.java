package br.com.zetta.controller;

import br.com.zetta.service.UsuarioService;
import br.com.zetta.service.dto.UsuarioDto;
import br.com.zetta.service.dto.UsuarioFilterDto;
import br.com.zetta.service.dto.UsuarioListDto;
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
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/usuario")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @PostMapping("/filtrar")
    public ResponseEntity<Page<UsuarioListDto>> findByUsuario(@RequestBody UsuarioFilterDto usuarioFilterDto, Pageable pageable) {
        return ResponseEntity.ok( this.usuarioService.findByUsuario(usuarioFilterDto, pageable) );
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok( this.usuarioService.findById(id) );
    }

    @PostMapping
    public ResponseEntity<UsuarioDto> save(@Valid @RequestBody UsuarioDto usuarioDto) {
        return new ResponseEntity<>(this.usuarioService.save(usuarioDto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDto> update(@PathVariable Long id, @Valid @RequestBody UsuarioDto usuarioDto) {
        return ResponseEntity.ok( this.usuarioService.update(id, usuarioDto) );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.usuarioService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
