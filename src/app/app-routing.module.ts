import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessengerPageComponent } from './messenger-page/messenger-page.component';

const routes: Routes = [{ path: 'm/:id', component: MessengerPageComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
