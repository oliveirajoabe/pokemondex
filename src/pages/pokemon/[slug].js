import { api } from '../../services/api';
import styles from './pokemon.module.scss';
import StatusBar from '../../components/SobreStatusBar';

export async function getStaticPaths() {
    const { data } = await api.get('pokemon');

    const paths = data.results.map(pokemon => {
        return {
            params: {
                slug: pokemon.name
            }
        }
    });

    return {
        paths,
        fallback: 'blocking'
    }
}

export async function getStaticProps(ctx) {
    const { slug } = ctx.params;
    
    const { data } = await api.get(`/pokemon/${slug}`)
    const pokemon = {
        id: data.id,
        name: data.name,
        xp: data.base_experience,
        altura: data.height,
        peso: data.weight,
        tipo: data.types,
        moves: data.moves,
        stats: data.stats,
    }
    return {
        props: {
            pokemon
        },
        revalidate: 60 * 60
    }
}

export default function Pokemon({pokemon}) {
    return (
        <div className={styles.pokemonArea}>
            <div className={styles.pokemonImgArea}>
                <img src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}/>
            </div>
            <div className={styles.pokemonAreaSobre}>
                <h1>{pokemon.name}</h1>
                <div className={styles.pokemonTipo}>
                    {pokemon.tipo.map((item, index)=>{
                        return (
                            <small key={index}>{item.type.name}</small>
                        )
                    })}
                </div>
                {pokemon.stats.map((item, index)=> {
                    return(
                        <div className={styles.areaStats} key={index}>
                            <div className={styles.tituloStats}>
                                <p>{item.stat.name}</p>
                            </div>
                            <StatusBar percentageBar={item.base_stat}/>
                        </div>
                    )
                })}
            </div>
            <div className={styles.pokemonSobre}>

            </div>
        </div>
    )
}