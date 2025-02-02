import { useState } from "react";
import Card from "../Card/Card";
import { ToastContainer, toast } from 'react-toastify';
import isWinner from "../../helper/checkWinner";

import './Grid.css'
import 'react-toastify/dist/ReactToastify.css';

function Grid({ numberOfCard }) {
    const [turn, setTurn] = useState(true); // false -> X, true => 0
    const [board, setBoard] = useState(Array(numberOfCard).fill("")); // ["", "", "", "", "", ""]
    const [winner, setWinner] = useState(null);
    
    function play(index) {
        console.log("move played", index);
        if(turn == true) {
            board[index] = "O";
        } else {
            board[index] = "X";
        }
        const win = isWinner(board, turn ? "O" : "X");
        if(win) {
            setWinner(win);
            toast.success(`Congratulation ${win} win the game!!`)
        }
        setBoard([...board]);
        setTurn(!turn);
    }

    function reset() {
        setBoard(Array(numberOfCard).fill(""));
        setWinner(null);
        setTurn(true);
    }


    return (
        <div className="grid-wrapper">
            {winner && (
                <>
                    <h1 className="turn-highlight"> Winner is {winner} </h1>
                    <button className="reset" onClick={reset}>Reset game</button>
                    <ToastContainer position="top-center" />
                </>
            )}
            <h1 className="turn-highlight">Current Turn: {(turn) ? 'O' : 'X'} </h1>
            <div className="grid">
                {board.map((value, idx) => {
                    return <Card gameEnd={winner ? true : false} onPlay={play} player={value} key={idx} index={idx} />
                })}
            </div>
        </div>
    )
}

export default Grid;