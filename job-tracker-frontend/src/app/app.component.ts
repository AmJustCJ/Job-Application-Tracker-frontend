import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JobApplication } from './jobApplication';
import { JobApplicationService } from './jobApplication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { JobListComponent } from "./job-list/job-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JobListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  //title = 'job-tracker-frontend';
  // public jobApplications: JobApplication[] = [];

  // constructor(private jobApplicationsService: JobApplicationService){}

  // ngOnInit() {
  //     this.getAllJobApplication();
  // }

  // public getJobApplication(): void {
  //   this.jobApplicationsService.getAllJobApplication().subscribe(
  //     (response: JobApplication[]) => {
  //       this.jobApplications = response;
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }
}

