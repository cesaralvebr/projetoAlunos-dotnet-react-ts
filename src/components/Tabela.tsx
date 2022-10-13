import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import Aluno from "../models/Aluno";
import ModalAlunos from "./ModalAlunos";

interface TabelaProps {
    alunos: Aluno[] | null,
    setAlunoSelecionado:Dispatch<SetStateAction<Aluno>>,
    alunoSelecionado: Aluno    
}
export default function Tabela({ alunos, setAlunoSelecionado, alunoSelecionado }: TabelaProps) {
    const cor = { "white": "#fff" };

const [modalIncluir, setModalIncluir] = useState<boolean>(false);

function recuperarValoresInputAluno(){
    console.log("rodou");    
}


const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    //setAlunoSelecionado();
}

    const abrirFecharModalIncluir = () => {
        setModalIncluir(!modalIncluir)
    }

    function renderizarCabecalho() {
        return (
            <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Idade</th>
                <th>Operação</th>
            </tr>)
    }

    function renderizarCorpo() {
        return alunos?.map((aluno) => {
            return (
                <tr key={aluno.id}>
                    <td>{aluno.id}</td>
                    <td>{aluno.nome}</td>
                    <td>{aluno.email}</td>
                    <td>{aluno.idade}</td>
                    <td style={{ padding: '10px' }}>
                        <button className="btn btn-primary" style={{ margin: '5px' }}>Editar</button>
                        <button className="btn btn-danger">Excluir</button>
                    </td>
                </tr>
            )
        })

    }
    return (
        <div style={{ backgroundColor: cor.white, borderRadius: '10px 10px' }}>
            <h3>Cadastro Aluno</h3>
            <header>
                <button className="btn btn-success" onClick={abrirFecharModalIncluir}><FaUserPlus /> Incluir novo aluno </button>
                <ModalAlunos
                 handleChange={handleChange}
                 modalIncluir={modalIncluir} 
                 abrirFecharModalIncluir={() =>abrirFecharModalIncluir()}
                 valoresInputAluno={recuperarValoresInputAluno}
                 />
            </header>
            <table className="table table-bordered">
                <thead>
                    {renderizarCabecalho()}
                </thead>
                <tbody>
                    {renderizarCorpo()}
                </tbody>
            </table>

        </div>
    )
}