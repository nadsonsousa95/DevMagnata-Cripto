import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import styles from './PriceChart.module.css'

interface HistoryData {
  priceUsd: string;
  time: number;
  date: string;
}

export function PriceChart({ coinId }: { coinId: string }) {
  const [history, setHistory] = useState<HistoryData[]>([]);

  useEffect(() => {
    async function fetchHistory() {
      const res = await fetch(`https://api.coincap.io/v3/assets/${coinId}/history?interval=m1&apiKey=87fd2fc537c97f418f9d35bf1b85d9359084cd780ba20da160a87b73c915e9b7`);
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
