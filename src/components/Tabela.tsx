import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import Aluno from "../models/Aluno";
import { TipoModal } from "../models/enums/tipos";
import ModalAlunos from "./ModalAlunos";

interface TabelaProps {
    alunos: Aluno[] | null,
    setAlunoSelecionado: Dispatch<SetStateAction<Aluno>>,
    alunoSelecionado: Aluno,
    adicionarAluno: (aluno: Aluno) => void;
    editarAluno: (aluno: Aluno) => void;
    atualizarTabelaAluno: () => void
    excluirAluno: (id:number) => void
}

export default function Tabela(
    {
        alunos, 
        setAlunoSelecionado,
        alunoSelecionado, 
        adicionarAluno,
        editarAluno,
         atualizarTabelaAluno,
        excluirAluno
    }: TabelaProps) {

    const cor = { "white": "#fff" };

    const [statusModal, setStatusModal] = useState<boolean>(false);
    const [tipoModal, setTipoModal] = useState<TipoModal|undefined>();

  

    const atualizarTabelaAlunoCallback = useCallback(() => {
        atualizarTabelaAluno();      

    }, [atualizarTabelaAluno]);

    useEffect(() => {
        atualizarTabelaAlunoCallback()
    }, [atualizarTabelaAlunoCallback])

    function adicionarNovoAluno(aluno: Aluno) {
        adicionarAluno(aluno)
        abrirFecharModal(TipoModal.Adicionar);
        atualizarTabelaAlunoCallback();
    }

    function editarAlunoSelecionado(aluno: Aluno) {
        editarAluno(aluno);
        abrirFecharModal(TipoModal.Editar);
        atualizarTabelaAlunoCallback();
    }
  

    const selecionarAluno = (aluno: Aluno, opcao: TipoModal) => {
        setAlunoSelecionado(aluno);
        abrirFecharModal(opcao);
    };

    function excluirAlunoSelecionado(id:number){
        excluirAluno(id);   
        abrirFecharModal(TipoModal.Excluir);    
    }
    
    const abrirFecharModal = (tipoModal?:TipoModal, podeLimpar?: boolean) => {
        setStatusModal(!statusModal)
        setTipoModal(tipoModal)
        if (podeLimpar) setAlunoSelecionado(Aluno.vazio());
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
                        <button className="btn btn-primary" style={{ margin: '5px' }} onClick={() => selecionarAluno(aluno, TipoModal.Editar)}>Editar</button>
                        <button className="btn btn-danger" onClick={()=>selecionarAluno(aluno, TipoModal.Excluir)}>Excluir</button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <div style={{ backgroundColor: cor.white, borderRadius: '10px 10px' }}>
            <h3>Cadastro Aluno</h3>
            <header>
                <button className="btn btn-success" onClick={() => abrirFecharModal(TipoModal.Adicionar,true)}><FaUserPlus /> Incluir novo aluno </button>
                <ModalAlunos
                    statusModal={statusModal}
                    tipoModal={tipoModal}
                    abrirFecharModal={() => abrirFecharModal()}
                    adicionarNovoAluno={adicionarNovoAluno}
                    alunoSelecionado={alunoSelecionado}
                    editarAlunoSelecionado={editarAlunoSelecionado}     
                    excluirAlunoSelecionado={excluirAlunoSelecionado}             
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