import React, { useState } from 'react';
import SearchBar from './Components/SearchBar';
import ProductList from './Components/ProductList';
import PriceChart from './Components/PriceChart';
import { searchProducts, getProductHistory } from './Services/api';
import { Product } from './Types';
import { ShoppingCart, AlertCircle, X } from 'lucide-react';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  
  // Estado do gráfico - NOVO
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [priceHistory, setPriceHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const response = await searchProducts(query);
      setProducts(response.products);
      
      if (response.products.length === 0) {
        setError('Nenhum produto encontrado. Tente outro termo de busca.');
      }
    } catch (err: any) {
      console.error('Erro na busca:', err);
      setError('Erro ao buscar produtos. Verifique se a API está rodando.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Função pra buscar histórico - NOVO
  const handleViewHistory = async (productId: number) => {
    setLoadingHistory(true);
    try {
      const data = await getProductHistory(productId);
      setSelectedProduct(data.product);
      setPriceHistory(data.history);
    } catch (err) {
      console.error('Erro ao buscar histórico:', err);
      alert('Erro ao carregar histórico de preços');
    } finally {
      setLoadingHistory(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 p-2 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Best Price Finder
              </h1>
              <p className="text-gray-600">
                Compare preços e encontre as melhores ofertas
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        
        <SearchBar onSearch={handleSearch} loading={loading} />

        {error && (
          <div className="max-w-3xl mx-auto mb-8 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {!loading && products.length > 0 && (
          <ProductList 
            products={products} 
            onViewHistory={handleViewHistory} // ← ADICIONA
          />
        )}

        {!loading && !searched && (
          <div className="text-center text-gray-500 mt-20">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-xl font-medium text-gray-700">
              Faça uma busca para encontrar os melhores preços!
            </p>
            <p className="text-gray-500 mt-2">
              Comparamos preços do Mercado Livre, Amazon, Magazine Luiza e Americanas
            </p>
          </div>
        )}
      </main>

      {/* Modal do Gráfico - NOVO */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-all z-10"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-6">
              {loadingHistory ? (
                <div className="text-center py-12">
                  <div className="animate-spin w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full mx-auto"></div>
                  <p className="mt-4 text-gray-600">Carregando histórico...</p>
                </div>
              ) : priceHistory.length > 0 ? (
                <PriceChart 
                  history={priceHistory} 
                  productName={selectedProduct.name} 
                />
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">Sem histórico de preços ainda</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600">
          <p>Best Price Finder - Encontre as melhores ofertas 🛒</p>
        </div>
      </footer>
    </div>
  );
}

export default App;