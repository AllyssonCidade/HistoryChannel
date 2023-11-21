const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "vip12345",
  database: "dbApiPosts",
});

app.use(express.json());
app.use(cors());


app.post("/signUp", (req, res) => {
  const { email, password } = req.body;

  const salts = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salts);

  const query = "INSERT INTO usuarios (email, password) VALUES (?, ?)";
  db.query(query, [email, hashPass], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro no servidor" });
    }
    res.status(200).json({ success: true });
  });
});

app.post("/signIn", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Erro no servidor" });
    } else {
      if (result.length > 0) {
        const hashedPassword = result[0].password;
        bcrypt.compare(password, hashedPassword, (bcryptErr, bcryptResult) => {
          if (bcryptErr) {
            console.log(bcryptErr);
            res.status(500).json({ error: "Erro no servidor" });
          } else {
            if (bcryptResult) {
              const token = jwt.sign({ email }, 'suaChaveSecreta', { expiresIn: '1h' });
              res.json({ isValid: true, token });
            } else {
              res.json({ isValid: false });
            }
          }
        });
      } else {
        res.json({ isValid: false });
      }
    }
  });
});


app.post("/register", (req, res) => {
  const { titulo } = req.body;
  const { conteudo } = req.body;
  const { capa } = req.body;

  let mysql = "INSERT INTO posts ( titulo, conteudo, capa) VALUES (?, ?, ?)";

  db.query(mysql, [titulo, conteudo, capa], (err, result) => {
    res.send(result);
  });
});

app.get("/search", (req, res) => {
  const { titulo } = req.body;
  const { conteudo } = req.body;
  const { capa } = req.body;

  let mysql =
    "SELECT * from posts WHERE titulo = ? AND conteudo = ? AND capa = ?";
  db.query(mysql, [titulo, conteudo, capa], (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

app.put("/edit/:id", (req, res) => {
  const { id } = req.params;
  const { titulo } = req.body;
  const { conteudo } = req.body;
  const { capa } = req.body;
  let mysql = "UPDATE posts SET titulo = ?, conteudo = ?, capa = ? WHERE id = ?";
  db.query(mysql, [titulo, conteudo, capa, id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/editPerfil", (req, res) => {
  const { resumo } = req.body;
  const { conteudo } = req.body;
  const { capa } = req.body;
  const { contraCapa } = req.body;
  const { bannerDestaque } = req.body;
  let mysql = "UPDATE perfil SET resumo = ?, conteudo = ?, capa = ?, contraCapa = ?, bannerDestaque = ? WHERE id = 1";
  db.query(mysql, [resumo, conteudo, capa, contraCapa, bannerDestaque], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let mysql = "DELETE FROM posts WHERE id = ?";
  db.query(mysql, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});


app.get("/getUser", (req, res) => {
  let mysql = "SELECT * FROM usuarios";
  db.query(mysql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/getPosts", (req, res) => {
  let mysql = "SELECT * FROM posts";
  db.query(mysql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/getPerfil", (req, res) => {
  let mysql = "SELECT * FROM perfil";
  db.query(mysql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});