import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface SearchBarProps {
    onSearch: (query: string) => void;
    loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };


    return (
        <div className="w-full max-w-3xl mx-auto mb-8">
            <form onSubmit={handleSubmit} className="relative">
                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Buscar produtos..."
                        className="w-full px-6 py-4 pr-32 text-lg border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-500 shadow-lg transition-all"
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        disabled={loading || !query.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-2.5 rounded-full font-semibold transition-all flex items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Buscando...
                            </>
                        ) : (
                            <>
                                <Search className="w-5 h-5" />
                                Buscar
                            </>
                        )}
                    </button>
                </div>
            </form>

            {loading && (
                <p className="text-center text-gray-600 mt-4 animate-pulse">
                    Buscando o melhor preço para você!
                </p>
            )}
        </div>
    );
};

export default SearchBar;