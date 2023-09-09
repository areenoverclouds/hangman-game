import React from "react"

export default function WrongLetters(props){
    
    return(
        <div className="wrong-letters-container">
            <div>
                {props.wrongLetters.length > 0 && <p>Wrong</p>}
                {props.wrongLetters
                  .map((letter, i) => <span key={i}>{letter}</span>)
                  .reduce((prev, curr) => prev === null ? [curr] : [prev, ', ', curr], null)
                }
            </div>
      </div>
    )
}