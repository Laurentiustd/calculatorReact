import '../assets/index.css';
import {useState} from 'react';
import { Link } from "react-router-dom";
import Number from './Number';
import Operator from './Operator';

interface INumber{
    id : number,
    value : number
}
let id = 1;

function Calculator() {
const [display, setDisplay] = useState("0");
const [history, setHistory] = useState<INumber[]>([]);
const [count, setCount] = useState("");

    function numberHandler(number: string){
        // VALIDASI PANJANG MAX 15 ANGKA
        if(display.length <= 15){
            // VALIDASI KALAU DISPLAYNYA 0 ATAU OPERATOR MATEMATIKA UNTUK REPLACE DISPLAY
            if(display === "0" || display.includes('/') || display.includes('*') || display.includes('-') || display.includes('+')){
                setDisplay(number);
                setCount(count+number);
            }else if(display === 'Err'){ 
                // VALIDASI KALAU DISPLAY ERR BUAT REPLACE DISPLAY
                setDisplay(number)
                setCount(number)
            }else{
                // VALIDASI KALAU YANG DIPENCET OPERATOR MATEMATIKA BUAT REPLACE DISPLAY
                if(number === '/' || number === '*' || number === '-' || number === '+'){
                    setDisplay(number);
                    setCount(count+number);
                }else {
                    // TAMBAHIN ANGKA KE DISPLAY
                    setDisplay(display+number);
                    setCount(count+number);
                }
            }
        }
    }
    function resetNumber(){
        setCount("");
        setDisplay("0");
    }
    function deleteNumber(){
        // VALIDASI KALAU DISPLAYNYA TIDAK KOSONG DAN BUKAN 0
        if(display !== null && display !== '0'){
            setDisplay(display.slice(0,-1));
            setCount(count.slice(0, -1));
        }
    }
    function calculateNumber(){
        // HITUNG BERAPA OPERATOR YANG DIINPUT
        var operatorCounter = 0;
        for (let index = 0; index < count.length; index++) {
            if(count.charAt(index).includes('/')){
                operatorCounter++;
            }else if(count.charAt(index).includes('*')){
                operatorCounter++;
            }else if(count.charAt(index).includes('+')){
                operatorCounter++;
            }else if(count.charAt(index).includes('-')){
                operatorCounter++;
            }
        }
        // VALIDASI KALAU SEQUENCE HARUS SAMA DENGAN 3
        if(operatorCounter == 1){
            // VALIDASI UNTUK HASIL BERUPA NUMBER
            try {
                var temp:number = parseInt(eval(count))
                if(!isNaN(temp)){
                    setDisplay(eval(count).toString());
                    setCount(eval(count).toString());
                    const obj:INumber = {id:id++, value: eval(count)};
                    setHistory([...history, obj]);
                }else{
                    setDisplay("Err");
                    setCount(""); 
                }
            } catch (error) {
                setDisplay("Err");
                setCount("");
            }
        }else{
            setDisplay("Err");
            setCount("");
        }
        
    }
  return (
    <div className="container-calculator">
    <div className="result-container">
        <div className="history">
            {history.map((e) =>{
                return <p key={e.id}>{e.value}</p>
            })}
        </div>
        <h1>{display}</h1>
    </div>
    <div className="buttons-container">
        <div className="top-buttons">
            <button onClick={resetNumber}>C</button>
            <button onClick={deleteNumber}>DEL</button>
            <Link to="/supportPage" className="operator support-btn">?</Link>
            {/* <button className="operator" onClick={()=>numberHandler('/')}>/</button>
            <button onClick={()=>numberHandler('1')}>1</button>
            <button onClick={()=>numberHandler('2')}>2</button>
            <button onClick={()=>numberHandler('3')}>3</button>
            <button className="operator" onClick={()=>numberHandler('*')}>X</button>
            <button onClick={()=>numberHandler('4')}>4</button>
            <button onClick={()=>numberHandler('5')}>5</button>
            <button onClick={()=>numberHandler('6')}>6</button>
            <button className="operator" onClick={()=>numberHandler('-')}>-</button>
            <button onClick={()=>numberHandler('7')}>7</button>
            <button onClick={()=>numberHandler('8')}>8</button>
            <button onClick={()=>numberHandler('9')}>9</button>
            <button className="operator" onClick={()=>numberHandler('+')}>+</button> */}
            <Operator value='/' class='operator' handler={numberHandler} symbol='/'/>
            <Number value={1} handler={numberHandler} />
            <Number value={2} handler={numberHandler} />
            <Number value={3} handler={numberHandler} />
            <Operator value='*' class='operator' handler={numberHandler} symbol='X'/>
            <Number value={4} handler={numberHandler} />
            <Number value={5} handler={numberHandler} />
            <Number value={6} handler={numberHandler} />
            <Operator value='-' class='operator' handler={numberHandler} symbol='-'/>
            <Number value={7} handler={numberHandler} />
            <Number value={8} handler={numberHandler} />
            <Number value={9} handler={numberHandler} />
            <Operator value='+' class='operator' handler={numberHandler} symbol='+'/>
        </div>
        <div className="bottom-buttons">
            <button className="bottom" onClick={()=>numberHandler('0')}>0</button>
            <button className="operator bottom" onClick={()=>calculateNumber()}>=</button>
        </div> 
    </div>
</div>
  );
}

export default Calculator;
