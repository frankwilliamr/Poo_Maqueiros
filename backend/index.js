import express from "express";
import { pool } from './db.js'
import cors from "cors";
import { PRIVATE_KEY, tokenValited } from "./auth.js";
import jsonwebtoken from "jsonwebtoken";

const app = express();
app.use(cors({
  origin: '*'
}));

app.use(express.urlencoded());
app.use(express.json());

app.post("/login", (req, res) => {
  let session = pool

  let user = {
    email: req.body["email"],
    password: req.body["password"]
  }


  try {
    session.getConnection()
      .then(conn => {
        conn.query(`SELECT * FROM Maqueiro WHERE Maqueiro.Email = '${user.email}';`)
          .then((rows) => {
            conn.end();
            const correctPassword = rows[0].Email === user.email && rows[0].Senha === user.password;

            if (!correctPassword)
              return res.status(401).send('Senha ou email incorretos');

            const token = jsonwebtoken.sign({ user: JSON.stringify(user) }, PRIVATE_KEY, { expiresIn: '60m' });

            res.status(200).json({ token, Nome: rows[0].Nome, Cargo: rows[0].Cargo, id: rows[0].ID_maqueiro });
          })
      })
  }
  catch (err) {
    console.log(err);
    res.send("error!!!");
  }
});

app.use('*', tokenValited);

app.get("/", (req, res) => {
  let session = pool

  try {
    session.getConnection()
      .then(conn => {
        conn.query("SELECT * FROM Maqueiro;")
          .then((rows) => {
            console.log(rows);
            res.send(rows);
            conn.end();
          })
      })
  }
  catch (err) {
    console.log(err);
    res.send("error!!!");
  }
});

app.get("/historico", (req, res) => { //Rota para pegar pacientes
  let session = pool

  try {
    session.getConnection()
      .then(conn => {
        conn.query("SELECT Transporte.*, COALESCE(Incidente.ID_incidente, 'Sem incidentes') AS incidentID, COALESCE(Incidente.Descricao_incidente, 'Sem incidente') AS Descricao_incidente, Maqueiro.Nome AS maqueiroNome, Paciente.Nome AS pacienteNome, Paciente.Localização_Atual AS pacienteLocal FROM Transporte JOIN Paciente ON Paciente.ID_paciente = Transporte.ID_paciente JOIN Maqueiro ON Maqueiro.ID_maqueiro = Transporte.ID_maqueiro LEFT JOIN Incidente ON Incidente.ID_transporte = Transporte.ID_solicitacao WHERE Transporte.Status_Transporte = 'Concluido';") //Query para pegar pacientes
          .then((rows) => {
            res.send(rows); //Envio do resultado
            conn.end();
          })
      })
  }
  catch (err) {
    console.log(err);
    res.send("error!!!");
  }
});

app.get("/solicitacoes", (req, res) => { //Rota para pegar pacientes
  let session = pool

  try {
    session.getConnection()
      .then(conn => {
        conn.query("SELECT Transporte.*, Paciente.Nome FROM Transporte, Paciente WHERE Paciente.ID_paciente = Transporte.ID_paciente AND NOT Status_Transporte = 'Concluido';") //Query para pegar pacientes
          .then((rows) => {
            res.send(rows); //Envio do resultado
            conn.end();
          })
      })
  }
  catch (err) {
    console.log(err);
    res.send("error!!!");
  }
});


app.get("/pacientes", (req, res) => { //Rota para pegar pacientes
  let session = pool

  try {
    session.getConnection()
      .then(conn => {
        conn.query("SELECT * FROM Paciente;") //Query para pegar pacientes
          .then((rows) => {
            res.send(rows); //Envio do resultado
            conn.end();
          })
      })
  }
  catch (err) {
    console.log(err);
    res.send("error!!!");
  }
});

app.post("/paciente", (req, res) => { //Rota para pegar pacientes
  let session = pool

  try {
    session.getConnection()
      .then(conn => {
        let paciente = {
          nome: req.body.nome,
          prontuario: parseInt(req.body.prontuario),
          nascimento: req.body.data_nascimento.toString(),
          leito: req.body.leito
        }

        conn.query(`INSERT INTO Paciente(Nome, Idade, Numero_Prontuario, Localização_Atual) VALUES ('${paciente.nome}', '${paciente.nascimento}', ${paciente.prontuario}, '${paciente.leito}');`) //Query para criar pacientes
          .then((result) => {
            console.log(result);
            res.send(result.toString()); //Envio do resultado
            conn.end();
          })
      })
  }
  catch (err) {
    console.log(err);
    res.send("error!!!");
  }
});

app.post("/usuarios", (req, res) => { //Rota para pegar pacientes
  let session = pool

  try {
    session.getConnection()
      .then(conn => {
        console.log(req.body);
        let maqueiro = {
          nome: req.body.nome,
          funcao: req.body.funcao,
          email: req.body.email,
          senha: req.body.senha
        }

        conn.query(`INSERT INTO Maqueiro(Nome, Email, Senha, Cargo) VALUES ('${maqueiro.nome}', '${maqueiro.email}', '${maqueiro.senha}', '${maqueiro.funcao}');`) //Query para criar pacientes
          .then((result) => {
            res.send(result.toString()); //Envio do resultado
            conn.end();
          })
      })
  }
  catch (err) {
    console.log(err);
    res.send("error!!!");
  }
});

app.post("/solicitar", (req, res) => { //Rota para pegar pacientes
  let session = pool

  try {
    session.getConnection()
      .then(conn => {
        console.log(req.body);
        let transporte = {
          origem: req.body.origem,
          paciente: parseInt(req.body.paciente),
          destino: req.body.destino,
          prioridade: req.body.prioridade,
          obs: req.body.obs,
          maqueiro: parseInt(req.body.maqueiro)
        }

        conn.query(`INSERT INTO Transporte (ID_paciente, Local_Destino, Local_Origem, Prioridade, Observacoes, Status_Transporte, ID_maqueiro) VALUES (${transporte.paciente}, '${transporte.destino}','${transporte.origem}', '${transporte.prioridade}', '${transporte.obs}', '${'Aguardando'}', ${transporte.maqueiro});`) //Query para criar pacientes
          .then((result) => {
            res.send(result.toString()); //Envio do resultado
            conn.end();
          })
      })
  }
  catch (err) {
    console.log(err);
    res.send("error!!!");
  }
});

app.post("/aceitar", (req, res) => { //Rota para pegar pacientes
  let session = pool

  try {
    session.getConnection()
      .then(conn => {
        conn.query(`UPDATE Transporte SET Status_Transporte = 'Em andamento' WHERE Transporte.ID_solicitacao = ${req.body.id}`) //Query para pegar pacientes
          .then((result) => {
            console.log(result)
            res.send(result.toString()); //Envio do resultado
            conn.end();
          })
      })
  }
  catch (err) {
    console.log(err);
    res.send("error!!!");
  }
});

app.post("/concluir", (req, res) => { //Rota para pegar pacientes
  let session = pool

  try {
    session.getConnection()
      .then(conn => {
        conn.query(`UPDATE Transporte INNER JOIN Paciente ON Transporte.ID_paciente = Paciente.ID_paciente SET Paciente.Localização_Atual = Transporte.Local_Origem, Transporte.Status_Transporte = 'Concluido' WHERE Transporte.ID_solicitacao = ${req.body.id};`) //Query para pegar pacientes
          .then((result) => {
            console.log(result)
            res.send(result.toString()); //Envio do resultado
            conn.end();
          })
          
      })
  }
  catch (err) {
    console.log(err);
    res.send("error!!!");
  }
});

app.post("/incidente", (req, res) => { //Rota para pegar pacientes
  let session = pool

  let incidente = {
    id: parseInt(req.body.id),
    horaincidente: req.body.horaincidente,
    data: req.body.data,
    incidente: req.body.incidente,
  }
  try {
    session.getConnection()
      .then(conn => {
        conn.query(`INSERT INTO Incidente (Hora_Incidente, Data_Incidente, Descricao_incidente, ID_transporte) VALUES ('${incidente.horaincidente}', '${incidente.data}','${incidente.incidente}', ${incidente.id});`) //Query para pegar pacientes
          .then((result) => {
            console.log(result)
            res.send(result.toString()); //Envio do resultado
            conn.end();
          })
      })
  }
  catch (err) {
    console.log(err);
    res.send("error!!!");
  }
});

app.post("/deletar", (req, res) => { //Rota para pegar pacientes
  let session = pool

  try {
    session.getConnection()
      .then(conn => {
        conn.query(`DELETE FROM Transporte WHERE Transporte.ID_solicitacao = ${req.body.id};`) //Query para pegar pacientes
          .then((result) => {
            console.log(result)
            res.send(result.toString()); //Envio do resultado
            conn.end();
          })
          
      })
  }
  catch (err) {
    console.log(err);
    res.send("error!!!");
  }
});
app.listen(8080);