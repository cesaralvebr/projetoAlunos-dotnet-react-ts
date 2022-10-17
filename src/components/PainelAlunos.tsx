import React, { useState, useEffect } from "react";
import { useConsumerApi } from "../hooks/useConsumerApi";
import Aluno from "../models/Aluno";
import Tabela from "./Tabela";


export default function PainelAlunos() {

    const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno>(Aluno.vazio())
    const { data: todosAlunos, isFetching, adicionarAluno, obterAlunos, editarAluno} = useConsumerApi<Aluno[]>("api/Alunos")

    useEffect(() => {
        obterAlunos();  
    }, [alunoSelecionado])

    return (
        <div>
            {isFetching ?? <p>Carregando...</p>}
            <Tabela alunos={todosAlunos}
                setAlunoSelecionado={setAlunoSelecionado}
                alunoSelecionado={alunoSelecionado}
                adicionarAluno={adicionarAluno}
                editarAluno={editarAluno}
                atualizarTabelaAluno={obterAlunos}
               />

        </div>
    )
}