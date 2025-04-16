import { NgIf, NgForOf } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { LeadService, Lead } from '../services/lead.service';
import Swal from 'sweetalert2';
import {
  ExcelExportModule,
  WorkbookOptions,
} from '@progress/kendo-angular-excel-export';

@Component({
  selector: 'app-lead-management',
  standalone: true,
  imports: [
    GridModule,
    DropDownsModule,
    ButtonsModule,
    FormsModule,
    NgIf,
    NgForOf,
    ExcelExportModule,
  ],
  templateUrl: './lead-management.component.html',
  styleUrls: ['./lead-management.component.css'],
})
export class LeadManagementComponent implements OnInit {
  constructor(private leadService: LeadService) {}

  // Add a flag to track if we're creating a new record
  public isCreatingNewRecord: boolean = false;

  public originalData: Lead[] = [];
  public gridView: Lead[] = [];
  public pageSize = 6;
  public skip = 0;
  public statusOptions: string[] = ['Active', 'Pending', 'Inactive'];
  public priorityOptions: string[] = ['High', 'Medium', 'Low'];
  public searchKeyword: string = '';
  public editedItem: any = null;

  @ViewChild('excelExport', { static: false }) excelExport: any;

  ngOnInit(): void {
    this.fetchLeads();
  }

  fetchLeads(): void {
    this.leadService.getLeads().subscribe((data) => {
      this.originalData = data;
      this.gridView = [...this.originalData];
    });
  }

  exportToExcel(): void {
    const options: WorkbookOptions = {
      sheets: [
        {
          name: 'Leads',
          rows: [
            {
              cells: Object.keys(this.originalData[0] || {}).map((key) => ({
                value: key,
                bold: true,
              })),
            },
            ...this.originalData.map((item) => ({
              cells: Object.values(item).map((value) => ({ value })),
            })),
          ],
        },
      ],
    };

    this.excelExport.save(options);
  }

  pageChange(event: any): void {
    this.skip = event.skip;
    this.pageSize = event.take;
  }

  onSearch(): void {
    const keyword = this.searchKeyword.trim().toLowerCase();
    if (!keyword) {
      this.gridView = [...this.originalData];
    } else {
      this.gridView = this.originalData.filter((item) =>
        Object.values(item).some(
          (val) =>
            typeof val === 'string' && val.toLowerCase().includes(keyword)
        )
      );
    }
    this.skip = 0;
  }

  onDelete(dataItem: Lead): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.leadService.deleteLead(dataItem.id).subscribe(() => {
          this.originalData = this.originalData.filter(
            (item) => item.id !== dataItem.id
          );
          this.gridView = [...this.originalData];
          Swal.fire('Deleted!', 'The record has been deleted.', 'success');
        });
      }
    });
  }

  editHandler(dataItem: Lead): void {
    this.editedItem = { ...dataItem };
  }

  // Modify saveHandler to handle both edit and create scenarios
  saveHandler(): void {
    if (!this.editedItem?.id) return; // skip if no ID

    const index = this.originalData.findIndex(
      (item) => item.id === this.editedItem.id
    );

    if (index !== -1) {
      this.leadService.updateLead(this.editedItem).subscribe((updatedLead) => {
        this.originalData[index] = { ...updatedLead };
        this.gridView = [...this.originalData];
        this.editedItem = null;
      });
    }
  }

  cancelHandler(): void {
    this.editedItem = null;
    this.isCreatingNewRecord = false; // Reset flag if canceled
  }

  generateUniqueId(): number {
    return Date.now();
  }

  onCreate(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to create a new record?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, create it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const newRecord: Omit<Lead, 'id'> = {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          lmpId: '',
          appointment: '',
          agency: '',
          status: this.statusOptions[0] || '',
          createdDate: new Date().toISOString().split('T')[0],
          updatedDate: new Date().toISOString().split('T')[0],
          assignedTo: '',
          priority: this.priorityOptions[0] || '',
        };

        this.leadService.createLead(newRecord).subscribe((createdLead) => {
          this.originalData.unshift(createdLead);
          this.gridView = [...this.originalData];
          this.editedItem = { ...createdLead };
        });
      }
    });
  }
}
