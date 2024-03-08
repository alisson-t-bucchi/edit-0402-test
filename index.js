require("dotenv").config();
const express = require("express");
const db = require("./db/mongodb");
const auth = require("./auth/routes");
const polls = require("./polls/routes");

//#5 O nosso servidor não está a fazer log dos requests que recebe. Instala um middleware de loggging e adiciona-o na configuração do express.
const pino = require("pino-http"); 

const app = express();
app.use(pino()); 
app.use(express.json());
app.use("/auth", auth);
app.use("/polls", polls);

async function start() {
  await db.init();

  app.listen(process.env.PORT, () => {
    console.log("server is running on port " + process.env.PORT);
  });
}

start()
  .then(() => console.log("start complete"))
  .catch((err) => console.log(err));
