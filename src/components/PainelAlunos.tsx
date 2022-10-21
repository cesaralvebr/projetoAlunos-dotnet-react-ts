import { useState } from "react";
import { useConsumerApi } from "../hooks/useConsumerApi";
import Aluno from "../models/Aluno";
import Tabela from "./Tabela";


export default function PainelAlunos() {

    const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno>(Aluno.vazio())
    const { data: todosAlunos, isFetching, adicionarAluno, editarAluno, excluirAluno, obterAlunos } = useConsumerApi<Aluno[]>("api/Alunos")
   
    return (
        <div>
            {isFetching ?? <p>Carregando...</p>}
            <Tabela alunos={todosAlunos}
                setAlunoSelecionado={setAlunoSelecionado}
                alunoSelecionado={alunoSelecionado}
                adicionarAluno={adicionarAluno}
                editarAluno={editarAluno}
                atualizarTabelaAluno={obterAlunos}
                excluirAluno={excluirAluno}
            />

        </div>
    )
}