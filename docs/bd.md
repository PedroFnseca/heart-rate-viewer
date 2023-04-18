# Banco de Dados "db_heartHate" 
> ### O banco de dados "db_heartHate" foi criado para armazenar informações relacionadas ao monitoramento cardíaco de usuários. Ele contém três tabelas: "tbl_user", "tbl_emergency_contact" e "tbl_heart". Abaixo estão as descrições detalhadas de cada tabela.

<br>

## Tabela "tbl_user"

### A tabela "tbl_user" armazena informações dos usuários registrados no sistema. Cada usuário tem um ID único e obrigatório, que é gerado automaticamente. A tabela possui os seguintes campos:

| Campo | Tipo | Descrição |
| ----- | ----- | ------ |
| id | INT | ID único do usuário gerado automaticamente (não nulo, chave primária) |
| username |	VARCHAR(50) |	Nome de usuário do usuário (não nulo) |
| email |	VARCHAR(50) |	E-mail do usuário (não nulo) |
| phone |	VARCHAR(20) |	Número de telefone do usuário (não nulo) |
| password |	VARCHAR(50) |	Senha do usuário (não nulo) |
| warningheart | INT(5)	| Limiar de batimentos cardíacos para acionar alerta de emergência (opcional) |

<br>

---

## Tabela "tbl_emergency_contact"

### A tabela "tbl_emergency_contact" armazena informações dos contatos de emergência dos usuários registrados no sistema. Cada contato tem um ID único e obrigatório, que é gerado automaticamente. A tabela possui os seguintes campos:

| Campo | Tipo | Descrição |
| ----- | ----- | ------ |
| id | INT	| id único do contato de emergência gerado automaticamente (não nulo, chave primária)|
| username | VARCHAR(50) |	Nome de usuário do contato de emergência (não nulo)|
| email | VARCHAR(50) |	E-mail do contato de emergência (não nulo)|
| phone | VARCHAR(20) |	Número de telefone do contato de emergência (não nulo)|
| ser_id | INT |	ID do usuário a que este contato de emergência está associado (não nulo, chave estrangeira referenciando tbl_user.id)|

---

## Tabela "tbl_heart"

### A tabela "tbl_heart" armazena informações de monitoramento cardíaco dos usuários registrados no sistema. Cada entrada da tabela tem um ID único e obrigatório, que é gerado automaticamente. A tabela possui os seguintes campos:
| Campo | Tipo | Descrição |
| ----- | ----- | ------ |
|id |	INT |	ID único da leitura gerado automaticamente (não nulo, chave primária)|
|sensor_id |	INT |	ID do sensor que realizou a leitura (não nulo)|
|rate	| INT(5) |	Número de batimentos cardíacos registrados na leitura (não nulo)|
|user_id	| INT	|ID do usuário a que esta leitura está associada (não nulo, chave estrangeira referenciando tbl_user.id)|
|datetime	| DATETIME |	Data e hora da leitura (opcional, padrão é o momento da inserção no banco)|
