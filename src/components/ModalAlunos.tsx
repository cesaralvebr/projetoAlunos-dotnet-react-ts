import React, { MouseEventHandler, useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Aluno from "../models/Aluno";
import Entrada from "./Entrada";

interface ModalAlunos {
    modalIncluir: boolean
    abrirFecharModalIncluir: () => void
    alunoSelecionado: Aluno
    adicionarNovoAluno: (aluno: Aluno) => void
    editarAlunoSelecionado: (aluno: Aluno) => void
}

export default function ModalAlunos(
    {
        modalIncluir,
        abrirFecharModalIncluir,
        adicionarNovoAluno,
        alunoSelecionado,
        editarAlunoSelecionado
    } : ModalAlunos) {

    const id = alunoSelecionado.id;
    useEffect(() => {
        setNome(alunoSelecionado.nome ?? "")
        setEmail(alunoSelecionado.email ?? "")
        setIdade(alunoSelecionado.idade ?? 0)
    }, [alunoSelecionado.email, alunoSelecionado.idade, alunoSelecionado.nome])

    const [nome, setNome] = useState<string>("");
    const [idade, setIdade] = useState<number>(0);
    const [email, setEmail] = useState<string>("");

    return (
        <Modal isOpen={modalIncluir} >
            <ModalHeader>
                Incluir Alunos
            </ModalHeader>

            <ModalBody>
                {id ?
                    <Entrada texto="Id" tipo="text" valor={id} somenteLeitura={true} /> : false
                }
                <Entrada texto="Nome" tipo="text" valor={nome} setValor={setNome} />
                <Entrada texto="Idade" tipo="text" valor={idade} setValor={setIdade} />
                <Entrada texto="E-mail" tipo="text" valor={email} setValor={setEmail} />
            </ModalBody>

            <ModalFooter>
                {alunoSelecionado.id ?
                    <button className="btn btn-primary" onClick={() => editarAlunoSelecionado(new Aluno(nome, email, idade, id))}> Editar</button> :
                    <button className="btn btn-primary" onClick={() => adicionarNovoAluno(new Aluno(nome, email, idade))}> Incluir</button>} {" "}
                <button className="btn btn-danger" onClick={abrirFecharModalIncluir}>Cancelar</button>
            </ModalFooter>
        </Modal>
    )
}