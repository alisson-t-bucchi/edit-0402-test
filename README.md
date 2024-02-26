# Polls API

This is a simple API for managing polls.
Polls are simply a question with a list of options to vote for (only 1 option can be picked when voting).
Polls' information is public but only authenticated users can create polls and vote.

## Development

After cloning, remember to install dependencies with `npm install`.

Add your environment variables to `.env` file (see `.env.sample` for a example).

Start server with `npm run dev`.

There is a Postman collection available: `PollsAPI.postman_collection.json`.

O projeto final consiste em resolver uma série de tarefas num projeto de API já iniciado.

Antes de começarem a tentar resolver as tarefas, vejam todo o código para o ficarem a conhecer melhor. Depois, configurem tudo para executar o servidor e testarem a API (podem importar no vosso Postman a collection que deixei no repositório).

Para além de avaliar os vossos conhecimentos, o principal objetivo deste projeto é dar-vos mais um momento de aprendizagem e permitir-vos praticar. É da maior importância, para vocês, que limitem o uso de ferramentas IA ao máximo!

Para o que não entenderem ou não conseguirem resolver, estou cá eu para vos ajudar e encaminhar, as vezes que for necessário.

Lembrem-se de consultar o conteúdo teórico e prático nos repositórios das aulas: https://github.com/s1moe2/edit-be-0402/ e https://github.com/s1moe2/redit

Devem criar um fork do repositório: https://github.com/s1moe2/edit-be-04-02-test

Sugiro que, para cada tarefa, criem uma nova branch: `git branch -b task-N`, em que N é o id da tarefa. Deste modo, se ficarem bloqueados numa tarefa, podem saltar para outra sem reverter algum trabalho que já tenham feito (basta fazer checkout da branch `main`e criar nova "task branch").

Partilhem comigo o url do vosso fork quando o tiverem pronto.

## Introdução

Estamos a trabalhar no backend de uma app de polls. Uma poll é constituída por uma pergunta e uma lista de opções. Um voto é feito escolhendo uma das opções da poll.

Tarefas:
#1
Implementar um endpoint que permita obter os detalhes de uma poll (por ID).

#2
Implementar um endpoint que permita criar uma poll. Uma poll é constituida por uma pergunta e uma lista de opções.

#3
Implementar um endpoint que permita votar numa opção de uma poll.

#4
Existe um mecanismo de autenticação implementado. Este funciona com um login tradicional, que gera um token JWT. Com esta tarefa pretendemos limitar o acesso nas rotas "/polls" que não são GET, apenas a users autenticados.

#5
O nosso servidor não está a fazer log dos requests que recebe. Instala um middleware de loggging e adiciona-o na configuração do express.

#6
(depende da tarefa #1)
Altera a criação de polls para aceitar também uma data limite, após a qual não é possível votar.

#7
Pretendemos que a conta de um user fique bloqueada caso este falhe o login 3 vezes seguidas.
