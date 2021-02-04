import { Component, OnInit } from '@angular/core';

import { J} from '../jirafa';
import { JirafaService } from '../jirafa.service';

@Component({
  selector: 'app-jirafa',
  templateUrl: './jirafa.component.html',
  styleUrls: ['./jirafa.component.css']
})
export class JirafaComponent implements OnInit {
  jirafa: J[];

  constructor(private jirafaService: JirafaService) { }

  ngOnInit() {
    this.getJirafa();
  }

  getJirafa(): void {
    this.jirafaService.getJirafa()
      .subscribe(jirafa => this.jirafa = jirafa);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.jirafaService.addJirafa({ name } as J)
      .subscribe(hero => {
        this.jirafa.push(hero);
      });
  }

  delete(hero: J): void {
    this.jirafa = this.jirafa.filter(h => h !== hero);
    this.jirafaService.deleteHero(hero).subscribe();
  }

}
