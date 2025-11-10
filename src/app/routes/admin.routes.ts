import {Routes} from '@angular/router';
import {AdminHomeComponent} from '../users/admin/admin-home.component';
import {DashboardComponent} from '../users/admin/dashboard/dashboard.component';
import {IncidentsComponent} from '../users/admin/incidents/incidents.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminHomeComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard',
      },
      {
        path: 'incidents/:origin',
        component: IncidentsComponent,
        title: 'Incidents',
      },
    ]
  }
];
