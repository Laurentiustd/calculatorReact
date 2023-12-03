
interface IProps{
    class : string,
    handler : Function,
    value : string,
    symbol : string
}


function Operator(props: IProps){
    return (
        <button onClick={()=>props.handler(props.value)} className={props.class}>{props.symbol}</button>
    );
}

export default Operator;