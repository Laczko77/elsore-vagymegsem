import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from 'firebase/firestore';

@Pipe({
  name: 'hungarianDate',
})
export class HungarianDatePipe implements PipeTransform {
  transform(timestamp: Timestamp): string {
    const date = timestamp.toDate();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${year}. ${month < 10 ? '0' + month : month}. ${
      day < 10 ? '0' + day : day
    }. ${hours < 10 ? '0' + hours : hours}:${
      minutes < 10 ? '0' + minutes : minutes
    }`;
  }
}
