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
        abilities: data.abilities,
        stats: data.stats,
    }
    const idAbility  = pokemon.abilities.map((item)=>{
        const url = item.ability.url;
        const idAbility = url.split('/')
        return idAbility[6];
    });

    let output = []
    for(let i=0; i<idAbility.length; i++){
        
        const { data } = await api.get(`/ability/${idAbility[i]}`);
        output.push(data);
    }    
    const abilities = output.map((item)=>{
        return item.effect_entries
    });
    
    

    return {
        props: {
            pokemon,
            abilities
        },
        revalidate: 60 * 60
    }
}

export default function Pokemon({pokemon, abilities}) {
    const habilidades = abilities.map((item)=>{
        // retorna o index 1 pois é a linguagem "en"
        return item[1];
    });
    const efeito = habilidades.map((item)=>{
        return item.effect
    });
    
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
                <div className={styles.pokemonAbilities}>
                    <h1>Habilidades</h1>
                    {pokemon.abilities.map((item, index)=>{
                        return (
                            <ul key={index}>
                                <li>
                                    <h3>{item.ability.name}:</h3>
                                    <p>{efeito[index]}</p>
                                </li>
                            </ul>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}