import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

export default function NewPokemon(){
    const [form, setForm]=useState({
        species: '',
        type: '',
        nickname: '',
        level: 0,
        shiny: false
    })
    const [errorMessage, setErrorMessage]=useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        try{
            e.preventDefault()
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/pokemon`, form)
            navigate('/pokemon')
        }catch(err){
            console.warn(err)
            if(err.response){
                setErrorMessage(err.response.data.message)
            }
        }
    }

    return(
        <div>
            <h1>New Pokemon</h1>

            <p>{errorMessage}</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="species">species: </label>
                    <input 
                        type='text' 
                        id='species' 
                        value={form.species} 
                        placeholder='Pokemon species...'
                        onChange={e => setForm({...form, species: e.target.value})} 
                    />
                </div>
                <div>
                    <label htmlFor="type">Type: </label>
                    <input 
                        type='text' 
                        id='type' 
                        value={form.type} 
                        placeholder='Pokemon type...'
                        onChange={e => setForm({...form, type: e.target.value})} 
                    />
                </div>
                <div>
                    <label htmlFor="nickname">Nickname: </label>
                    <input 
                        type='text' 
                        id='nickname' 
                        value={form.nickname} 
                        placeholder='enter nickname...'
                        onChange={e => setForm({...form, nickname: e.target.value})} 
                    />
                </div>
                <div>
                    <label htmlFor="level">Level: </label>
                    <input 
                        type='number' 
                        id='level' 
                        value={form.level} 
                        onChange={e => setForm({...form, level: e.target.value})} 
                    />
                </div>
                <button type='submit' >Add Pokemon</button>
            </form>
            <Link to={`/pokemon`} >Go Back</Link>
        </div>
    )
}