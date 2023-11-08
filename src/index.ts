import './icons';
import Router from './router';
import { cartService } from './services/cart.service';
import { userService } from './services/user.service';

window.userId = localStorage.getItem('userId') || 'defaultId';
new Router();
cartService.init();
userService.init();

setTimeout(() => {
  document.body.classList.add('is__ready');
}, 250);
