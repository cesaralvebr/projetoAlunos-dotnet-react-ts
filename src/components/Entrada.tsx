interface PropsEntrada{
tipo?: "text" | "email" | "number";
texto:string;
valor:any;
setValor:any
}
export default function Entrada({texto,tipo, valor, setValor}:PropsEntrada){
    return(
        <div className="form-group">
            <label> {texto} </label>
                <br />
                <input type={tipo?? 'text'} 
                value={valor} 
                className="form-control" 
                name={texto} 
                onChange={e => setValor(e.target.value)} />
                <br />
                
        </div>
    )
}