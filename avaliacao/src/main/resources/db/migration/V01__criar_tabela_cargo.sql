CREATE TABLE cargo (
	id bigserial NOT NULL,
	nome varchar(50) NOT NULL,
	CONSTRAINT cargo_nome_uk UNIQUE (nome),
	CONSTRAINT cargo_pkey PRIMARY KEY (id)
);