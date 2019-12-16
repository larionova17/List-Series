import {Component, OnInit} from '@angular/core';
import {SerialService} from '../series.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Sort} from '@angular/material/sort';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-table-series',
  templateUrl: './table-series.component.html',
  styleUrls: ['./table-series.component.less']
})
export class TableSeriesComponent implements OnInit {
  public p: number | string = 1;
  private items: number | string = 5;
  public itemsNum: string[] = ['5', '10', '25'];
  private savedParam: any;
  public paginationParams: object = {p: this.p, items: this.items};
  public seriesItems;
  public activeItem: string | number;
  formSeries = new FormGroup({
    search: new FormControl(''),
    genre: new FormControl('Genre'),
    year: new FormControl('Premiere Year')
  });
  public genreList: string[];
  public yearsList: string[];
  private nameValue: string;
  private nameGenre: string;
  private nameYear: string;

  constructor(private serialService: SerialService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.yearsList = this.serialService.getPremiereYear();
    this.genreList = this.serialService.getGenre();
    this.checkPaginationParams();
  }

  changeItemsPerPage(item) {
    this.activeItem = item;
    this.paginationParams = {p: this.p, items: item};
    this.items = item || this.items;
    this.getPage(this.paginationParams);
    localStorage.setItem('parametersSeriesPagination', JSON.stringify({items: item, p: this.p}));
    this.router.navigate(['/series', {items: this.items, p: this.p}]);
  }

  checkPaginationParams() {
    if (JSON.parse(localStorage.getItem('parametersSeriesPagination')) === null) {
      this.setPaginationParams();
    } else {
      this.savedParam = JSON.parse(localStorage.getItem('parametersSeriesPagination'));
      this.items = this.savedParam.items;
      this.activeItem = this.savedParam.items;
      this.paginationParams = {p: this.savedParam.p, items: this.savedParam.items};
      this.getPage(this.paginationParams);
    }
  }

  setPaginationParams() {
    this.activeItem = this.route.snapshot.paramMap.get('items') || this.items;
    this.items = this.route.snapshot.paramMap.get('items') || this.items;
    this.p = this.route.snapshot.paramMap.get('p') || this.p;
    this.paginationParams = {p: this.p, items: this.items};
    this.getPage(this.paginationParams);
  }

  getPage(paginationParams) {
    this.seriesItems = this.serialService.filterList(this.nameValue, this.nameGenre, this.nameYear, paginationParams);
  }

  pageChanged($event: number) {
    this.paginationParams = {p: $event, items: this.items};
    this.getPage(this.paginationParams);
    localStorage.setItem('parametersSeriesPagination', JSON.stringify({p: $event, items: this.items}));
    this.router.navigate(['/series', {items: this.items, p: $event}]);
  }

  sortData(sort: Sort) {
    this.seriesItems = this.serialService.sortData(sort, this.paginationParams);
  }

  nameFilter(event) {
    this.nameValue =  event;
    this.seriesItems  = this.serialService.filterList(this.nameValue, this.nameGenre, this.nameYear, this.paginationParams);
  }

  genreFilter(event) {
    this.nameGenre = event;
    if (this.nameGenre === 'Genre') {
      this.nameGenre = null;
    }
    this.seriesItems  = this.serialService.filterList(this.nameValue, this.nameGenre, this.nameYear, this.paginationParams);
  }

  yearFilter(event) {
    this.nameYear = event;
    if (this.nameYear === 'Premiere Year') {
      this.nameYear = null;
    }
    this.seriesItems  = this.serialService.filterList(this.nameValue, this.nameGenre, this.nameYear, this.paginationParams);
  }
}
