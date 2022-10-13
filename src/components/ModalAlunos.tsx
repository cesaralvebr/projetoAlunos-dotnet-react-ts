import React, { MouseEventHandler } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";


interface ModalAlunos{
    modalIncluir : boolean
    handleChange: (event: React.FormEvent<HTMLInputElement>) => void
    abrirFecharModalIncluir:() => void
    valoresInputAluno: (nome:string, email:string, idade:number,event: React.FormEvent<HTMLInputElement>)=> any
}

export default function ModalAlunos({modalIncluir, handleChange, abrirFecharModalIncluir, valoresInputAluno}:ModalAlunos) {  
    return(
        <Modal isOpen={modalIncluir}>
        <ModalHeader>
            Incluir Alunos
        </ModalHeader>

        <ModalBody>
            <div className="form-group">
                <label> Nome: </label>
                <br />
                <input type="text" className="form-control" name="nome" onChange={handleChange} />
                <br />
                <label> Email: </label>
                <br />
                <input type="text" className="form-control" name="email" onChange={handleChange}/>
                <br />
                <label> Idade: </label>
                <br />
                <input type="text" className="form-control" name="idade" onChange={handleChange}/>
                <br />
            </div>
        </ModalBody>

        <ModalFooter>
            <button className="btn btn-primary" onClick={()=>handleChange}>Incluir</button>{" "}
            <button className="btn btn-danger" onClick={abrirFecharModalIncluir}>Cancelar</button>
        </ModalFooter>
    </Modal>
    )
}