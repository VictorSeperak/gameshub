//Respuesta 1: import { Juego } from '../../interfaces/juego.interface';
//Respuesta 2: src/app/components/lista-juegos/lista-juegos.component.ts
//Respuesta 3: en el main
//Respuesta 4: Porque estamos usando Standalone
//Respuesta 5: Porque nos ayuda a mantener filtros, sesiones, configuraciones o cualquier tipo de estado compartido en toda la app.


import { Component, OnInit } from '@angular/core';
import { JuegosDataService } from '../../services/juegos-data.service';
import { Juego } from '../../interfaces/juego.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  totalJuegos = 0;
  juegosGratis = 0;
  juegosDePago = 0;
  juegoConMejorRating?: Juego;
  promedioPrecios = 0;

  constructor(private juegosDataService: JuegosDataService) {}

  ngOnInit(): void {
    this.juegosDataService.obtenerJuegos().subscribe(juegos => {
      this.totalJuegos = juegos.length;
      this.juegosGratis = juegos.filter(j => j.esGratis).length;
      this.juegosDePago = juegos.filter(j => !j.esGratis).length;
      this.juegoConMejorRating = juegos.reduce((max, actual) =>
        actual.rating > max.rating ? actual : max
      );
      const precios = juegos.filter(j => !j.esGratis).map(j => j.precio);
      this.promedioPrecios = precios.length > 0
        ? precios.reduce((acc, precio) => acc + precio, 0) / precios.length
        : 0;
    });
  }
}
