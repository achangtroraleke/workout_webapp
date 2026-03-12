import React from "react";

import {BiLoaderAlt} from 'react-icons/bi'

export default function Loading({message = "Loading...", fullScreen = false}){
    return(
        <div className={`
      flex flex-col items-center justify-center w-full p-4 transition-all
      ${fullScreen ? 'min-h-screen' : 'min-h-[200px]'}
    `}>
      {/* Icon Container */}
      <div className="relative flex items-center justify-center">
        <BiLoaderAlt 
          className="animate-spin text-blue-600 
                     text-4xl md:text-5xl lg:text-6xl" 
        />
      </div>

      {/* Responsive Text */}
      {message && (
        <p className="mt-4 font-medium text-gray-600 animate-pulse
                      text-sm md:text-base lg:text-lg">
          {message}
        </p>
      )}
    </div>
    )
}