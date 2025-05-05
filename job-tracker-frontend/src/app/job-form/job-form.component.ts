import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { JobApplication } from '../jobApplication';
import { JobApplicationService } from '../jobApplication.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './job-form.component.html',
  styleUrl: './job-form.component.css'
})
export class JobFormComponent {
  constructor(private router: Router, private jobService: JobApplicationService) {}

  applyForm = new FormGroup({
    job_title: new FormControl('', Validators.required),
    company_name: new FormControl('', Validators.required),
    application_date: new FormControl('', Validators.required),
    status: new FormControl('APPLIED', Validators.required),
    notes: new FormControl(''),
  });

  submitApplication() {   // Once the button is clicked, submit the data to backend
    if (this.applyForm.valid) {
      const formData = this.applyForm.value as JobApplication;

      this.jobService.addJobApplication(formData).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error("Submition failed:", err);
          alert("Failed to submit job application");
        }
      });
    }
  }

  BackToList(): void {    //navigate back to job list page
    this.router.navigate(['/']);
  }
}
