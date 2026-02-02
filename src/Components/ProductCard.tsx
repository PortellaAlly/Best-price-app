import React from 'react';
import { ExternalLink, Award, TrendingUp } from 'lucide-react';
import { Product } from '../Types';
import { formatPrice } from '../Utils/helpers';

interface ProductCardProps {
  product: Product;
  isCheapest: boolean;
  onViewHistory?: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isCheapest, onViewHistory }) => {
  const storeColors: Record<string, string> = {
    'Mercado Livre': 'bg-yellow-50 text-yellow-700 border border-yellow-200',
    'Amazon': 'bg-orange-50 text-orange-700 border border-orange-200',
    'Magazine Luiza': 'bg-blue-50 text-blue-700 border border-blue-200',
    'Americanas': 'bg-red-50 text-red-700 border border-red-200',
  };

  return (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-5 relative border-2 ${
      isCheapest ? 'border-red-500' : 'border-gray-100'
    }`}>
      
      {isCheapest && (
        <div className="absolute -top-3 -right-3 bg-red-600 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-1 shadow-lg">
          <Award className="w-4 h-4" />
          Melhor Preço
        </div>
      )}

      <div className="w-full h-48 mb-4 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
        <img
          src={product.image || 'https://via.placeholder.com/300'}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/300?text=Sem+Imagem';
          }}
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2 min-h-[3.5rem]">
        {product.name}
      </h3>

      <div className="mb-3">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          storeColors[product.store] || 'bg-gray-50 text-gray-700 border border-gray-200'
        }`}>
          {product.store}
        </span>
      </div>

      <div className="mb-4">
        <p className={`text-3xl font-bold ${isCheapest ? 'text-red-600' : 'text-gray-800'}`}>
          {formatPrice(product.price)}
        </p>
      </div>

      <div className="space-y-2">
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
        >
          Ver Oferta
          <ExternalLink className="w-4 h-4" />
        </a>

        {product.id && onViewHistory && (
          <button
            onClick={() => onViewHistory(product.id!)}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm"
          >
            <TrendingUp className="w-4 h-4" />
            Ver Histórico
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;