import { useEffect, useState } from 'react';
import {FcNext,FcPrevious} from 'react-icons/fc';

import { api } from '../services/api';
import styles from './home.module.scss';

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(20); 
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(()=>{
    async function loadPokemon() {
      const {data} = await api.get("/pokemon", {
        params: {
          offset:currentPage,
          limit:limit
        }
      });
      setTotal(data.count);

      const totalPages = Math.ceil(total / limit);
      const arrayPages = [];
      for(let i=1; i <= totalPages; i++){
        arrayPages.push(i)
      }
      setPages(arrayPages);   
      setPokemons(data.results);
    }
    loadPokemon();
  }, [limit, total, currentPage]);

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
          {/* {currentPage > 0 &&  */}
            <div className={styles.page} onClick={()=>setCurrentPage(currentPage-21)} ><FcPrevious/></div>
          {/* } */}
          
          {/* {currentPage < pages.length && */}
            <div className={styles.page} onClick={()=>setCurrentPage(currentPage+21)}><FcNext/></div>
          {/* } */}
        </div>
      </div>
    </>
  )
}
