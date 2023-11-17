import { ProductData } from 'types';

class FavoriteService {
  private favorites!: ProductData[];

  constructor() {
    const favoritesStr = localStorage.getItem('fav');
    this.favorites = favoritesStr ? JSON.parse(favoritesStr) : [];
  }

  addToFavorites(product: ProductData) {
    this.favorites.push(product);
    this.favorites.push(product);
    localStorage.setItem('fav', JSON.stringify(this.favorites));
  }

  isInFavorites(product: ProductData): boolean {
    return this.favorites.some((item) => item.id === product.id);
  }
  getFavorites(): ProductData[] {
    return this.favorites;
  }
}

export const favoriteService = new FavoriteService();
