import Link from 'next/link';
import { useEffect, useState } from 'react';
import {FcNext,FcPrevious} from 'react-icons/fc';

import { api } from '../services/api';
import styles from './home.module.scss';


export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [pageAtual, setPageAtual] = useState(0);

  useEffect(()=>{
    async function loadPokemon() {
      const {data} = await api.get("/pokemon", {
        params: {
          offset:pageAtual,
          limit:12
        }
      });
      setPokemons(data.results);
    }
    loadPokemon();
  }, [pageAtual]);


  const id = pokemons.map((item)=>{
    const str =  item.url;
    const url = str.split("/");
    return url[6];
  });

  return (
    <>
      <div className={styles.cardContainer}>    
        {pokemons.map((item, index) => {
          return (
            <ul className={styles.card} key={index}>
              <li>
                <img width="80" src={`https://pokeres.bastionbot.org/images/pokemon/${id[index]}.png`}/>
                <h2>{item.name}</h2>
              </li>
            </ul>
          )
        })}
      </div>
      <div className={styles.pagination}>
        <div className={styles.paginationArea}>
            <div className={styles.page} onClick={()=>setPageAtual(pageAtual-12)} disabled><FcPrevious/></div>
          
          <div className={styles.page} onClick={()=>setPageAtual(pageAtual+12)}><FcNext/></div>
        </div>
      </div>
    </>
  )
}
