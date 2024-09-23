import { Component, OnDestroy, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  filter,
  from,
  fromEvent,
  map,
  of,
  Subscription,
  take,
  tap,
  timer,
  range,
  delay,
  concatMap,
  mergeMap,
  switchMap
} from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1>Hello from {{ name }}!</h1>
    <a target="_blank" href="https://angular.dev/overview">
      Learn more about Angular
    </a>
  `,
})
export class App implements OnInit, OnDestroy {
  name = 'Angular';
  sub!: Subscription;
  subArray!: Subscription;
  subFrom!: Subscription;
  subStrings!: Subscription;
  subEvent!: Subscription;
  subKey!: Subscription;

  subApples!: Subscription;
  subMapMulitplication!: Subscription;
  subFilter!: Subscription;
  subTimer!: Subscription;

  ngOnInit(): void {
    this.sub = of(2, 4, 6, 8).subscribe((item) =>
      console.log('Value from of: ', item)
    );
    this.subArray = of([2, 4, 6, 8]).subscribe((item) =>
      console.log('Value from of array: ', item)
    );
    this.subFrom = from([2, 4, 6, 8]).subscribe({
      next: (item) => console.log('From item: ', item),
      error: (error) => console.log('From error: ', error),
      complete: () => console.log('From complete'),
    });
    this.subStrings = of('Apple1', 'Apple2', 'Apple3').subscribe({
      next: (apple) => console.log('Apple emitted: ', apple),
      error: (error) => console.log('Error occured: ', error),
      complete: () => console.log('No more apples'),
    });
    this.subEvent = fromEvent(document, 'click').subscribe({
      next: (event) => console.log('Click event: ', event),
      error: (error) => console.log('Error occured: ', error),
      complete: () => console.log('No more events'),
    });

    const keys: string[] = [];

    this.subKey = fromEvent(document, 'keydown').subscribe((ev) => {
      keys.push((ev as KeyboardEvent).key);
      console.log('Key event: ', (ev as KeyboardEvent).key);
    });

    const apples$ = from([
      {
        id: 1,
        type: 'macintosh',
      },
      {
        id: 2,
        type: 'gala',
      },
      {
        id: 3,

        type: 'fuji',
      },
    ]);

    this.subApples = apples$
      .pipe(
        map((a) => ({ ...a, color: 'red' })),
        tap((a) => console.log('Apple tap: ', a))
      )
      .subscribe();

    this.subMapMulitplication = of(2, 4, 6)
      .pipe(
        map((item) => item * 2),
        tap((item) => console.log('Map x2: ', item))
      )
      .subscribe();

    this.subFilter = of(2, 3, 6)
      .pipe(
        filter((x) => x % 2 === 0),
        tap((x) => console.log('Even: ', x))
      )
      .subscribe();

    this.subTimer = timer(0, 1000)
      .pipe(take(5))
      .subscribe({
        next: (event) => console.log('Timer: ', event),
        error: (error) => console.log('Timer error occured: ', error),
        complete: () => console.log('No more ticks'),
      });

    range(1, 5)
      .pipe(concatMap((i) => of(i).pipe(delay(this.randomDelay()))))
      .subscribe((v) => console.log('concatMap:', v));

    range(11, 5)
      .pipe(mergeMap((i) => of(i).pipe(delay(this.randomDelay()))))
      .subscribe((v) => console.log('mergeMap:', v));

    range(21, 5)
      .pipe(switchMap((i) => of(i).pipe(delay(this.randomDelay()))))
      .subscribe((v) => console.log('switchMap:', v));
  }

  randomDelay() {
    return Math.floor(Math.random() * 1000) + 500;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.subArray.unsubscribe();
    this.subFrom.unsubscribe();
    this.subStrings.unsubscribe();
    this.subEvent.unsubscribe();
    this.subKey.unsubscribe();
    this.subApples.unsubscribe();
    this.subMapMulitplication.unsubscribe();
    this.subFilter.unsubscribe();
    this.subTimer.unsubscribe();
  }
}

bootstrapApplication(App);
