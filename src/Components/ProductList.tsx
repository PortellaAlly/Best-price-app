import React, { useState, useMemo } from 'react';
import { Product } from '../Types';
import ProductCard from './ProductCard';
import { findCheapest } from '../Utils/helpers';
import { SlidersHorizontal, TrendingDown, Store } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  onViewHistory?: (productId: number) => void;
}

type SortOption = 'cheapest' | 'expensive' | 'name';
type FilterStore = 'all' | string;

const ProductList: React.FC<ProductListProps> = ({ products, onViewHistory }) => {
  const [sortBy, setSortBy] = useState<SortOption>('cheapest');
  const [filterStore, setFilterStore] = useState<FilterStore>('all');

  const stores = useMemo(() => {
    const uniqueStores = Array.from(new Set(products.map(p => p.store)));
    return uniqueStores;
  }, [products]);

  const processedProducts = useMemo(() => {
    let filtered = [...products];

    if (filterStore !== 'all') {
      filtered = filtered.filter(p => p.store === filterStore);
    }

    switch (sortBy) {
      case 'cheapest':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'expensive':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [products, sortBy, filterStore]);

  const cheapestProduct = findCheapest(products);

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-7xl mx-auto">

      <div className="p-6 mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">

          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-gray-600" />
            <span className="text-lg font-semibold text-gray-800">
              {processedProducts.length} {processedProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
            </span>
          </div>

          <div className="flex flex-wrap gap-3">

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-gray-600" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="cheapest">Menor preço</option>
                <option value="expensive">Maior preço</option>
                <option value="name">Nome A-Z</option>
              </select>
            </div>

            {stores.length > 1 && (
              <select
                value={filterStore}
                onChange={(e) => setFilterStore(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">Todas as lojas</option>
                {stores.map(store => (
                  <option key={store} value={store}>{store}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        {cheapestProduct && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 text-red-600">
              <TrendingDown className="w-5 h-5" />
              <span className="font-semibold">
                Melhor oferta: {cheapestProduct.name.substring(0, 50)}... por{' '}
                <span className="text-xl">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cheapestProduct.price)}</span>
                {' '}na {cheapestProduct.store}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {processedProducts.map((product, index) => (
          <ProductCard
            key={`${product.store}-${index}`}
            product={product}
            isCheapest={cheapestProduct?.price === product.price && cheapestProduct?.store === product.store}
            onViewHistory={onViewHistory}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;