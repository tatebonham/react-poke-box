import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, Link, useParams } from "react-router-dom"

export default function EditTrainer(){
    const [form, setForm]=useState({
        name:''
    })
    const [errorMessage, setErrorMessage]=useState('')
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        const getPokemon = async ()=>{
            try{
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/trainer/${id}`)
                setForm(response.data)
            }catch(err){
                console.warn(err)
                if(err.response){
                    setErrorMessage(err.response.data.message)
                }
            }
        }
        getPokemon()
    }, [])

    const handleSubmit = async (e)=>{
        try{
            e.preventDefault()
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/trainer/${id}`, form)
            navigate(`/trainers/${id}`)
        }catch(err){
            console.warn(err)
            if(err.response){
                setErrorMessage(err.response.data.message)
            }
        }
    }

    return(
        <div>
            <h1>Update Trainer</h1>

            <p>{errorMessage}</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input 
                        type='text' 
                        id='name' 
                        value={form.name} 
                        placeholder='enter name...'
                        onChange={e => setForm({...form, name: e.target.value})} 
                    />
                </div>
                <button type='submit' >Update Trainer</button>
            </form>
            <Link to={`/trainers/${id}`} >Go Back</Link>
        </div>
    )
}