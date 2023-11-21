import Axios from 'axios';
import styles from './PostModelo.module.css'
import { useEffect, useState } from 'react';

export default function PostModelo({ children, fotoCapa, titulo }) {
    const [perfil, setPerfil] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/getPerfil")
            .then((response) => {
                setPerfil(response.data)
            });
    }, []);
    
    return (
        <article className={styles.postModeloContainer}>
            <div
                className={styles.fotoCapa}
                style={{ backgroundImage: `url(${fotoCapa})` }}>
            </div>
            <h2 className={styles.titulo}>
                {titulo}
            </h2>
            <div className={styles.postConteudoContainer}>
                {children}
            </div>
        </article>
    )
}
