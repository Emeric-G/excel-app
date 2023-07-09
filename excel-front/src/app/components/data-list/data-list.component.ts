import { Component } from '@angular/core';
import * as xlsx from 'xlsx';
import { ColDef } from 'ag-grid-community';
import { ApiCallService } from 'src/app/services/api-call.service';
import { of, map, catchError } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent {

  public dataRow: Array<any> = [];
  public colDef: ColDef[] = [];
  public nameFile: string = "";
  public files: Array<any> = [];
  public idCurrentData: string = "";
  public isLoading: boolean = false;

  constructor(private apiCallService: ApiCallService, private router: Router) {}

  ngOnInit()
  {
    this.refreshFileList();
  }

  fileUpload(event: any){
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    this.nameFile = selectedFile.name;
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event: any) => {
      this.colDef = [];
      this.isLoading = true;
      console.log(event);
      let binaryData = event.target.result;
      let workbook = xlsx.read(binaryData, {type: 'binary'});
      workbook.SheetNames.forEach((sheet:any) => {
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);
        this.dataRow = data;
        Object.keys(this.dataRow[0]).forEach((key: string) => {
          this.colDef = [...this.colDef, {field: key, editable: true}];
        })
      })
      this.apiCallService.createExcelInfos(this.nameFile, this.dataRow, this.colDef).subscribe({
        next: (response: any) => {
          this.idCurrentData = response.id;
          this.refreshFileList();
        },
        error: err => {
          this.router.navigate(['/login'])
        }
      })
    }
  }

  loadExcelData(id: string){
    this.isLoading = true;
    this.idCurrentData = id;
    this.isLoading = true;
    this.apiCallService.getExcelInfos(id).subscribe({
      next: (response: any) => {
        this.colDef = response.fields;
        this.dataRow = response.data;
        this.isLoading = false;
      },
      error: err => {
        this.router.navigate(['/login'])
      }
    })
  }

  clickInputFile(){
    document.getElementById('file-input')?.click();
  }

  saveData(){
    this.isLoading = true;
    this.apiCallService.updateExcelInfos(this.idCurrentData, this.dataRow).subscribe({
      next: response => {
        console.log(response);
        this.isLoading = false;
      },
      error: err => {
        this.router.navigate(['/login'])
      }
    })
  }

  deleteData(id: string){
    this.isLoading = true;
    if(id === this.idCurrentData){
      this.colDef = [];
      this.dataRow = [];
    }
    this.apiCallService.deleteExcelInfos(id).subscribe({
      next: response => {
        this.refreshFileList();
      },
      error: err => {
        this.router.navigate(['/login'])
      }
    })
  }

  refreshFileList(){
    let userId = sessionStorage.getItem('id');
    this.files = [];
    if(typeof userId === 'string'){
      this.isLoading = true;
      this.apiCallService.getUserInfos(userId).subscribe({
        next: (response: any) => {
          response.excelDatas.forEach((item: any) => {
            this.files = [...this.files, { name: item.name, id: item.id } ];
          })
          this.isLoading = false;
        },
        error: err => {
          this.router.navigate(['/login'])
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
