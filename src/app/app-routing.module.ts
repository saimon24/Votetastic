import { VotingComponent } from './voting/voting.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'app',
    loadChildren: () =>
      import('./inside/inside.module').then((m) => m.InsideModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'voting/:id',
    component: VotingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
