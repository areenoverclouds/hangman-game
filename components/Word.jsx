import React from "react"

export default function Word(props){
    
    return(
        <div className="word">
            {props.selectedWord.split('').map((letter, i) => {
              return (
                <span className="letter" key={i}>
                  {props.correctLetters.includes(letter) ? letter : ''}
                </span>
              )
            })}
       </div>
    )
}