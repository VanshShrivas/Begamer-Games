import React , {useState,useEffect}from 'react'
import GameCard from "../components/gamecard"

const Games = () => {
  // recieve data -> frame into array -> render that array into flex-wrap
  const [games, setGames] = useState([]);
  
    useEffect(() => {
      const fetchGames = async () => {
        try {
          const res = await fetch("http://localhost:3000/get_games");
          const data = await res.json();
          setGames(data);
        } catch (err) {
          console.error("❌ Error fetching games:", err);
        }
      };
      fetchGames();
    }, []);


  return (
    <div className='flex flex-wrap items-center justify-evenly'>
      {games.map((element, idx) => {
        return (
          <GameCard
            key={idx}
            image={element.image}
            title={element.title}
            description={element.description}
            link={element.link}
          />
        );
      })}
    </div>
  )
}

export default Games;
