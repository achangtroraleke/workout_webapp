import React, {useContext, useEffect, useState} from "react"
import AppContext from "../context/AppContext"
import Loading from "./Loading"
import Card from "./Card"
import DynamicForm from "./DynamicForm"
import { Link } from "react-router"


export default function WorkoutDisplay(){
    let {fetchTodaysWorkouts, isLoading, createNewWorkout } = useContext(AppContext)

    let [workouts, setWorkouts] = useState([])
    const formatDate = (time)=>{
        return new Date(time).toDateString(time)
    }
    const formatTime = (time) =>{
        return new Date(time).toLocaleTimeString();
    }
    const handleFetch = async () =>{
        try{
            let res = await fetchTodaysWorkouts()
            console.log(res)
            setWorkouts(res)
        }catch(err){
            console.error(err)
        }
    }
    const handleSubmit = async (payload) =>{
        let res = createNewWorkout(payload)
        return res
    }
    useEffect(()=>{
        handleFetch()
    },[])

      const workoutFields = [
    {
      name: "title",
      label: "Workout Name",
      type: "text",
      value: "",
    }
]

    if(isLoading){
        return(
            <Loading/>
        )
      }
    return(
         <div className="min-h-screen bg-gray-50 p-4 md:p-8">
                  <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100">


                <div className="bg-indigo-600 p-6 rounded-t-xl">
                      <h2 className="text-white text-2xl font-bold flex items-center gap-2">
                        Your Workouts
                      </h2>
                </div>
                <div className="p-6 space-y-6">
                    <div>

                        <DynamicForm fields={workoutFields} buttonName={"Create Workout"} submitFunc={handleSubmit}/>
                    </div>
                    <div className="space-y-4">
                    {workouts.map(( w)=>{
                        return(
                            <div className="flex flex-col md:flex-row gap-4 items-end bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 relative">
                                    <div className="grid grid-cols-4  w-full  justify-between">
                                               <div>
                                            <h3 className="w-full p-2  rounded text-center font-bold">{formatDate(w.created_at)}</h3>
                                        </div>
                                       
                                        <div>
                                            
                                            <h3 className="w-full p-2  rounded text-center font-bold">{w.title}</h3>
                                        </div>
                                     
                                        <div>
                                            <h3 className="w-full p-2  rounded text-center font-bold">{formatTime(w.created_at)}</h3>
                                        </div>
                                          <Link 
                                    to={`/workout/${w.id}`}
                                    type="button" 
                                    className="text-gray-400 hover:text-blue-500 transition p-2 rounded-lg text-center"
                                >
                                EDIT
                                </Link>
                                    
                                    <div>
                                </div>
                            </div>
                                
                          
                            </div>
                        )
                    })}
                    </div>
                </div>
  

         </div>
                           </div>
    )
}