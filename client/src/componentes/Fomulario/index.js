import { useEffect, useState } from 'react';
import styles from './Formulario.module.css';
import axios from 'axios';

export default function Formulario({ children, tituloForm, values, handleClickForm }) {
    const [editaPost, setEditaPost] = useState(false);

    useEffect(() => {
        setEditaPost(handleClickForm);
    }, [handleClickForm]);


    const [formValues, setFormValues] = useState(values || {
        titulo: '',
        conteudo: '',
        capa: '',
    });

    useEffect(() => {
        if (values) {
            setFormValues(values);
        }
    }, [values]);

    const handleUpdatePost = async (event) => {
        event.preventDefault();
        setEditaPost(false)
        try {

            const response = await axios.put(`http://localhost:3001/edit/${formValues.id}`, {
                titulo: formValues.titulo,
                conteudo: formValues.conteudo,
                capa: formValues.capa
            });

            setFormValues({
                titulo: '',
                conteudo: '',
                capa: '',
            });

            console.log("Post atualizado:", response.data);
        } catch (error) {
            console.error("Erro ao atualizar o post:", error);
        }
    };

    const handleChangeValues = (value) => {
        setFormValues(prevValue => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }))
    };

    const handleClickButton = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/register", {
                titulo: formValues.titulo,
                conteudo: formValues.conteudo,
                capa: formValues.capa
            });
            setFormValues({
                titulo: '',
                conteudo: '',
                capa: '',
            });

            alert("Post enviado com sucesso");
        } catch (error) {
            console.error("Erro ao enviar o post:", error);
        }
    };



    return (
        <div className={styles.formulaio__container}>
            <h2 className={styles.formulaio__titulo}>{tituloForm}</h2>
            <form className={styles.formulario}>
                <label>Titulo</label>
                <input name='titulo'
                    onChange={handleChangeValues}
                    className={styles.formulaio__input}
                    type="text"
                    placeholder="Digite o Titulo"
                    value={formValues.titulo}
                />

                <label>Conteudo</label>
                <textarea name='conteudo'
                    onChange={handleChangeValues}
                    className={styles.formulaio__input}
                    type='text'
                    placeholder="Digite o conteudo do Post"
                    rows={10} spellCheck='true'
                    autoComplete='true'
                    value={formValues.conteudo}
                />

                <label>Capa</label>
                <input name='capa'
                    onChange={handleChangeValues}
                    className={styles.formulaio__input}
                    type="text"
                    placeholder="Digite a URL da imagem"
                    value={formValues.capa}
                />

                <button
                    className={styles.botao__formulaio}
                    to={""}
                    onClick={editaPost ? handleUpdatePost : handleClickButton}>
                    {children}
                </button>
            </form>
        </div>
    )
}
