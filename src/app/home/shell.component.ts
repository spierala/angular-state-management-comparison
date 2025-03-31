import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MenuComponent } from './menu.component';

@Component({
    selector: 'pm-shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MenuComponent, RouterOutlet],
})
export class ShellComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
