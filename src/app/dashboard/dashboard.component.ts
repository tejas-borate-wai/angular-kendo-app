import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LeadManagementNavbarComponent } from '../lead-management-navbar/lead-management-navbar.component';
import { LeadManagementComponent } from '../lead-management/lead-management.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterOutlet,
    CommonModule,
    NavbarComponent,
    LeadManagementNavbarComponent,
    LeadManagementComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
