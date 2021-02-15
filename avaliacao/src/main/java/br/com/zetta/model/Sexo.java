package br.com.zetta.model;

public enum Sexo {
    M("Masculino"),
    F("Feminino");

    private final String nome;

    Sexo(String nome) {
        this.nome = nome;
    }

    public String getNome() {
        return this.nome;
    }
}
