import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export default function Trainers (){
    const [trainers, setTrainers]=useState([])
    const [errorMessage, setErrorMessage]=useState('')

    useEffect(()=>{
        const getTrainers = async ()=>{
            try{
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/trainer`)
                setTrainers(response.data)
            }catch(err){
                console.warn(err)
                if(err.response){
                    setErrorMessage(err.response.data.message)
                }
            }
        }
        getTrainers()
    }, [])

    const trainerLinks = trainers.map(trainer=>{
        return(
            <div key={`trainer${trainer._id}`} >
                <Link to={`/trainers/${trainer._id}`} >{trainer.name}</Link>
            </div>
        )
    })

    return(
        <div>
            <h1>All Trainers</h1>
            <Link to='/trainers/new' >New Trainer</Link>
            <p>{errorMessage}</p>

            <div>
                {trainerLinks}
            </div>
        </div>
    )
}