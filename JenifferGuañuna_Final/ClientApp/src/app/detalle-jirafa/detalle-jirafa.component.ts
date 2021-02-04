import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { J} from '../jirafa';
import { JirafaService } from '../jirafa.service';

@Component({
  selector: 'app-detalle-jirafa',
  templateUrl: './detalle-jirafa.component.html',
  styleUrls: [ './detalle-jirafa.component.css' ]
})
export class DetalleJirafaComponent implements OnInit {
  jirafa: J;

  constructor(
    private route: ActivatedRoute,
    private jirafaService: JirafaService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getJirafa();
  }

  getJirafa(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.jirafaService.getJirafa(id)
      .subscribe(jirafa => this.jirafa = jirafa);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.jirafaService.updatejirafa(this.jirafa)
      .subscribe(() => this.goBack());
  }
}
