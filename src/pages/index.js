import { useEffect, useState } from 'react';
import {FcNext,FcPrevious} from 'react-icons/fc';

import { api } from '../services/api';
import styles from './home.module.scss';

import Skeleton from '../components/Skeleton';

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [pageAtual, setPageAtual] = useState(0);
  const [pokemonStatus, setPokemonStatus] = useState([]);
  const [pokemonId, setPokemonId] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{

      async function loadPokemon() {
        const {data} = await api.get("/pokemon", {
          params: {
            offset:pageAtual,
            limit:12
          }
        });
        setPokemons(data.results);
        setLoading(false);
      };
      loadPokemon();
      
    async function uniquePokemon() {
      const { data } = await api.get(`/pokemon/${pokemonId}`);
      setPokemonStatus(data.stats);
    };
    uniquePokemon();
  }, [pageAtual, pokemonId]);
  
  const id = pokemons.map((item)=>{
    const str =  item.url;
    const url = str.split("/");
    return url[6];
  });
  
  return (
    <>
      {loading && <Skeleton/>}
      {!loading &&
        <>
          <div className={styles.flipCard}>    
            {pokemons.map((item, index) => {
              return (
                <div className={styles.flipCardInner} key={index} onMouseOver={()=>setPokemonId(id[index])}>
                  <div className={styles.flipCardFront}>
                    <img width="80" src={`https://pokeres.bastionbot.org/images/pokemon/${id[index]}.png`}/>
                    <h2>{item.name}</h2>
                  </div>
                  <div className={styles.flipCardBack} >
                    {pokemonStatus.map((item, index) => (
                      <div className={styles.status} key={index}>
                        <p>{item.stat.name}:</p>
                        {/* <p>{item.base_stat}</p> */}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
          <div className={styles.pagination}>
            <div className={styles.paginationArea}>
              <div className={styles.page} onClick={()=>{setLoading(true); setPageAtual(pageAtual-12)}} disabled><FcPrevious/></div>
              
              <div className={styles.page} onClick={()=>{setLoading(true); setPageAtual(pageAtual+12)}}><FcNext/></div>
            </div>
          </div>
        </>
      }
    </>
  )
}
