import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {RouterModule,Routes} from '@angular/router'
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';

const appRoutes  :Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [BrowserModule, FormsModule,
   RouterModule.forRoot(appRoutes),
   HttpClientModule,
  ],
  declarations: [AppComponent, HelloComponent, LoginComponent, DashboardComponent],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule {}
