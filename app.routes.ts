import { Routes } from '@angular/router';
import {RegisterPageComponent} from './register-page/register-page.component';
import {AboutPageComponent} from './about-page/about-page.component';
import {HomePageComponent} from './home-page/home-page.component';
import {ShopPageComponent} from './shop-page/shop-page.component';
import {CartPageComponent} from './cart-page/cart-page.component';

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterPageComponent
  },
  {
    path: 'about',
    component: AboutPageComponent
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'shop',
    component: ShopPageComponent
  },
  {
    path: 'cart',
    component: CartPageComponent
  }
];
