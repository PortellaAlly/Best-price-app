import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface PriceHistoryData {
  price: number;
  checked_at: string;
}

interface PriceChartProps {
  history: PriceHistoryData[];
  productName: string;
}

const PriceChart: React.FC<PriceChartProps> = ({ history, productName }) => {
  const labels = history.map(h => {
    const date = new Date(h.checked_at);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  }).reverse();

  const prices = history.map(h => h.price).reverse();
  const firstPrice = prices[0];
  const lastPrice = prices[prices.length - 1];
  const variation = lastPrice - firstPrice;
  const variationPercent = ((variation / firstPrice) * 100).toFixed(1);

  const data = {
    labels,
    datasets: [
      {
        label: 'Preço (R$)',
        data: prices,
        borderColor: 'rgb(220, 38, 38)',
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        fill: true,
        tension: 0.4, 
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: 'rgb(220, 38, 38)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          label: function(context: any) {
            return 'R$ ' + context.parsed.y.toFixed(2);
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function(value: any) {
            return 'R$ ' + value.toFixed(0);
          },
          font: {
            size: 12,
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        }
      }
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Histórico de Preços
        </h3>
        <p className="text-sm text-gray-600 line-clamp-1">
          {productName}
        </p>
      </div>

      <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          {variation < 0 ? (
            <>
              <div className="bg-green-100 p-2 rounded-full">
                <TrendingDown className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Economia</p>
                <p className="text-xl font-bold text-green-600">
                  R$ {Math.abs(variation).toFixed(2)} ({variationPercent}%)
                </p>
              </div>
            </>
          ) : variation > 0 ? (
            <>
              <div className="bg-red-100 p-2 rounded-full">
                <TrendingUp className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Aumento</p>
                <p className="text-xl font-bold text-red-600">
                  R$ {variation.toFixed(2)} (+{variationPercent}%)
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-gray-200 p-2 rounded-full">
                <Minus className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Preço estável</p>
                <p className="text-xl font-bold text-gray-800">
                  Sem variação
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500 text-center">
          Baseado em {history.length} {history.length === 1 ? 'consulta' : 'consultas'}
        </p>
      </div>
    </div>
  );
};

export default PriceChart;