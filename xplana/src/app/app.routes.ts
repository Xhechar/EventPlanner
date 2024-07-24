import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AttendeeComponent } from './components/attendee/attendee.component';
import { ManagerComponent } from './components/manager/manager.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProfileComponent } from './components/attendee/profile/profile.component';
import { BookingComponent } from './components/attendee/booking/booking.component';
import { EventsComponent } from './components/attendee/events/events.component';
import { NotificationsComponent } from './components/attendee/notifications/notifications.component';
import { SingleComponent } from './components/single/single.component';
import { MattendeesComponent } from './components/manager/mattendees/mattendees.component';
import { MdashboardComponent } from './components/manager/mdashboard/mdashboard.component';
import { MeventsComponent } from './components/manager/mevents/mevents.component';
import { MneweventsComponent } from './components/manager/mnewevents/mnewevents.component';
import { MnotificationsComponent } from './components/manager/mnotifications/mnotifications.component';
import { MprofileComponent } from './components/manager/mprofile/mprofile.component';
import { AnalyticsComponent } from './components/admin/analytics/analytics.component';
import { AprofileComponent } from './components/admin/aprofile/aprofile.component';
import { CreatedeventsComponent } from './components/admin/createdevents/createdevents.component';
import { PendingeventsComponent } from './components/admin/pendingevents/pendingevents.component';
import { RegusersComponent } from './components/admin/regusers/regusers.component';
import { RolesComponent } from './components/admin/roles/roles.component';
import { AdashboardComponent } from './components/admin/adashboard/adashboard.component';
import { AnotificationsComponent } from './components/admin/anotifications/anotifications.component';
import { ManagersComponent } from './components/admin/managers/managers.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EventformComponent } from './components/eventform/eventform.component';
import { MdashboardSingleEventComponent } from './components/mdashboard-single-event/mdashboard-single-event.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', pathMatch: 'full', redirectTo: '' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path:'event-form', component: EventformComponent},
  {
    path: 'attendee',
    component: AttendeeComponent, children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'booking', component: BookingComponent },
      {path: 'single-event/:event_id', component: SingleComponent},
      {
        path: 'events', component: EventsComponent, children: [
        {path: ':event_id', component: SingleComponent}
      ] },
      {path: 'notifications', component: NotificationsComponent}
    ]
  },
  {
    path: 'manager', component: ManagerComponent, children: [
      { path: 'm-attendees', component: MattendeesComponent },
      { path: 'm-dashboard', component: MdashboardComponent },
      { path: 'm-events', component: MeventsComponent },
      { path: 'm-new-events', component: MneweventsComponent },
      { path: 'm-notifications', component: MnotificationsComponent },
      { path: 'm-profile', component: MprofileComponent },
      {path: 'single-event-stats/:event_id', component: MdashboardSingleEventComponent},
      {path: 'm-single-event/:event_id', component: SingleComponent}
  ]},
  {
    path: 'admin', component: AdminComponent, children: [
    {path: 'analytics', component: AnalyticsComponent},
      { path: 'a-profile', component: AprofileComponent },
      { path: 'created-events', component: CreatedeventsComponent },
      { path: 'managers', component: ManagersComponent },
      { path: 'pending-events', component: PendingeventsComponent },
      { path: 'registered-users', component: RegusersComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'a-dashboard', component: AdashboardComponent },
    {path: 'a-notifications', component: AnotificationsComponent}
  ]},
];
