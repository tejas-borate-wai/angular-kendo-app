import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IconsModule, KENDO_ICONS } from '@progress/kendo-angular-icons';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    DashboardComponent,
    IconsModule,
    ButtonsModule,
    KENDO_ICONS,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-kendo-app';
}
