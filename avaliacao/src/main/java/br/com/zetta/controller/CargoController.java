package br.com.zetta.controller;

import br.com.zetta.service.CargoService;
import br.com.zetta.service.dto.CargoDto;
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
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/cargo")
@RequiredArgsConstructor
public class CargoController {

    private final CargoService cargoService;

    @GetMapping
    public ResponseEntity<List<CargoDto>> findAll() {
        return ResponseEntity.ok( this.cargoService.findAll() );
    }

    @GetMapping("/filtrar")
    public ResponseEntity<Page<CargoDto>> findByNome(@RequestParam(value = "nome", required = false, defaultValue = "") String nome, Pageable pageable) {
        return ResponseEntity.ok( this.cargoService.findByNome(nome, pageable) );
    }

    @GetMapping("/{id}")
    public ResponseEntity<CargoDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok( this.cargoService.findById(id) );
    }

    @PostMapping
    public ResponseEntity<CargoDto> save(@Valid @RequestBody CargoDto cargoDto) {
        return new ResponseEntity<>(this.cargoService.save(cargoDto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CargoDto> update(@PathVariable Long id, @Valid @RequestBody CargoDto cargoDto) {
        return ResponseEntity.ok( this.cargoService.update(id, cargoDto) );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.cargoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
