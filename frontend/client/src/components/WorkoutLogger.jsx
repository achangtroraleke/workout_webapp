import React, { use, useContext, useEffect, useState } from 'react';
import { CiCirclePlus, CiDumbbell,CiTrash  } from "react-icons/ci";
import AppContext from '../context/AppContext';
import Loading from './Loading';
import { useParams } from 'react-router';
import DynamicForm from './DynamicForm';

export default function WorkoutLogger(props){



  const {deleteExercise} = useContext(AppContext)
  let {workoutID} = props
 
  const [workout, setWorkout] = useState([])
  const [workoutLog, setWorkoutLog] = useState([])
  const {isLoading, fetchExercises} = useContext(AppContext)





 

 

  const handleDelete = async (id) =>{
    try{ 
      
     

      setWorkoutLog(workoutLog.filter((w) => w.id !== id))

      
    }catch(err){
      console.error("Problem with deleting entry:", err)
    }
  }


  const fetchWorkout = async () =>{
      let res = await fetchExercises(workoutID)
      
      setWorkout(res)
      setWorkoutLog(res.logs)
  }
  
  
    useEffect(()=>{
        fetchWorkout()
    },[])


    if(isLoading || workoutLog === null){
        return(
            <Loading/>
        )
    }
  return (
  <div className=" bg-gray-50 p-4 md:p-8">
                  <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100">


                <div className="bg-indigo-600 p-6 rounded-t-xl">
                      <h2 className="text-white text-2xl font-bold flex items-center gap-2">
                        Your Workouts
                      </h2>
                </div>
                <div className="p-6 space-y-6">
    
                    <div className="space-y-4">
                    
                     
                    {workoutLog.length < 1?
                    <>No Workouts Logged</>:
                      workoutLog.map((w)=>{
                        return(
                            <div key={w.id} className="flex flex-col md:flex-row gap-4 items-end bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 relative">
                                    <div className="grid grid-cols-4  w-full md:w-auto">
                                        <div>
                                                                  <label className="block text-[10px] font-bold text-gray-400 uppercase text-center">Exercise</label>
                                            <h3 className="w-full p-2  rounded text-center font-bold">{w.exercise_name}</h3>
                                        </div>
                                        <div>
                                                                  <label className="block text-[10px] font-bold text-gray-400 uppercase text-center">REPS</label>
                                            <h3 className="w-full p-2  rounded text-center font-bold">{w.reps}</h3>
                                        </div>
                                        <div>
                                                                  <label className="block text-[10px] font-bold text-gray-400 uppercase text-center">SETS</label>
                                            <h3 className="w-full p-2  rounded text-center font-bold">{w.sets}</h3>
                                        </div>
                                        <div className='text-center'>
                                              <label className="block text-[10px] font-bold text-gray-400 uppercase text-center">DELETE</label>
                                        <button 
                                          type="button" 
                                          onClick={()=>handleDelete(w.id)}
                                          className="text-gray-400 hover:text-red-500 transition p-2  "
                                        >
                                          <CiTrash size={23} />
                                        </button>
                                        </div>
                                        
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
      );
};
