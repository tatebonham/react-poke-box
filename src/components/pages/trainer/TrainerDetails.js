import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

export default function TrainerDetails (){
    const [trainer, setTrainer]=useState({})
    const [errorMessage, setErrorMessage]=useState('')
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        const getTrainer = async ()=>{
            try{
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/trainer/${id}`)
                setTrainer(response.data)
            }catch(err){
                console.warn(err)
                if(err.response){
                    setErrorMessage(err.response.data.message)
                }
            }
        }
        getTrainer()
    }, [])

    const deleteBounty = async ()=>{
        try{
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/trainer/${id}`)
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
            <h1>Trainer Details</h1>
            <Link to='/trainers/new' >New Trainer</Link>

            <p>{errorMessage}</p>

            <div>
                <Link to={`/trainers/${id}/edit`} >
                    <button>Edit</button>
                </Link>
                <button onClick={deleteBounty} >Delete</button>
            </div>

            <div>
                <h2>{trainer.name}</h2>
            </div>
            <Link to={`/trainers`} >Go Back</Link>
        </div>
    )
}