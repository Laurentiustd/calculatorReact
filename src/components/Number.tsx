
interface IProps{
    value : number;
    handler : Function,
}

function Number(props:IProps){
    return(
        <button onClick={()=>props.handler(props.value.toString())}>{props.value}</button>
    );
}

export default Number;