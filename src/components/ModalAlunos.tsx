import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Aluno from "../models/Aluno";
import { TipoModal } from "../models/enums/tipos";
import Entrada from "./Entrada";

interface ModalAlunos {
    statusModal: boolean
    tipoModal:TipoModal | undefined
    abrirFecharModal: () => void
    alunoSelecionado: Aluno
    adicionarNovoAluno: (aluno: Aluno) => void
    editarAlunoSelecionado: (aluno: Aluno) => void
    excluirAlunoSelecionado: (id: number) => void
}

export default function ModalAlunos(
    {
        statusModal,
        tipoModal,
        abrirFecharModal,
        adicionarNovoAluno,
        alunoSelecionado,
        editarAlunoSelecionado,
        excluirAlunoSelecionado
    }: ModalAlunos) {

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
        <>
            {tipoModal === TipoModal.Excluir ?
                <Modal isOpen={statusModal}>
                    <ModalHeader>
                        Confirmar a exclusão deste(a) aluno(a) selecionado(a):
                        <strong> {alunoSelecionado.nome}</strong>
                    </ModalHeader>
                    <ModalFooter>                       
                        <button className="btn btn-success" onClick={() => excluirAlunoSelecionado(alunoSelecionado.id)}>Sim</button> {" "}
                        <button className="btn btn-danger" onClick={abrirFecharModal}>Não</button>
                    </ModalFooter>
                </Modal>
                :
                <Modal isOpen={statusModal} >
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
                        <button className="btn btn-danger" onClick={abrirFecharModal}>Cancelar</button>
                    </ModalFooter>
                </Modal>
            }
        </>
    )
}