export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
};

export const calculateDiscount = (originalPrice: number, currentPrice: number): number => {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

export const findCheapest = (products: any[]): any | null => {
  if (products.length === 0) return null;
  return products.reduce((min, product) => 
    product.price < min.price ? product : min
  );
};

export const groupByStore = (products: any[]) => {
  return products.reduce((acc, product) => {
    const store = product.store;
    if (!acc[store]) {
      acc[store] = [];
    }
    acc[store].push(product);
    return acc;
  }, {} as Record<string, any[]>);
};