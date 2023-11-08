import { Component } from '../component';
import { Product } from '../product/product';
import html from './favorites.tpl.html';
import { ProductData } from 'types';

class Favorities extends Component {
  products!: ProductData[];
  async render() {
    const favoritesStr = localStorage.getItem('fav');
    const favorites = favoritesStr ? JSON.parse(favoritesStr) : [];

    if (favorites.length < 1) return;
    favorites.forEach((product: ProductData) => {
      const productComp = new Product(product, { isHorizontal: true });
      productComp.render();
      productComp.attach(this.view.cart);
    });
  }
}

export const favorites = new Favorities(html);
