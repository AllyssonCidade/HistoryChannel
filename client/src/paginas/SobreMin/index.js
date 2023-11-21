import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import PostModelo from "../../componentes/PostModelo";
import styles from './SobreMim.module.css';
import axios from "axios";
import { useEffect, useState } from "react";
import sobre_mim_foto from "../../assets/imagens/sobre_mim_foto.jpg"


export default function SobreMim() {

    const [perfil, setPerfil] = useState([{}]);

    useEffect(() => {
        axios.get("http://localhost:3001/getPerfil")
            .then((response) => {
                setPerfil(response.data)
            });
    }, []);

    return (
        <>
            <PostModelo
                titulo="Sobre mim"
                fotoCapa={perfil[0].contraCapa}
            >
                <img src={sobre_mim_foto}
                    alt="Foto sobr mim"
                    className={styles.fotoSobreMim}
                />
                <ReactMarkdown className={styles.paragrafo}>
                    {perfil[0].conteudo}
                </ReactMarkdown>
            </PostModelo >
        </>
    )
}
