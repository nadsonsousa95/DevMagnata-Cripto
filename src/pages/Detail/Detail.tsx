import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import type { CoinsProps } from "../Home/Home";
import styles from "./Detail.module.css";
import { BsSearch } from 'react-icons/bs'
import { PriceChart } from "../../components/PriceChart/PriceChart";

export function Detail() {
  const { cripto } = useParams<{ cripto: string }>();
  const navigate = useNavigate();
  const [coin, setCoin] = useState<CoinsProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const url = `https://rest.coincap.io/v3/assets?limit=2000&apiKey=87fd2fc537c97f418f9d35bf1b85d9359084cd780ba20da160a87b73c915e9b7`;

  useEffect(() => {
    async function getCoin() {
      try {
        setLoading(true);
        const response = await fetch(url);
        const data = await response.json();

        const foundCoin = data.data.find(
          (c: CoinsProps) => c.id.toLowerCase() === cripto?.toLowerCase()
        );
        setCoin(foundCoin || null);
      } catch (error) {
        console.log("Erro na requisição:", error);
        setCoin(null);
      } finally {
        setLoading(false);
      }
    }
    getCoin();
  }, [cripto, url]);

  if (loading) {
    return <p className={styles.loadingText}>Carregando informações...</p>;
  }

  if (!coin) {
    navigate("*");
    return null;
  }

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(coin.priceUsd));

  const formattedMarketCap = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
  }).format(Number(coin.marketCapUsd));

  const formattedVolume = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
  }).format(Number(coin.volumeUsd24Hr));

  const changeClass =
    Number(coin.changePercent24Hr) >= 0 ? styles.profit : styles.loss;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img 
            className={styles.logo}
            alt='logo Cripto'
            src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
            >
        </img>
        <h1 className={styles.name}>{coin.name}</h1>
        <p className={styles.symbol}>{coin.symbol}</p>
      </header>

      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
           <span className={styles.label}>Histórico de Preços (24h)</span>
        </div>
        <PriceChart coinId={coin.id}/>
        <div className={styles.infoItem}>
          <span className={styles.label}>Rank</span>
          <span className={styles.value}>{coin.rank}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Preço (USD)</span>
          <span className={styles.value}>{formattedPrice}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Moedas em Circulação</span>
            {Number(coin.supply).toFixed(2)}
        </div>
          <div className={styles.infoItem}>
          <span className={styles.label}>Quantidade Máxima de Moedas</span>
            {Number(coin.maxSupply).toFixed(2)}
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Volume (24h)</span>
          <span className={styles.value}>{formattedVolume}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Capitalização de Mercado</span>
          <span className={styles.value}>{formattedMarketCap}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Mudança (24h)</span>
          <span className={changeClass}>
            {Number(coin.changePercent24Hr).toFixed(2)}%
          </span>
        </div>
         <div className={styles.infoItem}>
          <span className={styles.label}>Explorar</span>
            <button className={styles.explorer}><BsSearch/><a href={coin.explorer} target="_blank" rel="noopener noreferrer">Explorar</a></button>
        </div>
      </div>

      <Link to="/" className={styles.backButton}>
        Voltar
      </Link>
    </div>
  );
}
