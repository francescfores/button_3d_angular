import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button3dComponent } from 'button3d';  // Asegúrate de importar el módulo de la biblioteca
// import { Button3dComponent } from '../../../projects/button3d/src/lib/button3d.component';  // Asegúrate de importar el módulo de la biblioteca

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Button3dComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-app';
  loading=false;

  loading_call() {
    this.loading=true;

    setTimeout(() => {
      this.loading = false;
    }, 600);
  }
}
