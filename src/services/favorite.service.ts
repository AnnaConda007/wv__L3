import { ProductData } from 'types';

class FavoriteService {
  private favorites: ProductData[] = [];

  addToFavorites(product: ProductData) {
    this.favorites.push(product);
    const favoritesStr = localStorage.getItem('fav');
    const favorites = favoritesStr ? JSON.parse(favoritesStr) : [];
    favorites.push(product);
    localStorage.setItem('fav', JSON.stringify(favorites));
  }

  isInFavorites(product: ProductData): boolean {
    return this.favorites.some((item) => item.id === product.id);
  }
  getFavorites(): ProductData[] {
    return this.favorites;
  }
}

export const favoriteService = new FavoriteService();
