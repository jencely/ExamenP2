import { Component, OnInit } from '@angular/core';
import { J } from '../jirafa';
import { JirafaService } from '../jirafa.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  jirafa: J[] = [];

  constructor(private heroService: JirafaService) { }

  ngOnInit() {
    this.getJirafa();
  }

  getJirafa(): void {
    this.jirafaService.getJirafa()
      .subscribe(jirafa => this.heroes = jirafa.slice(1, 5));
  }
}
