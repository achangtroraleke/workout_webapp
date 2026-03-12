import React,{useState, useContext, useEffect} from "react";
import { useParams } from "react-router";
import AppContext from "../context/AppContext";
import { CiCirclePlus, CiDumbbell,CiTrash  } from "react-icons/ci";
import Loading from "./Loading";
export default function WorkoutLogForm(props){
    const {isLoading, saveExercises, fetchExercises, fetchAllExercises} = useContext(AppContext)
    const [availableExercises, setAvailableExercises] = useState([]);
    let {workoutID} = props
    const [payload, setPayload] = useState(
        {
        exercise:'',
        sets:'',
        reps:'',
        weight:'',
        workout:workoutID
        }
    )

    

    const handleFetch = async ()=>{
        let res = await fetchAllExercises()
        console.log(res)
        setAvailableExercises(res)
    }

    const handleSubmit = async () =>{
        console.log(payload)
        let res = await saveExercises(payload)
    
        return res.data
    }
    const handleChange = (event) => {
        const values = {...payload};
      
        values[event.target.name] = event.target.value;
        setPayload(values);
    };




    useEffect(()=>{
        handleFetch()
    
      },[])

    if(isLoading){
        return(
            <Loading/>
        )
      }

    return(
  <div className=" bg-gray-50 p-4 md:p-8">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="bg-indigo-600 p-6 rounded-t-xl">
              <h2 className="text-white text-2xl font-bold flex items-center gap-2">
                <CiDumbbell size={28} /> Log Your Workout
              </h2>
            </div>

            <form className="p-6 space-y-6">
              {/* Workout Title Input */}
              <div>
               
              </div>

              {/* Exercise Rows */}
              <div className="space-y-4">
              
             
                  <div  className="flex flex-col md:flex-row gap-4 items-end bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 relative">
                    
                    {/* Exercise Dropdown - POPULATED FROM BACKEND */}
                    <div className="flex-1 w-full">
                      <label className="block text-xs font-bold text-indigo-400 uppercase mb-1">Select Exercise</label>
                      <select
                        name="exercise"
                        value={availableExercises.exercise_id}
                        onChange={(e) => handleChange(e)}
                        className="w-full p-2.5 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="">-- Choose --</option>
                        {availableExercises.map((ex) => (
                          <option key={ex.id} value={ex.id}>
                            {ex.name} ({ex.muscle_group})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase text-center">Sets</label>
                        <input name="sets" type="number" className="w-full p-2 border rounded text-center font-bold" onChange={e => handleChange(e)} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase text-center">Reps</label>
                        <input name="reps" type="number" className="w-full p-2 border rounded text-center font-bold" onChange={e => handleChange(e)} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase text-center">Weight</label>
                        <input name="weight" type="number" className="w-full p-2 border rounded text-center font-bold" onChange={e => handleChange(e)} />
                      </div>
                    </div>

              
              
                  </div>
                
              </div>
{/* 
              <button
                type="button"
                onClick={addExerciseRow}
                className="w-full py-3 border-2 border-dashed border-indigo-300 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition flex justify-center items-center gap-2"
              >
                <CiCirclePlus size={20} /> Add Another Exercise
              </button> */}
                                    <button 
                      type="button" 
                      onClick={handleSubmit}
                      className="text-gray-400 hover:text-red-500 transition p-2"
                    >SAVE</button>
            </form>
          </div>
        </div>
    )
}