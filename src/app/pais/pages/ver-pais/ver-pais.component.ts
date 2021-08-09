import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [],
})
export class VerPaisComponent implements OnInit {
  pais!: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
  ) {}

  ngOnInit(): void {
    //params son los parametros indicadas en la route en app module
    // this.activatedRoute.params.subscribe(({ id }) => {
    //   console.log(id);

    //   this.paisService.getPaisPorAlpha(id).subscribe((pais) => {
    //     console.log(pais);
    //   });
    // });

    //usando algo de rxjs
    this.activatedRoute.params
      .pipe(
        //aca dentro especificamos cualquier cant de operadores que van a trabajar con el producto de este observable
        switchMap((param) => this.paisService.getPaisPorAlpha(param.id)), //retornamos otro observable
        tap(console.log)
      )
      .subscribe((pais) => {
        this.pais = pais;
      });
  }
}
