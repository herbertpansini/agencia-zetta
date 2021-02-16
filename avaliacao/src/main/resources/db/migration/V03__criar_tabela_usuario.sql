CREATE TABLE usuario (
	id bigserial NOT NULL,
	data_cadastro date NOT NULL,
	cpf varchar(11) NOT NULL,
	data_nascimento date NULL,
	nome varchar(255) NOT NULL,
	sexo varchar(1) NULL,
	id_cargo int8 NOT NULL,
	CONSTRAINT usuario_cpf_uk UNIQUE (cpf),
	CONSTRAINT usuario_pkey PRIMARY KEY (id)
);