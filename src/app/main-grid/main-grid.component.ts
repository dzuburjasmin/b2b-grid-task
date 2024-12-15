import { Component, Inject, OnInit } from '@angular/core';
import { HttpLayerService } from '../services/http-layer.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-main-grid',
  templateUrl: './main-grid.component.html',
  styleUrls: ['./main-grid.component.css']
})
export class MainGridComponent implements OnInit {

  constructor(@Inject(HttpLayerService) public http: HttpLayerService) { }
  gridData: string[][]=[];
  filteredGridData: string[][]=[];
  gridColumns:  string[]=[];
  hiddenColumns: string[] = [];
  querySubject = new Subject<string>();

  ngOnInit(): void {
    this.getDataFromApi();
    this.querySubject
    .subscribe((word) => {
      debugger
      if (word.length>=3){
        this.filteredGridData = this.gridData.filter((item: string[]) =>
          Object.values(item)
            .join(' ')
            .toLowerCase()
            .includes(word.toLowerCase())
        );
      }else{
        this.filteredGridData = this.gridData;
      }
    });
  }


  addCol(column: string){
    if (!this.gridColumns.includes(column)) {
      this.gridColumns.push(column);
      this.hiddenColumns = this.hiddenColumns.filter(col=>col!==column)
    }
  }

  removeCol(column: string){
    if (!this.hiddenColumns.includes(column)) {
      this.hiddenColumns.push(column);
      this.gridColumns = this.gridColumns.filter(col =>col !== column);
    }
  }

  onChangeSearch(e: any){
    setTimeout(()=>{
      this.querySubject.next(e.target.value);
    },1000)
  }

  getDataFromApi(){
    this.http.getData("kolone").subscribe(
      data=>{
        this.gridColumns = data.slice(0,5);
        this.hiddenColumns = data.slice (5,8)
      },error=>{
        console.log(error);
      }
    );
    this.http.getData("sifre").subscribe(
      data=>{
        this.gridData = data;
        this.filteredGridData = [...this.gridData];
      },error=>{
        console.log(error);
      }
    );
  }
}
