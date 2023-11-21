import { useParams } from "react-router-dom"
import PostModelo from "../../componentes/PostModelo";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import "./Post.css"
import NaoEncontrada from "../../paginas/NaoEncontrada";
import PaginaPadrao from "../../componentes/PaginaPadrao";
import PostCard from "../../componentes/PostCard";
import styles from './Post.module.css'
import { useEffect, useState } from "react";
import axios from "axios";


export default function Post() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/getPosts")
            .then((response) => {
                setPosts(response.data)
            });
    }, []);

    const parametros = useParams();

    const post = posts.find((post) => {
        return post.id === Number(parametros.id);
    })
    if (!post) {
        return <NaoEncontrada />
    }

    const PostsRecomendados = posts
        .filter((post) => post.id !== Number(parametros.id))
        .sort((a, b) => b.id - a.id)
        .slice(0, 4)

    return (
        <PaginaPadrao>
            <PostModelo
                fotoCapa={post.capa}
                titulo={post.titulo}
            >
                <div className="post-markdown-container">
                    <ReactMarkdown>
                        {post.conteudo}
                    </ReactMarkdown>
                </div>
                <h2 className={styles.tituloOutrosPosts}>
                    Outros posts que você pode gostar:
                </h2>
                <ul className={styles.postsRecomendados}>
                    {PostsRecomendados.map((post) => (
                        <li key={post.id}>
                            <PostCard to={`/posts/${post.id}`} post={post} textoBotao={"Ler"} />
                        </li>
                    ))}

                </ul>
            </PostModelo>
        </PaginaPadrao>

    )
}
