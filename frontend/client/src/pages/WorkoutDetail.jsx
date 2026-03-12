import React, { useContext, useEffect, useState } from 'react';
import WorkoutLogger from "../components/WorkoutLogger"
import WorkoutLogForm from "../components/WorkoutLogForm"
import { useParams } from "react-router"
import AppContext from "../context/AppContext"
import Loading from '../components/Loading';

export default function WorkoutDetailPage(){
    let {id} = useParams()
    const [loggedExercises, setLoggedExercises] = useState(null)
    const {isLoading, fetchExercises} = useContext(AppContext)



    return(
        <div className="">
            <WorkoutLogForm workoutID={id}/>
            <WorkoutLogger workoutID={id}/>
        </div>
    )
}