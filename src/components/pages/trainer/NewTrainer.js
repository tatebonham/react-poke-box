import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

export default function NewTrainer(){
    const [form, setForm]=useState({
        name: ''
    })
    const [errorMessage, setErrorMessage]=useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        try{
            e.preventDefault()
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/trainer`, form)
            navigate('/trainers')
        }catch(err){
            console.warn(err)
            if(err.response){
                setErrorMessage(err.response.data.message)
            }
        }
    }

    return(
        <div>
            <h1>New Trainer</h1>

            <p>{errorMessage}</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input 
                        type='text' 
                        id='name' 
                        value={form.name} 
                        placeholder='trainer name...'
                        onChange={e => setForm({...form, name: e.target.value})} 
                    />
                </div>
                <button type='submit' >Add Trainer</button>
            </form>
            <Link to={`/trainers`} >Go Back</Link>
        </div>
    )
}