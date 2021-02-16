import React, {createContext, useState} from 'react'
import { useHistory } from 'react-router-dom'

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const Context = createContext()


function ButtonProvider({ children }) {
	let [index, setIndex] = useState(0)
		
	async function startListen() {
		await SpeechRecognition.startListening({continuous: true})
		console.log('Tudo pronto para ouvir!')
	}

  	function setMovement(movement) {

	    if(movement == 'esquerda') {
	       if(index === 0) {
	          setIndex(document.getElementsByClassName("interact_btn").length - 1)
	       } else {
	         setIndex(index - 1)
	       }
	    } else if(movement == 'direita') {
	        if(index === document.getElementsByClassName("interact_btn").length - 1) {
	          setIndex(0)
	       } else {
	         setIndex(index + 1)
	       }
	    } else if (movement == 'clica') {
	        document.getElementsByClassName('interact_btn')[index].click()
	        document.getElementsByClassName('interact_btn')[index].focus()
	    }
  	}

	return (
		<Context.Provider value={{ index, setMovement, setIndex, startListen}} >
			{children}
		</Context.Provider>
	)
}

export { Context, ButtonProvider }