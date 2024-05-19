import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard'


const routes: Routes = [
    {
        path: 'main',
        loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule),
    }, 
    {
        path: '',
        redirectTo: '/main',
        pathMatch: 'full'
    },
    { 
        path: 'login', 
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) 
    },
    { 
        path: 'signup', 
        loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule) 
    },
    {
        path: 'cart',
        loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule),
        
    },
    {
        path: 'account',
        loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule),
        
    },{
        path: 'orders',
        loadChildren: () =>
          import('./pages/orders/orders.module').then((m) => m.OrdersModule),
        canActivate: [AuthGuard],
      },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }