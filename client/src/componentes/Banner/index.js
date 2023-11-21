import styles from './Banner.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import minha_foto from "../../assets/imagens/minha_foto.png"
import circulo_colorido from "../../assets/imagens/circulo_colorido.png"


export default function Banner() {
    const [perfil, setPerfil] = useState([{}]);

    useEffect(() => {
        axios.get("http://localhost:3001/getPerfil")
            .then((response) => {
                setPerfil(response.data)
            });
    }, []);

    return (
        <div className={styles.banner}>
            <div className={styles.apresentacao}>
                <p className={styles.paragrafo}>
                    {perfil[0].resumo}
                </p>
            </div>
            <div className={styles.imagens}>
                <img className={styles.contraCapa}
                    src={circulo_colorido}
                    aria-hidden={true}
                    alt='contra-capa'
                />
                <img className={styles.minhaFoto}
                    src={minha_foto}
                    alt='minha foto de perfil e apresentão'
                />
            </div>
        </div>
    )
}
