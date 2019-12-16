import {Injectable} from '@angular/core';
// @ts-ignore
import dataSeries from './series.json';

@Injectable()
export class SerialService {
  private seriesList;
  private sortObj;
  private series:any = dataSeries;

  constructor(){
    this.series.forEach(value => value.premiere = new Date(value.premiere));
  }

    getCompanies(paginationParam, series) {
      const seriesList = series || this.series;

      const start = (paginationParam.p-1)*paginationParam.items;
      const end = start + +paginationParam.items;

      return  {
        items: seriesList.slice(start, end),
        total: seriesList.length
      };
    }

    getPremiereYear() {
      return this.series.filter((series, item, seriesList) =>
        seriesList.findIndex(x =>
          (x.premiere.getFullYear() === series.premiere.getFullYear())) === item).map(series => series.premiere);
    }

    getGenre() {
      return this.series.map( ser => ser.genre).reduce((a, b) => a.concat(b.filter(i=>a.indexOf(i)===-1)), []);
    }

    sortData(sort, paginationParams) {
      this.sortObj = sort;
      this.seriesList = this.seriesList || this.series;

      if (!this.sortObj.active || this.sortObj.direction === '') {
        return this.getCompanies(paginationParams, this.seriesList);
      }

      this.seriesList = this.seriesList.sort((a, b) => {
        switch (this.sortObj.active) {
          case 'name-top': return this.compare(a.name, b.name, true);
          case 'name-bottom': return this.compare(a.name, b.name, false);
          case 'premiere-top': return this.compare(a.premiere, b.premiere, true);
          case 'premiere-bottom': return this.compare(a.premiere, b.premiere, false);
          default: return 0;
        }
      });

      return this.getCompanies(paginationParams, this.seriesList);
    }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  filterList(nameValue, nameGenre, nameYear, paginationParams) {
    this.seriesList = this.series;

    if (nameValue) {
      this.seriesList = this.seriesList.filter(val => {
        return val.name.toLocaleLowerCase().includes(nameValue);
      });
    }

    if (nameGenre) {
      this.seriesList = this.seriesList.filter(val => {
        return val.genre.some(val => val === nameGenre);
      });
    }

    if (nameYear) {
      this.seriesList = this.seriesList.filter(val =>
        val.premiere.getFullYear() == nameYear
      );
    }

    if (!nameValue && !nameGenre && !nameYear) {
      return this.getCompanies(paginationParams, undefined);
    } else if(this.sortObj) {
      return this.sortData(this.sortObj, paginationParams);
    } else {
      return this.getCompanies(paginationParams, this.seriesList);
    }
  }
}
