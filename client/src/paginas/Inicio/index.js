import styles from './Inicio.module.css';
import PostCard from '../../componentes/PostCard';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function Inicio() {

    const [posts, setPosts] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:3001/getPosts")
            .then((response) => {
                setPosts(response.data);
            });
    }, []);

    return (

        <ul className={styles.posts}>
            {typeof posts !== "undefined" && posts.map((post) => (
                <li key={post.id}>
                    <PostCard to={`/posts/${post.id}`} post={post} textoBotao={"ler"} />
                </li>
            ))}

        </ul>
    )
}




