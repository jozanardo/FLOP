import './styles/main.css';
import * as Dialog from "@radix-ui/react-dialog"
import LogoImg from './assets/logo-nlw-esports2.svg';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { useState, useEffect } from 'react';
import { CreateAdModal } from './components/createAdModal';
import axios from 'axios';

export interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  const [allGames, setAllGames] = useState<Game[]>([]);

  const [modal, setModal] = useState("15.15");

  useEffect(() => {
    axios('http://localhost:8080/games')
      .then(response => {
        setGames(response.data.slice(0,10));
        setAllGames(response.data);
      })
  },[])

  function findGameByName(e: any) {
    let filteredGames = allGames.filter(game => game.title.toLowerCase().includes(e.target.value.toLowerCase()));
    if(e.target.value == "") {
      setGames(allGames.slice(0, 10));
      setModal("15.15");
    }
    else if (filteredGames.length > 0 ) {
      setGames(filteredGames);
      setModal("100")
    } else {
      alert(`O jogo ${e.target.value} não foi encontrado`);
      setGames(allGames.slice(0, 10));
      setModal("15.15");
    }

  }

  return (
      
      <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
        <img src={LogoImg} alt=""/>

        <h1 className="text-3xl text-white font-black mt-5 ">
          Finder of Legendary Organized Party
        </h1>

        <div className="self-stretch flex justify-between items-center mt-16">
          <h1 className="text-6xl text-white font-black ">
            Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
          </h1>

          <input className="pl-9 pr-3 h-12 text-white bg-transparent border-2 border-white-500/500 rounded-[50px]" type="text" onInput={findGameByName} placeholder='Encontrar outro jogo...'/>
        </div>
        
        

        <div className={`grid grid-flow-col auto-cols-[${modal}%] gap-6 overflow-auto mt-16 pb-6 scrollbar-thin scrollbar-thumb-violet-500 scrollbar-track-violet-200`}>
          {games.map(game => {
            return (
              <GameBanner 
                key={game.id} 
                id={game.id}
                bannerUrl={game.bannerUrl} 
                title={game.title} 
                adsCount={game._count.ads}/>
            )
          })} 
        </div>    
        
        <Dialog.Root>
          <CreateAdBanner />
          <CreateAdModal />
          
        </Dialog.Root>
      </div>
  )
}

export default App
