import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorage";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// 
const KEY = '99c3b6af';
const tempQuery = 'Avatar'
export default function App() {
  const [query, setQuery] = useState("");
  // 
 const{movies,isLoading,error}= useMovies(query)
//  
 const [watched,setWatched] = useLocalStorageState([],"watched")
  const [selectedId, setSelectedId] = useState(null);
  // const [watched, setWatched] = useState( []);
  // const [watched, setWatched] = useState( function(){
  //   const storedWatchedMovie= localStorage.getItem('watched');
  //   return JSON.parse(storedWatchedMovie)
  // })

  function handleSelectedMovie(id){
    setSelectedId(selectedId=>selectedId === id?null : id);

  }

  function handleWatched(movie){
    setWatched(watched=>[...watched,movie]);
    // localStorage.setItem('watched', JSON.stringify([...watched,movie]))
  }

  function handleCloseMovie(){
    setSelectedId(null);
  }

  function handleDeleteWatched(id){
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));

  }

  // effect for localstorage watched movie
  // useEffect(function(){
  //   localStorage.setItem('watched', JSON.stringify(watched));

  // },[watched])

 

  

  return (
    <>
    <Navbar>
    <Search query={query} setQuery={setQuery}/>
    <NumResults movies={movies} />
    </Navbar>
    <Main> 
    <Box> 
    {/* {isLoading? <Loader />:<MoviesList movies={movies} />} */}
    {isLoading && <Loader />}
    {!isLoading && !error && <MoviesList movies={movies} handleSelectedMovie={handleSelectedMovie}/>}
    {error && <ErrorMessage message={error} />}

    </Box>
      
    <Box> 
    {selectedId ? <MovieDetails selectedId={selectedId} 
    handleCloseMovie={handleCloseMovie} 
    handleWatched={handleWatched}
    watched={watched}/>:
    <>
    <WatchedSummary watched={watched}/>
    <WatchedMoviesList watched={watched}
    handleDeleteWatched={handleDeleteWatched}/>
    </>
    }
    </Box>
      

    </Main>
      
    </>
  );
}

function Loader(){
  return(
    <div className="loading"></div>
  )
}

function ErrorMessage({message}){
  return(
    <p className="error">

    <span>⛔</span> {message}
    </p>
  )
}
function  Navbar({children}) {
 
return <nav className="nav-bar">
  <Logo />
   {children}
  
 
</nav>

}
function Logo(){
  return <div className="logo">
  <span role="img">🎬</span>
  <h1>MI Movies</h1>
</div>

}

function Search({query,setQuery}){
  const inputEl = useRef(null)

  useEffect(function(){
    function callback(e){
      inputEl.current.focus();
      // if(e.code ==="Enter"){

      //   inputEl.current.focus();
      // }
      

    }
    document.addEventListener('keydown',callback)
    return document.addEventListener('keydown',callback)

  },[])

  // useEffect(function(){
  //   const el = document.querySelector('.search');
  //   console.log(el)
  //   el.focus()
  // },[])
  return(
    <input
    className="search"
    type="text"
    placeholder="Search movies..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    ref={inputEl}
  />

  )
}

function NumResults({movies}){
  return  <p className="num-results">
  Found <strong>{movies.length}</strong> results
</p>

}

function Main({children}){
  
  
  
  
  return(
    <main className="main">
       {children}
       
      </main>

  )
}

function Box({children}){
  const [isOpen, setIsOpen] = useState(true);
  return  <div className="box">
  <button
    className="btn-toggle"
    onClick={() => setIsOpen((open) => !open)}
  >
    {isOpen ? "–" : "+"}
  </button>
  {isOpen && (
    children
    
  )}
</div>
}

/*
function WatchedBox({movies}){
  const [watched, setWatched] = useState(tempWatchedData);

  const [isOpen2, setIsOpen2] = useState(true);
    
  

  return  <div className="box">
  <button
    className="btn-toggle"
    onClick={() => setIsOpen2((open) => !open)}
  >
    {isOpen2 ? "–" : "+"}
  </button>
  {isOpen2 && (
    <>
     {children}

     
    </>
  )}
</div>
}
*/

function MoviesList({movies,handleSelectedMovie}){
  return <ul className="list list-movies">
  {movies?.map((movie) => (
    <Movies movie={movie} key={movie.imdbID} handleSelectedMovie={handleSelectedMovie} />
    
  ))}
</ul>
}

function Movies({movie,handleSelectedMovie}){
  return <li key={movie.imdbID} onClick={()=>handleSelectedMovie(movie.imdbID)}>
  <img src={movie.Poster} alt={`${movie.Title} poster`} />
  <h3>{movie.Title}</h3>
  <div>
    <p>
      <span>🗓</span>
      <span>{movie.Year}</span>
    </p>
  </div>
</li>
}

function MovieDetails({selectedId,handleCloseMovie,handleWatched,watched}) {
  const [movie, setMovie] = useState({})
  const [isLoading,setIsLoading]=useState(false)
  const [userRating,setUserRating] = useState("")

  const countRef= useRef(0);

  useEffect(function(){
   if(userRating) countRef.current += 1;

  },[userRating])

  const {
    Title:title,
    Year: year,
    Poster: poster,
    imdbRating:imdbRating,
    Genre: genre,
    Runtime: runtime,
    Director: director,
    Actors: actors,
    Plot: plot,
    Released:released,
    
  } = movie;
  // console.log(movie);
  function handleAdd(){
    const newWatchedMovie={
      imdbID:selectedId,
      title,
      year,
      poster,
      imdbRating:Number(imdbRating),
      runtime:Number(runtime.split("").at(0)),
      userRating,
       countRatingDecisions:countRef.current,

    }
    handleWatched(newWatchedMovie);
    handleCloseMovie();
  }

 useEffect(function (){
  const GetMovieDetails = async()=>{
    setIsLoading(true)
    const res= await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);

    const data = await res.json();
    setMovie(data)
    setIsLoading(false)

  }
  GetMovieDetails()

 },[selectedId]) 

//  changing app title depending on selected movie
useEffect(function(){
  if(!title)return;
  document.title= `Movie:${title}`;
  return function(){
    document.title =`MI Movies  `
  }
},[title])
// 
const isWatched = watched.map((movie)=>movie.imdbID).includes(selectedId);
const watchedUserRating = watched.find(movie=>movie.imdbID === selectedId)?.userRating;

  return <div className="details">
    {
      isLoading ? <Loader /> :(
        <>
        <header>

<button className="btn-back" onClick={handleCloseMovie}>&larr;</button>
<img src={poster} alt={`poster of${movie}movie`} />

<div className="details-overview">
  <h2>{title}</h2>
  <p>{released} &bull;{runtime}</p>
  <p>{genre}</p>
  <p><span>⭐</span>{imdbRating}IMDB Rating</p>
</div>
</header>
<section>
  <div className="rating">

  {!isWatched ?
  <>
  <StarRating maxRating={10} size={24} onSetRating={setUserRating}/>
   {userRating > 0 && <button className="btn-add" onClick={handleAdd}>+Add to List</button>}
  </> 
  : <p>You Rated This Movie Already {watchedUserRating}⭐</p>}
  
  </div>
  <p> <em>{plot}</em></p>
  <p>Starring {actors}</p>
  <p>Directed By {director}</p>
</section>

        </>
      )
    }
    
  </div>

}

function  WatchedSummary({watched}){
  
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));

  return <div className="summary">
  <h2>Movies you watched</h2>
  <div>
    <p>
      <span>#️⃣</span>
      <span>{watched.length} movies</span>
    </p>
    <p>
      <span>⭐️</span>
      <span>{avgImdbRating.toFixed(2)}</span>
    </p>
    <p>
      <span>🌟</span>
      <span>{avgUserRating.toFixed(2)}</span>
    </p>
    <p>
      <span>⏳</span>
      <span>{avgRuntime.toFixed(2)} min</span>
    </p>
  </div>
</div>
}

function WatchedMoviesList({watched,handleDeleteWatched}){
  return  <ul className="list">
  {watched.map((movie) => (
    <WatchedMovie movie={movie} key={movie.imdbID}
    handleDeleteWatched={handleDeleteWatched}/>
    
  ))}
</ul>
}


function WatchedMovie({movie,handleDeleteWatched}){
  return <li>
  <img src={movie.poster} alt={`${movie.title} poster`} />
  <h3>{movie.title}</h3>
  <div>
    <p>
      <span>⭐️</span>
      <span>{movie.imdbRating}</span>
    </p>
    <p>
      <span>🌟</span>
      <span>{movie.userRating}</span>
    </p>
    <p>
      <span>⏳</span>
      <span>{movie.runtime} min</span>
    </p>
    <button className="btn-delete" onClick={()=>handleDeleteWatched(movie.imdbID)}>X</button>
  </div>
</li>
}