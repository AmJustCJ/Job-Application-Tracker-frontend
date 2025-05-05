import { Routes } from '@angular/router';
import { JobListComponent } from './job-list/job-list.component';
import { JobFormComponent } from './job-form/job-form.component';
import { JobEditComponent } from './job-edit/job-edit.component';

export const routes: Routes = [
    {path: '', component: JobListComponent},
    {path: 'add-job', component: JobFormComponent}
];

//C:\Users\jiunc\OneDrive\Desktop\Angular\job-tracker-frontend