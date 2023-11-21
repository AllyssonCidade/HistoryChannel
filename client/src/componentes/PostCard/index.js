import styles from './Post.module.css';
import BotaoPrincipal from '../../componentes/BotaoPrincipal';
import { AiFillCloseCircle } from "react-icons/ai";
import { useState } from 'react';
import Axios from 'axios';


export default function PostCard({ post, textoBotao, showDeleteButton, to}) {
    const [deletarPost, setDeletarPost] = useState(false);

    const handleDeletePost = () => {
        Axios.delete(`http://localhost:3001/delete/${post.id}`)
            .then(() => {
                setDeletarPost(true);
            })
            .catch((error) => {
                console.error("Erro ao excluir o post:", error);
            });
    }

    if (deletarPost) {
        return <h4>Excluido</h4>
    }

    return (
        <div>
            <div className={styles.post}>
                {showDeleteButton && <AiFillCloseCircle className={styles.deletar} onClick={handleDeletePost} />}
                <img
                    className={styles.capa}
                    src={post.capa}
                    alt='imagem de capa do post'
                />
                <h2 className={styles.titulo}>{post.titulo}</h2>
                <BotaoPrincipal to={to}>{textoBotao}</BotaoPrincipal>
            </div>
        </div>
    );
}
