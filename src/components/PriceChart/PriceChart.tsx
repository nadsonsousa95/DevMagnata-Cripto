import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import styles from './PriceChart.module.css'

interface HistoryData {
  priceUsd: string;
  time: number;
  date: string;
}

const apiKey = import.meta.env.VITE_COINCAP_API_KEY;

export function PriceChart({ coinId }: { coinId: string }) {
  const [history, setHistory] = useState<HistoryData[]>([]);

  useEffect(() => {
    async function fetchHistory() {
      const res = await fetch(`https://api.coincap.io/v3/assets/${coinId}/history?interval=m1&apiKey=${apiKey}`);
      const data = await res.json();
      setHistory(data.data);
    }
    fetchHistory();
  }, [coinId]);

  const formattedData = history.map(item => ({
    time: new Date(item.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    price: Number(item.priceUsd),
  }));

  return (
    <div className={styles.cointainerChart}>
      <ResponsiveContainer>
        <LineChart data={formattedData}>
          <XAxis dataKey="time" hide />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#f19f11" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
