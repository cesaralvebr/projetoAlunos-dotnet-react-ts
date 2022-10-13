import axios from "axios";
import { useEffect, useState } from "react";
import Aluno from "../models/Aluno";

export function useConsumerApi<T= unknown>(url:string){   
    const [data, setData] = useState<T | null>(null);
    const [isFetching, setIsFetching] = useState<boolean>(true);

    const obterAlunos = async () => {
        await axios.get(url)
            .then(response => {
                setData(response.data)
            }).catch(error => {
                console.log(error)
            })
            .finally(()=>{
                setIsFetching(false);
            })
    }

    const adicionarAluno = async () => {
        const novoAluno = new Aluno("alunoSelecionado.nome", "alunoSelecionado.Email", 0, "0");
        await axios.post(url, novoAluno)
            .then(response => {
                setData(response.data)
            }).catch(error => {
                console.log(error)
            })
    }

    const adicionarAluno2 = async () => {
        const novoAluno = new Aluno("Milena", "Milena@gmail.com", 20);
        await axios({
            method:'post',
            url:url,
            withCredentials:false,
            data:novoAluno,
            headers:{
                'Content-Type': 'text/plain'
            }
        }).then(response => {
            setData(response.data)
        })
    }
    useEffect(() => {
        obterAlunos();   
  
    }, [])

    return{data, isFetching}
}