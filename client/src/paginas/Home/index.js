import styles from './Home.module.css';
import PostCard from '../../componentes/PostCard';
import Formulario from '../../componentes/Fomulario';
import axios from 'axios';
import { useEffect, useState } from 'react';
import FormDialog from '../../componentes/EditarPerfil';
import React from 'react';
import { AiFillEdit } from "react-icons/ai";

export default function Home() {
    const [open, setOpen] = useState(false);
    const [posts, setPosts] = useState([]);

    const handleClickPerfil = () => {
        alert("EDIÇÃO DE PERFIL DESATIVA POR TEMPO INDETERMINADO, POR FAVOR ENTRE EM CONTATO COM O DESENVOLVEDOR")
        // setOpen(true);
    };
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:3001/getPosts');
                setPosts(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    const token = localStorage.getItem("token");
    if (token) {
        console.log("Usuário autenticado!");
    } else {
        console.log("Usuário não autenticado.");
    }

    return (
        <>
            <FormDialog
                open={open}
                setOpen={setOpen} />
            <div className={styles.editarPerfil}>
                <AiFillEdit className={styles.editar} onClick={handleClickPerfil} />
                <p className={styles.editar_titulo}>Editar Perfil</p>
            </div>
            <Formulario tituloForm={"Adicionar Post"}>
                Adicionar Post
            </Formulario>
            <ul className={styles.posts}>
                {posts.map((post) => (
                    <li key={post.id}>
                        <PostCard to={`/editPost/${post.id}`} post={post} textoBotao={"editar"} variant="outlined" showDeleteButton={true} />
                    </li>
                ))}
            </ul>

        </>
    )
}


