import React from "react";
import { useState,useEffect } from "react";
const KEY = '99c3b6af';
// 
export function useMovies(query){
    const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

    useEffect(function(){
        // callback?.()
        const controller = new AbortController();
    
        async function FetchMovies(){
          try{
    
            setIsLoading(true)
            setError("")
            const res= await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,{signal: controller.signal });
    
            // 
            if(!res.ok)throw new Error("Something Went Wrong");
            
            const data = await res.json();
            if(data.Response === 'False')throw new Error("Movies Not Found");
            setMovies(data.Search);
            setError("")
            // console.log(data.Search)
          }catch(err){
            if(err.name !== 'AbortError'){
              
              console.error(err.message)
              setError(err.message)
            }
            
          }finally{
            setIsLoading(false)     
    
          }
          if(!query.length){
            setMovies([]);
            setError('');
            return;
    
          }
        }
    
        // handleCloseMovie();
        FetchMovies();
        return function(){
          controller.abort()
        }
    
      },[query])

      return {movies,isLoading,error}
    
}