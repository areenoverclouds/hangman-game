import React from "react"

export default function Popup(props){
    let finalMessage = '';
    let finalMessageRevealWord = '';
    let playable = true;
    
    function checkWin(correct, wrong, word) {
        let status = 'win';
        word.split('').forEach(letter => {
            if(!correct.includes(letter)){
                status = '';
            }
        });
        if(wrong.length === 6) status = 'lose';
        return status
    }

    if( checkWin(props.correctLetters, props.wrongLetters, props.selectedWord) === 'win' ) {
        finalMessage = 'Congratulations! You won, huh. You must be really good at this.';
        playable = false;
    } 
    else if( checkWin(props.correctLetters, props.wrongLetters, props.selectedWord) === 'lose' ) {
        finalMessage = 'You lost. Tough word or tough day?';
        finalMessageRevealWord = `...the word was: ${props.selectedWord}`;
        playable = false;
    }

    React.useEffect(() => {
        props.setPlayable(playable);
    });
    
    return(
        <div className="popup-container" style={finalMessage !== '' ? {display:'flex'} : {}}>
            <div className="popup">
                <h2>{finalMessage}</h2>
                <h3>{finalMessageRevealWord}</h3>
                <button onClick={props.playAgain}>Play Again</button>
            </div>
        </div>
    )
}