import axios from "axios";
import { config } from "process";
import React, { useState, useEffect } from "react";
import { useConsumerApi } from "../hooks/useConsumerApi";
import Aluno from "../models/Aluno";
import Tabela from "./Tabela";


export default function CadastroAluno() {

    const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno>(Aluno.vazio())
    const {data:todosAlunos, isFetching} = useConsumerApi<Aluno[]>("https://localhost:44318/api/Alunos")


    return (
        <div>
            {isFetching?? <p>Carregando...</p>}
            <Tabela alunos={todosAlunos} setAlunoSelecionado={setAlunoSelecionado} alunoSelecionado={alunoSelecionado} />

        </div>
    )
}