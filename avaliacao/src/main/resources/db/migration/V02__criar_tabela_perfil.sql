CREATE TABLE perfil (
	id bigserial NOT NULL,
	nome varchar(50) NOT NULL,
	CONSTRAINT perfil_nome_uk UNIQUE (nome),
	CONSTRAINT perfil_pkey PRIMARY KEY (id)
);