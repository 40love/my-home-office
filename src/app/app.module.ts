import { AngularFireDatabaseModule } from 'angularfire2/database';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { appRouting } from './app.router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './login/auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AuthGuard } from './login/auth.guard';
import { DashboardService } from './dashboard/dashboard.service';
import { RequestHolidayComponent } from './dashboard/request-holiday/request-holiday.component';
import { ApproveHolidayComponent } from './dashboard/approve-holiday/approve-holiday.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HistoryComponent } from './dashboard/history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RequestHolidayComponent,
    ApproveHolidayComponent,
    HistoryComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    appRouting,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgbModule
  ],
  providers: [AuthService, AuthGuard, DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
