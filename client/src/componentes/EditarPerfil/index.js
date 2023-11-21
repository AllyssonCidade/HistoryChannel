import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from 'axios';


export default function FormDialog(props) {

    const [editValues, setEditValues] = useState({
        id: props.id,
        resumo: props.resumo,
        conteudo: props.conteudo,
        capa: props.capa,
        contraCapa: props.contraCapa,
        bannerDestaque: props.bannerDestaque
    });

    const handleEditPerfil = () => {
        Axios.put("http://localhost:3001/editPerfil", {
            resumo: editValues.resumo,
            conteudo: editValues.conteudo,
            capa: editValues.capa,
            contraCapa: editValues.contraCapa,
            bannerDestaque: editValues.bannerDestaque
        });
        handleClose();
    };

    const handleChangeValues = (event) => {
        const { id, value } = event.target;
        setEditValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    const handleClose = () => {
        props.setOpen(false);
    };

    return (
        <>
        <Dialog open={props.open} onClose={handleClose}>
            <DialogTitle>Editar Perfil</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="resumo"
                    label="Resumo"
                    defaultValue={props.resumo}
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleChangeValues}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="conteudo"
                    label="Conteúdo"
                    defaultValue={props.conteudo}
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleChangeValues}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="capa"
                    label="Capa"
                    defaultValue={props.capa}
                    type="image"
                    fullWidth
                    variant="standard"
                    onChange={handleChangeValues}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="contraCapa"
                    label="Contra Capa"
                    defaultValue={props.contraCapa}
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleChangeValues}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="bannerDestaque"
                    label="Banner de Destaque"
                    defaultValue={props.bannerDestaque}
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleChangeValues}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={handleEditPerfil}>Salvar</Button>
            </DialogActions>
        </Dialog>
                    </>
    );
}
