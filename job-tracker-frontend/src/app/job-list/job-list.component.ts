import { Component, OnInit } from '@angular/core';
import { JobApplication } from '../jobApplication';
import { JobApplicationService } from '../jobApplication.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, ReactiveFormsModule],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent implements OnInit{
  jobApplication: JobApplication[] = [];

  JobIdForEdit: number = 0;

  constructor(private jobService: JobApplicationService,
              private router: Router
              ) {}

  editForm = new FormGroup({
    job_title: new FormControl('', Validators.required),
    company_name: new FormControl('', Validators.required),
    application_date: new FormControl('', Validators.required),
    status: new FormControl('APPLIED', Validators.required),
    notes: new FormControl(''),
  });

  ngOnInit(): void {   //To show all job application in the table
    this.jobService.getAllJobApplication().subscribe(
      (jobs) => this.jobApplication = jobs,
      (error) => console.error("Error Fetching jobs:", error)
    );
  }

  deleteJob(job_id: number): void {
    if (confirm('Are you sure you want to delete this?')) {
      this.jobService.deleteJobApplication(job_id).subscribe({
        next: () => {
          this.jobApplication = this.jobApplication.filter(job => job.id !== job_id);
        },
        error: (err) => console.error("Failed to delete:", err)
      });
    }
  }

  navigateToAddJob(): void{
    this.router.navigate(['/add-job']);
  }

  //editJob function will run once the edit button has been click, it made all the field editable
  editJob(job: JobApplication): void{
    this.JobIdForEdit = job.id;
    this.editForm.patchValue({
      job_title: job.job_title,
      company_name: job.company_name,
      application_date: job.application_date,
      status: job.status,
      notes: job.notes,
    });
  }

  saveEdit(): void{
    if (this.editForm.valid && this.JobIdForEdit) {
      // updatedJob will save all the new added data as the new JobApplication
      const updatedJob = {
        id: this.JobIdForEdit,
        ...this.editForm.value
        // either use ...this.editForm.value or:
        // job_title: this.editForm.get('job_title')?.value,
        // company_name: this.editForm.get('company_name')?.value,
        // application_date: this.editForm.get('application_date')?.value,
        // status: this.editForm.get('status')?.value,
        // notes: this.editForm.get('notes')?.value,
      } as JobApplication;

      // Send updatedJob to backend
      this.jobService.updateJobApplication(updatedJob).subscribe({
        next: (savedJob) => {
          // Update the data in UI
          const index = this.jobApplication.findIndex(j => j.id === savedJob.id);
          if (index !== -1) {
            this.jobApplication[index] = savedJob
          };
          this.cancelEdit();
        },
        error: (err) => console.error("Updated Failed", err)
      });
    }
  }

  cancelEdit(): void{
    this.JobIdForEdit = 0;
    this.editForm.reset();
  }


}
