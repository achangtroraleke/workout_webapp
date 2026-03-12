
import { MdOutlineAddCircleOutline } from "react-icons/md"

export default function Homepage(){

    return(
    <div className=" bg-gray-50">
      
      <div className="max-w-4xl mx-auto bg-white  p-4">
      <div className="grid grid-cols-4 gap-4 w-full md:w-auto">
        {/* Card 1 */}
          <div className="col-span-1 w-full max-w-md rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-blue-600 ">
              <h2 className="font-bold bg p-3 text-white">New session?</h2>
            </div>
            <button className="bg-white text-black-600 py-4  rounded-xl font-bold hover:bg-gray-100 transition p-2 flex items-center gap-2 cursor-pointer">
            Start a Workout 
            <MdOutlineAddCircleOutline size={23}/>
            </button>
          </div>
        {/* Card 2 */}
        
      </div>
      </div>
    </div>

    )
}