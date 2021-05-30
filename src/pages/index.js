import { useEffect, useState } from 'react';
import {FcNext,FcPrevious} from 'react-icons/fc';
import Link from 'next/link';

import { api } from '../services/api';

import styles from './home.module.scss';
import Skeleton from '../components/Skeleton';
import StatusBar from '../components/StatusBar';
import Hero from '../components/Hero';

export default function Home() {
  const [pageAtual, setPageAtual] = useState(0);
  const [pokemonStatus, setPokemonStatus] = useState([]);
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{ 
    (async function getPokemon() {
      const { data } = await api.get("/pokemon", {
        params: {
          offset:pageAtual,
          limit:12
        }
      });
      const id = data.results.map((item) => {
        const url = item.url;
        const id = url.split("/");
        return id[6];
      });
      getStatusPokemons(id);
    })();
    async function getStatusPokemons(id) {
      let array = [];
      let arrayImg = [];
      for(let i=0; i<id.length; i++) {
        const { data } = await api.get(`/pokemon/${id[i]}`);
        const img = data.sprites.other["official-artwork"].front_default;
        array.push(data);
        arrayImg.push(img);
      }
      setPokemonStatus(array);
      setImage(arrayImg);
      setLoading(false);
    }    
  }, [pageAtual]);
  

  return (
    <>
      <Hero/>
      {loading && <Skeleton/>}
      {!loading &&
        <>
          <div className={styles.card}>
            {pokemonStatus.map((item, index) => (
              <div className={styles.flipCard} key={index}>
                  <div className={styles.flipCardInner}>
                    <div className={styles.flipCardFront}>
                      <img width="80" alt={item.name} src={image[index]}/>
                        <h2>{item.name}</h2>
                    </div>
                    <div className={styles.flipCardBack}>
                      <h2>{item.name}</h2>
                      {item.stats.map((item, index)=>(
                        <div className={styles.status} key={index}>
                          <p className={styles.tituloStatus}>{item.stat.name}:</p>
                          <StatusBar percentageBar={item.base_stat}/>
                          <p className={styles.porcentageStatus}>{item.base_stat}</p>
                        </div> 
                      ))}
                      <Link href={`/pokemon/${item.name}`} key={index}>
                        <div className={styles.btnLinkArea}>
                          <div className={styles.btnLink}>
                            Sobre
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
            ))}
          </div>
          <div className={styles.pagination}>
            <div className={styles.paginationArea}>
              {pageAtual <= 0 ?
                <div className={styles.notPage}><FcPrevious/></div> :
                <div className={styles.page} onClick={()=>{setLoading(true); setPageAtual(pageAtual-12)}}><FcPrevious/></div>
              }         
              <div className={styles.page} onClick={()=>{setLoading(true); setPageAtual(pageAtual+12)}}><FcNext/></div>
            </div>
          </div>
        </>
      }
    </>
  )
}
