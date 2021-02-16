CREATE TABLE usuario_perfil (
	id_usuario int8 NOT NULL,
	id_perfil int8 NOT NULL,
	CONSTRAINT usuario_perfil_uk UNIQUE (id_usuario, id_perfil)
);

ALTER TABLE usuario_perfil ADD CONSTRAINT fk_usuario_perfil_usuario_id FOREIGN KEY (id_usuario) REFERENCES usuario(id);
ALTER TABLE usuario_perfil ADD CONSTRAINT fk_usuario_perfil_perfil_id FOREIGN KEY (id_perfil) REFERENCES perfil(id);