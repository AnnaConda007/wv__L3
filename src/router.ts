import { catalogComp } from './modules/catalog/catalog';
import { notFoundComp } from './modules/notFound/notFound';
import { homepageComp } from './modules/homepage/homepage';
import { productDetailComp } from './modules/productDetail/productDetail';
import { checkoutComp } from './modules/checkout/checkout';
import { favorites } from './modules/favorites/favorites';
import sendEvent from './utils/eventTracker';

const ROUTES = {
  '/': homepageComp,
  '/catalog': catalogComp,
  '/product': productDetailComp,
  '/checkout': checkoutComp,
  '/favorites': favorites  

};

export default class Router {
  $appRoot: HTMLElement;

  constructor() {
    // @ts-ignore
    this.$appRoot = document.querySelector('.js__root');

    window.addEventListener('load', this.route.bind(this));
    window.addEventListener('hashchange', this.route.bind(this));
  }

  route(e: any) {
    e.preventDefault();
    sendEvent('route', { url: window.location.pathname });


    // @ts-ignore
    const component = ROUTES[window.location.pathname] || notFoundComp;

    component.attach(this.$appRoot);
    component.render();
  }
}
