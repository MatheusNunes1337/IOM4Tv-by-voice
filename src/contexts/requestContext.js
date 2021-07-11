import React, {createContext, useState} from 'react'
import { useHistory } from 'react-router-dom'

import api from '../services/api'

const RequestContext = createContext()


function RequestProvider({ children }) {
	let [funcao, setFuncao] = useState('')
	let [videoIndex, setVideoIndex] = useState(0)

	async function makeRequest(e) {
		const funcao = e.currentTarget.value
  		let TVkeyCode = e.currentTarget.id
  		if(TVkeyCode !== 13) {
  			setFuncao(funcao)
  		}
  		const data = {keyCode: TVkeyCode}
  		//const response = await api.post('/', data)
  		//console.log(response.data)
	}
  	
	return (
		<RequestContext.Provider value={{ funcao, makeRequest }}>
			{children}
		</RequestContext.Provider>
	)
}

export { RequestContext, RequestProvider }