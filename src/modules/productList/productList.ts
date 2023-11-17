import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './productList.tpl.html';
import { ProductData } from 'types';
import { Product } from '../product/product';
import sendEvent from '../../utils/eventTracker';

export class ProductList {
  view: View;
  products: ProductData[];

  constructor() {
    this.products = [];
    this.view = new ViewTemplate(html).cloneView();
  }

  initObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        
        if (!entry.isIntersecting) return
          const productIdAttr = entry.target.getAttribute('data-product-id');
          const productId = Number(productIdAttr) 
          if (!productId ) return
            const productData = this.products.find((p) => p.id === productId);
            if (productData) {
              const eventType = productData.log ? 'viewCardPromo' : 'viewCard';
              sendEvent(eventType, { ...productData, timestamp: Date.now() });
            }
          
        
      });
    });

    this.view.root.querySelectorAll('.product').forEach((card) => {
      observer.observe(card);
    });
  }

  attach($root: HTMLElement) {
    $root.innerHTML = '';
    $root.appendChild(this.view.root);
  }

  update(products: ProductData[]) {
    this.products = products;
    this.render();
  }

  render() {
    this.view.root.innerHTML = '';
    this.products.forEach((product) => {
      const productComp = new Product(product);
      productComp.render();
      productComp.view.root.setAttribute('data-product-id', product.id.toString());
      productComp.attach(this.view.root);
    });
    this.initObserver();
  }
}
