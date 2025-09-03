import styles from './Home.module.css'
import { BsSearch } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'


export interface CoinsProps{
    id: string;
    changePercent24Hr: string;
    explorer: string;
    marketCapUsd: string;
    maxSupply: string;
    name: string;
    priceUsd: string;
    rank: string;
    supply: string;
    symbol: string;
    volumeUsd24Hr: string;
    vwap24Hr: string;
    tokens: object;
    formatedPrice?: string;
    formatedMarket?: string;
    formatedVolume?: string;
}

interface DataProps{
    data: CoinsProps[]
}

const apiKey = import.meta.env.VITE_COINCAP_API_KEY;

export function Home() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [coins, setCoins] = useState<CoinsProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  
  const url = `https://rest.coincap.io/v3/assets?limit=${limit}&offset=0&apiKey=${apiKey}`;

  useEffect(()=>{
    setLoading(true);
    async function fetchData(){
        try{
        getData();
        }catch(error){
        console.log(error);
        }finally{
        setLoading(false)
        }
    }
    fetchData();
  }, [limit])

  async function getData() {
    setLoading(true)
    fetch(url)
        .then(response => response.json())
        .then((data: DataProps)=>{
             if (!data?.data) {
                console.error("API não retornou dados");
                setCoins([]);
                setLoading(false);
                return;
            }
            const coinsData = data.data;

            const price = Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
            })

             const priceCompact = Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                notation: "compact"
            })

            const formatedResult = coinsData.map((coin)=>{
                const formated = {
                    ...coin,
                    formatedPrice: price.format(Number(coin.priceUsd)),
                    formatedMarket: priceCompact.format(Number(coin.marketCapUsd)),
                    formatedVolume:  priceCompact.format(Number(coin.volumeUsd24Hr)),
                }
                return formated;
            })

            setCoins(formatedResult);
            setLoading(false);
        })
    
  }

  function handleSearch(e: FormEvent){
    e.preventDefault();
    if(input === ""){
        return
    }
    navigate(`/detail/${input}`);
  }

  function handleGetMore(){
    if(limit == 10){
        setLimit(15);
        return
    }
    setLimit(l => l+5);
  }

  return (
    <main className={styles.home}>
        <form className={styles.form} onSubmit={handleSearch}>
            <input 
                type='text' 
                placeholder='Digite o nome da moeda: ex. Bitcoin' 
                value={input}
                onChange={(e)=>{setInput(e.target.value)}}
                />
            <button type='submit'><BsSearch size={25} color='white'></BsSearch></button>
        </form>

         {loading && <p className={styles.loading}>Carregando cripto moedas...</p>}
        <table>
            <thead>
                <tr>
                    <th scope='col'>Moeda</th>
                    <th scope='col'>Valor de Mercado</th>
                    <th scope='col'>Preço</th>
                    <th scope='col'>Volume</th>
                    <th scope='col'>Mudança 24h</th>
                </tr>
            </thead>
            <tbody id='tbody'>
                {coins.length > 0 && coins.map((coin)=>(
                    <tr className={styles.tr} key={coin.id}>
                    <td className={styles.tdlabel} data-label="Moeda">
                        <div className={styles.name}>
                            <img 
                                className={styles.logo}
                                alt='logo Cripto'
                                src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
                                    >
                            </img>
                            <Link to={`/detail/${coin.id}`}>
                                <span>{coin.name} | {coin.symbol}</span> 
                            </Link>
                        </div>
                    </td>
                    <td className={styles.tdlabel}  data-label="Valor Mercado">
                         {coin.formatedMarket}
                    </td>
                     <td className={styles.tdlabel}  data-label="Preço">
                         {coin.formatedPrice}
                    </td>
                    <td className={styles.tdlabel}  data-label="Volume">
                         {coin.formatedVolume}
                    </td>
                    <td className={Number(coin.changePercent24Hr) <= 0 ? styles.tdLoss : styles.tdProfit}  data-label="Mudança 24h">
                         {Number(coin.changePercent24Hr).toFixed(3)}%
                    </td>
                </tr>
                ))}
            </tbody>
        </table>

        {loading && <p className={styles.loading}>Carregando cripto moedas...</p>}
        <button onClick={handleGetMore} className={styles.buttonMore}>Carregar mais</button>
        
    </main>
  )
}


