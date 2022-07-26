import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private resourceData: any = {
    columnInfo:
      [{ columnName: 'resource code', id: 21, type: null, formula: null },
      { columnName: 'resource name', id: 20, type: null, formula: null },
      { columnName: 'resource code', id: 21, type: null, formula: null },
      { columnName: 'resource name', id: 20, type: null, formula: null }],
    tableDetail: [{ resourceId: 22, content: { 21: '050000', 20: 'Metals' } },
    { resourceId: 23, content: { 21: "040000", 20: "Masonry" } }]
  };

  private data: any = {}

  constructor() {

  }

  uniqueColumnInfo(col: any[]) {
    const uniqueIds = new Set();

    return col.filter(c => {
      const isDuplicate = uniqueIds.has(c.id);

      uniqueIds.add(c.id);

      if (!isDuplicate) {
        return true;
      }

      return false
    })
  }

  getData() {
    this.resourceData.columnInfo = this.uniqueColumnInfo(this.resourceData.columnInfo)
    return this.resourceData;
  }


}
