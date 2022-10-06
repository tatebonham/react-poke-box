import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

export default function PokemonDetails (){
    const [pokemon, setPokemon]=useState({})
    const [errorMessage, setErrorMessage]=useState('')
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        const getPokemon = async ()=>{
            try{
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/pokemon/${id}`)
                setPokemon(response.data)
            }catch(err){
                console.warn(err)
                if(err.response){
                    setErrorMessage(err.response.data.message)
                }
            }
        }
        getPokemon()
    }, [])

    const deleteBounty = async ()=>{
        try{
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/pokemon/${id}`)
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
            <h1>Pokemon Details</h1>
            <Link to='/pokemon/new' >New Pokemon</Link>
            <p>{errorMessage}</p>

            <div>
                <Link to={`/pokemon/${id}/edit`} >
                    <button>Edit</button>
                </Link>
                <button onClick={deleteBounty} >Delete</button>
            </div>

            <div>
                <h2>Species: {pokemon.species}</h2>
                <p>Type: {pokemon.type}</p>
                <p>Nickname: {pokemon.nickname}</p>
                <p>Level: {pokemon.level}</p>
                <p>Shiny Status: {pokemon.shiny ? 'Not Shiny' : 'Is Shiny'}</p>
            </div>
            <Link to={`/pokemon`} >Go Back</Link>
            
        </div>
    )
}