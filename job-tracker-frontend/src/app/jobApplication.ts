export interface JobApplication{
    id: number;
    job_title: string;
    company_name: string;
    application_date: string;
    status: string;
    notes?: string;
}