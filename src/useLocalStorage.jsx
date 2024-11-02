import {useEffect, useState } from "react";

export function useLocalStorageState(initialState,key){
    const [value, setValue] = useState( function(){
        const storedWatchedMovie= localStorage.getItem(key);
        // console.log(storedWatchedMovie)
       
        return storedWatchedMovie? JSON.parse(storedWatchedMovie):initialState
      })

      useEffect(function(){
        localStorage.setItem(key, JSON.stringify(value));
    
      },[value,key])

      return [value,setValue]
    


}

