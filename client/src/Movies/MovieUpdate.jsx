import React, { useState, useEffect } from "react";
import axios from "axios";

/*
{
   id: 5,
   title: 'Tombstone',
   director: 'George P. Cosmatos',
   metascore: 89,
   stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],

}

["Dad", "Dad", "Dad"]
value.split(",")
*/


function MovieUpdate({match:{params:{id}}, history}) {
   const [movie, setMovie] = useState({
      id: -1,
      title: "",
      director: "",
      metascore: -1,
      stars: [],
   });

   useEffect(() => {
      axios
      .get(`http://localhost:5000/api/movies/${id}`)
         .then(response => {
            setMovie(response.data);
         })
         .catch(err => {
            console.error(err.response);
         })
   }, []);

   const handleChange = event => {
      let value = event.target.value;
      if (Number.isNaN(value)) {
         console.log(Number(value));
      }

      setMovie({
         ...movie,
         [event.target.name]: value
      });
   }

   const handleStarsChange = event => {
      const value = event.target.value;

      setMovie({
         ...movie,
         stars: value.split(",")
      });
   }

   const updateMove = event => {
      event.preventDefault();

      axios
         .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
         .then(response => {
            history.push(`/movies/${id}`);
         })
         .catch(err => {
            console.error(err.response);
         })
   };

   return (
      <div>
         {
            (movie.id >= 0)
            ?  (
               <form onSubmit={updateMove}>
                  <input type="text" name="title" placeholder="Title" value={movie.title} onChange={handleChange} />
                  <input type="text" name="director" placeholder="Director" value={movie.director} onChange={handleChange} />
                  <input type="number" name="metascore" placeholder="Metascore" value={movie.metascore} onChange={handleChange} />
                  <input type="text" name="stars" placeholder="stars" value={movie.stars} onChange={handleStarsChange} />
                  <button type="submit">Save</button>
               </form>
            )
            : <p>Loading...</p>
         }
      </div>
   );
}

export default MovieUpdate;