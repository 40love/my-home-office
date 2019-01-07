import { HistoryComponent } from './dashboard/history/history.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './login/auth.guard';
import { RequestHolidayComponent } from './dashboard/request-holiday/request-holiday.component';
import { ApproveHolidayComponent } from './dashboard/approve-holiday/approve-holiday.component';

const appRoutes: Routes = [
    // default path redirects you to login page
    {
        path: '',
        component: LoginComponent
    },
    // dashboard path (after you login)
    {
        path: 'dashboard',
        component: DashboardComponent,
        // can activate only if AuthGuard canActivate method is returning true
        canActivate: [AuthGuard],
        children: [
            // more views on dashboard page
            {
                path: 'request',
                component: RequestHolidayComponent
            },
            {
                path: 'approve',
                component: ApproveHolidayComponent
            },
            {
                path: 'history',
                component: HistoryComponent
            }
        ]
    }
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);