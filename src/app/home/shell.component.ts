import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'pm-shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class ShellComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
