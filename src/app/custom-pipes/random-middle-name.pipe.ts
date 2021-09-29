import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'randomMiddleName'
})
export class RandomMiddleNamePipe implements PipeTransform {

  GOLFNAMES = [
    '\"Miniature\"',
    '\"Tall\"',
    '\"Bad Golf Player\"',
    '\"Pro\"',
    '\"Green\"',
    '\"T\"',
    '\"Rebel\"',
    '\"Par\"',
    '\"Hole-In-One\"',
    '\"Double Bogey\"',
    '\"Lowest Score\"',
    '\"Never\"',
    '\"Bird Like\"'
  ]

  transform(value: string): string {
    const nameArr = value.split(' ');
    const nickName = this.GOLFNAMES[Math.floor(Math.random()*this.GOLFNAMES.length)];
    const newName = [nameArr[0], nickName, nameArr[1]].join(' ');
    return newName;
  }

}
