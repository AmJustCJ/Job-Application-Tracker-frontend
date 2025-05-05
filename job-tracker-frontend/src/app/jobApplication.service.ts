import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { JobApplication } from './jobApplication';
import { environment } from "../environment/environment";

@Injectable({
    providedIn: 'root'
})
export class JobApplicationService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getAllJobApplication(): Observable<JobApplication[]>{
        return this.http.get<JobApplication[]>(`${this.apiServerUrl}/jobApplication/all`);
    }

    public addJobApplication(jobApplication: JobApplication): Observable<JobApplication>{
        return this.http.post<JobApplication>(`${this.apiServerUrl}/jobApplication/add`, jobApplication);
    }

    public updateJobApplication(jobApplication: JobApplication): Observable<JobApplication>{
        return this.http.put<JobApplication>(`${this.apiServerUrl}/jobApplication/update`, jobApplication);
    }

    public deleteJobApplication(jobApplicationId: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/jobApplication/delete/${jobApplicationId}`);
    }
}
