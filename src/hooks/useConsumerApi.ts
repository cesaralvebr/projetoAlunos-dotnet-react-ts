import axios from "axios";
import { useEffect, useState } from "react";
import Aluno from "../models/Aluno";

export function useConsumerApi<T = unknown>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [isFetching, setIsFetching] = useState<boolean>(true);

    const api = axios.create({
        baseURL: "https://localhost:44318"
    })
    const obterAlunos = async () => {
        await api.get(url)
            .then(response => {
                setData(response.data)
            }).catch(error => {
                console.log(error)
            })
            .finally(() => {
                setIsFetching(false);
            })
    }

    const adicionarAluno = async (aluno: Aluno) => {

        await api({
            method: 'post',
            url: url,
            withCredentials: false,
            data: aluno,
            headers: {
                'content-Type': 'application/json'
            }
        }).then(response => {
            console.log({ "adição/sucesso": JSON.stringify(response.data) });

        })
            .catch(error => {
                console.log(error)
            })
    }

    const editarAluno = async (aluno: Aluno) => {
        await api({
            method: 'put',
            url: url+"/"+aluno.id,
            withCredentials: false,
            data: aluno,
            headers: {
                'content-Type': 'application/json'
            }
        }).then(response => {
            console.log({ "edição/sucesso": JSON.stringify(response.data) });

        })
            .catch(error => {
                console.log(error)
            })
    }

    return { data, isFetching, adicionarAluno, editarAluno,obterAlunos }
}