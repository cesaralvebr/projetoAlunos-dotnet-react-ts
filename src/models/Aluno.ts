export default class Aluno {
    Id: number
    Nome: string
    Email: string
    Idade: number

    constructor(nome: string, email: string, idade: number,id: number = 0) {
        this.Nome = nome
        this.Idade = idade
        this.Email = email
        this.Id = id
    }

    static vazio() {
        return new Aluno("","",0)
    }
    get id() {
        return this.Id
    }

    get nome() {
        return this.Nome
    }

    get idade() {
        return this.Idade
    }
    get email() {
        return this.Email;
    }
}