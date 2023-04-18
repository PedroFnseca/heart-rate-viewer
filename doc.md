# Para acessar a API, basta usar o endereço 📡 ``http://localhost:3000/api``

<br>

### O endpoint 🔑 ``.../auth/login`` é responsável por fazer o login na aplicação. Ele só aceita o método ``POST`` e recebe as informações de ``email`` e ``password``. Em troca, você recebe um token ``JWT`` com as informações do usuário.

### Já o endpoint 📈 ``.../reports`` é responsável por gerar relatórios. Para isso, é preciso passar alguns parâmetros, como a data de início 🗓️ ``startDate``, a data de fim 🗓️ ``endDate``, o minimo do sensor ⏰ ``hrRangeMin`` e o ID do usuário 👤 ``userId``. O parâmetro startDate é obrigatório. Em troca, você recebe um ``JSON`` com as informações necessárias para gerar o relatório.

### O endpoint 🧑‍💼 ``.../user`` é responsável por retornar as informações de um usuário específico ou atualizar as informações desse usuário. Ele aceita apenas os métodos ``GET`` e ``PUT`` e requer o parâmetro de ID do usuário. Ao usar o método ``GET``, o endpoint retorna um ``JSON`` com as informações do usuário. Já ao usar o método ``PUT``, é possível atualizar as informações do usuário passando um ``JSON`` com os novos dados.

### O endpoint 🩺 ``.../sensor/heart`` é responsável por permitir o armazenamento e consulta de dados de frequência cardíaca de um determinado sensor. Ele aceita apenas os métodos ``GET`` e ``POST`` e requer os parâmetros ``sensor_id``, ``user_id`` e ``rate``. Ao utilizar o método ``GET``, o endpoint retorna um ``JSON`` com as informações de frequência cardíaca correspondentes ao sensor e usuário especificados. Já ao utilizar o método ``POST``, é possível armazenar uma nova entrada de frequência cardíaca no banco de dados. Para isso, é necessário passar os parâmetros ``sensor_id``, ``user_id`` e ``rate``.

<br>

---

# Possiveis erros 💢

- [x] 200 OK: indica que a requisição foi bem sucedida e a resposta inclui as informações solicitadas.

- [x] 400 Bad Request: indica que a requisição foi mal formada ou possui parâmetros inválidos.

- [x] 401 Unauthorized: indica que o acesso à API requer autenticação e a autenticação falhou ou não foi fornecida.

- [x] 403 Forbidden: indica que o acesso à API foi negado devido a restrições de permissão.

- [x] 404 Not Found: indica que o recurso solicitado não foi encontrado na API.
 
- [x] 405 Method Not Allowed: indica que o método HTTP utilizado na requisição não é suportado pelo endpoint.

- [x] 500 Internal Server Error: indica que ocorreu um erro interno no servidor da API.
