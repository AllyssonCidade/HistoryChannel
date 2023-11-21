import React, { useState } from "react";
import { useAuth } from "../../componentes/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isValid, login } = useAuth();
  const navigate = useNavigate();

  async function handleSignIn() {
    try {
      const response = await axios.post("http://localhost:3001/signIn", {
        email: email,
        password: password,
      });

      if (response.data.isValid) {
        login(response.data.token); 
        console.log("Login efetuado com sucesso");
        navigate("/home");
      } else {
        console.log("Credenciais inválidas");
      }
    } catch (error) {
      console.error("Erro ao efetuar o login:", error);
    }
  }
  
//HANDLESIGNUP DESATIVADO ATÉ QUE SEJA CRIADO OPÇOES DE USUÁRIOS NA APLICAÇÃO.

function handleSignUp(){
  alert("Novos usuários estão desabilitados por tempo indeterminado")
    // axios.post("http://localhost:3001/signUp", {
    //     email: email,
    //     password: password
    // }).then((res)=>{
    //     console.log(res)
    // }).catch((err)=>{
    //     console.log(err)
    // })
}
    return (
        <main className={styles.login}>
            <h2 className={styles.login__titulo}>Login</h2>
            <form className={styles.login__form}>
                <label>Email</label>
                <input className={styles.login__input}
                    type="email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Senha</label>
                <input className={styles.login__input}
                    placeholder="Digite sua senha"
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className={styles.div_login}>
                <Link className={styles.botao__login} onClick={handleSignIn}>
                    Entrar
                </Link>
                <Link className={styles.botao__login} onClick={handleSignUp}>
                    Cadastrar
                </Link>
                </div>
            </form>
        </main>
    )
}
