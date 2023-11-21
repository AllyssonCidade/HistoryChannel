import { useEffect, useState } from "react";
import Formulario from "../../componentes/Fomulario";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function EditarPost() {
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState();
    const location = useLocation();
    const [editaPost, setEditaPost] = useState(true);


    useEffect(() => {
        axios.get("http://localhost:3001/getPosts")
            .then((response) => {
                setPosts(response.data);
            });
    }, []);

    useEffect(() => {
        if (location.pathname.startsWith("/editPost/")) {
            const id = Number(location.pathname.split("/")[2]);
            setPost(posts.find(post => post.id === id));
           
        }

    }, [location.pathname, posts]);

    return (
        <>
            <Formulario tituloForm={"Editar Post"} values={post} handleClickForm={editaPost}>
                Salvar
            </Formulario>
        </>
    )
}
