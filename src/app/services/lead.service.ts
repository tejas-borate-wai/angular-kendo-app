import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Lead {
  id: number;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  lmpId: string;
  appointment: string;
  agency: string;
  status: string;
  createdDate: string;
  updatedDate: string;
  assignedTo: string;
  priority: string;
}

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  private apiUrl = 'http://localhost:3000/leads';

  constructor(private http: HttpClient) {}

  getLeads(): Observable<Lead[]> {
    return this.http.get<Lead[]>(this.apiUrl);
  }

  deleteLead(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateLead(lead: Lead): Observable<Lead> {
    return this.http.put<Lead>(`${this.apiUrl}/${lead.id}`, lead);
  }

  createLead(lead: Omit<Lead, 'id'>): Observable<Lead> {
    return this.http.post<Lead>(this.apiUrl, lead);
  }
}
