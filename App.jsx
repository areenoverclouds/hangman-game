import React from "react"
import Header from "./components/Header.jsx"
import Figure from "./components/Figure.jsx"
import Word from "./components/Word.jsx"
import WrongLetters from "./components/WrongLetters.jsx"
import Popup from "./components/Popup.jsx"
import Notification from "./components/Notification.jsx" 

const words = ['hello', 'dinner', 'sprite', 'cats', 'happy', 'love'];
let selectedWord = words[Math.floor(Math.random() * words.length)]
    
export default function App(){
    
    const [playable, setPlayable] = React.useState(true);
    const [correctLetters, setCorrectLetters] = React.useState([]);
    const [wrongLetters, setWrongLetters] = React.useState([]);
    const [showNotif, setShowNotif] = React.useState(false);
    
    function showNotification(setter) {
        setter(true);
        setTimeout(() => {
          setter(false);
        }, 2000);
    }
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
    
    React.useEffect(() => {
        const handleKeydown = event => {
            const { key, keyCode } = event;
            if(playable && keyCode >= 65 && keyCode <= 90) {
                const letter = key.toLowerCase();
                if(selectedWord.includes(letter)) {
                    if (!correctLetters.includes(letter)) {
                        setCorrectLetters(currentLetters => [...currentLetters, letter]);
                    } 
                    else {
                        showNotification(setShowNotif);
                    }
                } 
                else {
                    if (!wrongLetters.includes(letter)) {
                        setWrongLetters(currentLetters => [...currentLetters, letter]);
                    } 
                    else {
                        showNotification(setShowNotif);
                    }
                }
            }
        }
        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    }, [correctLetters, wrongLetters, playable]);
    
    function playAgain() {
        setPlayable(true);
        setCorrectLetters([]);
        setWrongLetters([]);
        const random = Math.floor(Math.random() * words.length);
        selectedWord = words[random];
    }
    
    return(
        <span>
            <Header />
            
            <div className="game-container">
                <Figure wrongLetters={wrongLetters} />
                <WrongLetters wrongLetters={wrongLetters} />
                <Word selectedWord={selectedWord} correctLetters={correctLetters} /> 
            </div>
  
            <Popup 
                correctLetters={correctLetters} 
                wrongLetters={wrongLetters} 
                selectedWord={selectedWord}       
                setPlayable={setPlayable} 
                playAgain={playAgain} 
            />
                
            <Notification showNotification={showNotif} />
            
        </span>
    )
}