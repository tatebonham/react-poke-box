import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export default function Pokemon (){
    const [pokemon, setPokemon]=useState([])
    const [errorMessage, setErrorMessage]=useState('')

    useEffect(()=>{
        const getPokemon = async ()=>{
            try{
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/pokemon`)
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

    const pokemonLinks = pokemon.map(poke=>{
        return(
            <div key={`pokemon${poke._id}`} >
                <Link to={`/pokemon/${poke._id}`} >{poke.species}</Link>
            </div>
        )
    })

    return(
        <div>
            <h1>All Pokemon</h1>
            <Link to='/pokemon/new' >New Pokemon</Link>
            <p>{errorMessage}</p>

            <div>
                {pokemonLinks}
            </div>
        </div>
    )
}