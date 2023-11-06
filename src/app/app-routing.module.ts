import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'update-password',
    loadChildren: () => import('./pages/update-password/update-password.module').then( m => m.UpdatePasswordPageModule)
  },
  {
    path: 'profile-edit',
    loadChildren: () => import('./pages/profile-edit/profile-edit.module').then( m => m.ProfileEditPageModule)
  },
  {
    path: 'create-company',
    loadChildren: () => import('./pages/create-company/create-company.module').then( m => m.CreateCompanyPageModule)
  },
  {
    path: 'create-supervisors',
    loadChildren: () => import('./pages/create-supervisors/create-supervisors.module').then( m => m.CreateSupervisorsPageModule)
  },
  {
    path: 'work-schedule',
    loadChildren: () => import('./pages/RBT/work-schedule/work-schedule.module').then( m => m.WorkSchedulePageModule)
  },
  {
    path: 'work-schedule-create',
    loadChildren: () => import('./pages/RBT/work-schedule-create/work-schedule-create.module').then( m => m.WorkScheduleCreatePageModule)
  },
  {
    path: 'work-schedule-details',
    loadChildren: () => import('./pages/RBT/work-schedule-details/work-schedule-details.module').then( m => m.WorkScheduleDetailsPageModule)
  },
  {
    path: 'task-tracker',
    loadChildren: () => import('./pages/RBT/task-tracker/task-tracker.module').then( m => m.TaskTrackerPageModule)
  },
  {
    path: 'bcba-calendar',
    loadChildren: () => import('./pages/bcba-calendar/bcba-calendar.module').then( m => m.BcbaCalendarPageModule)
  },
  {
    path: 'bcba-calendar-modal',
    loadChildren: () => import('./pages/bcba-calendar-modal/bcba-calendar-modal.module').then( m => m.BcbaCalendarModalPageModule)
  },
  {
    path: 'bcba-calendar-modal-details',
    loadChildren: () => import('./pages/bcba-calendar-modal-details/bcba-calendar-modal-details.module').then( m => m.BcbaCalendarModalDetailsPageModule)
  },
  {
    path: 'supervisorlog',
    loadChildren: () => import('./pages/supervisorlog/supervisorlog.module').then( m => m.SupervisorlogPageModule)
  },
  {
    path: 'supervision-request',
    loadChildren: () => import('./pages/RBT/supervision-request/supervision-request.module').then( m => m.SupervisionRequestPageModule)
  },
  {
    path: 'supervision-request-details',
    loadChildren: () => import('./pages/RBT/supervision-request-details/supervision-request-details.module').then( m => m.SupervisionRequestDetailsPageModule)
  },
  {
    path: 'supervision-request-create',
    loadChildren: () => import('./pages/RBT/supervision-request-create/supervision-request-create.module').then( m => m.SupervisionRequestCreatePageModule)
  },
  {
    path: 'check-version',
    loadChildren: () => import('./pages/check-version/check-version.module').then( m => m.CheckVersionPageModule)
  },
  {
    path: 'attach-company',
    loadChildren: () => import('./pages/attach-company/attach-company.module').then( m => m.AttachCompanyPageModule)
  },
  {
    path: 'attach-supervisor',
    loadChildren: () => import('./pages/attach-supervisor/attach-supervisor.module').then( m => m.AttachSupervisorPageModule)
  },
  {
    path: 'signature-upload',
    loadChildren: () => import('./pages/signature-upload/signature-upload.module').then( m => m.SignatureUploadPageModule)
  },  {
    path: 'notification',
    loadChildren: () => import('./pages/notification/notification.module').then( m => m.NotificationPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
