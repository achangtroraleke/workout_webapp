
import { axiosAuth } from "../utils/axiosAuth";
import { createContext, useState } from "react";

const AppContext = createContext();

export default AppContext;

export const AppProvider = ({children}) =>{
    const [isLoading, setLoading] = useState(false)
    
    const fetchAllExercises = async () =>{
       
        try{ 
            const res = await axiosAuth().get('/exercises/')
            console.log(res.data)
            return res.data
        } catch(err){
            console.error('Failed to fetch user:', err);
            throw(err)
        }finally{
            setLoading(false)
        }
    }

    const fetchTodaysWorkouts = async ()=>{
        setLoading(true)
        try{
            const res = await axiosAuth().get('/workouts/')
           
            return res.data
        }catch(err){
            console.error("Failed to fetch data:", err)
        }finally{
            setLoading(false)
        }
    }

    const createNewWorkout = async (formData) =>{
        setLoading(true)
        try{
            const res = await axiosAuth().post('/workouts/', formData)
            return res.data
        }catch(err){
            console.error("Workout creation failed:", err)
        }finally{
            setLoading(false)
        }
    }

    const saveExercises = async (formData) =>{
        setLoading(true)
        
        console.log(JSON.stringify(formData))
        let formattedData = JSON.stringify(formData)
        try{
            const res = await axiosAuth().post('/log/', formattedData)
            return res.data
        }catch(err){
            console.error('Failed to save exercise:', err);
            throw(err)
        }finally{
            setLoading(false)
        }
    }

    const deleteExercise = async (id) =>{
 
       
        try{
            const res = await axiosAuth().delete(`/log/${id}/`)
            return res.data
        }catch(err){
            console.error('Failed to save exercise:', err);
            throw(err)
        }finally{
           
        }
    }
    
    const fetchExercises = async (id) =>{
        setLoading(true)
        try{
            const res = await axiosAuth().get(`/workouts/${id}/`)
            
            return res.data
        }catch(err){
            console.error('ERROR:' ,err)
            throw err
        }finally{
            setLoading(false)
        }
    }

    let contextData = {
        fetchAllExercises:fetchAllExercises,
        fetchTodaysWorkouts:fetchTodaysWorkouts,
        createNewWorkout:createNewWorkout,
        saveExercises:saveExercises,
        deleteExercise:deleteExercise,
        fetchExercises:fetchExercises,
        isLoading:isLoading,
    }


    return(
        <AppContext.Provider value={contextData}>
            {children}
        </AppContext.Provider>
    )
}