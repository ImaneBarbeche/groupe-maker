import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Liste } from '../../models/liste.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-groupes-config',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './groupes-config.component.html',
  styleUrls: ['./groupes-config.component.css']
})
export class GroupesConfigComponent {
  @Input() listes: Liste[] = [];
  @Input() listeSelectionnee: Liste | null = null;

  @Input() nombreDeGroupes: number | null = null;
  @Input() equilibrerFrancais: boolean = false;
  @Input() equilibrerTechnique: boolean = false;
  @Input() mixDWWM: boolean = false;
  @Input() equilibrerProfil: boolean = false;

  @Output() listeChange = new EventEmitter<Liste>();
  @Output() configChange = new EventEmitter<any>();
  @Output() lancerGeneration = new EventEmitter<void>();

  onListeChange(liste: Liste) {
    this.listeChange.emit(liste);
  }

  onConfigChange() {
    this.configChange.emit({
      nombreDeGroupes: this.nombreDeGroupes,
      equilibrerFrancais: this.equilibrerFrancais,
      equilibrerTechnique: this.equilibrerTechnique,
      mixDWWM: this.mixDWWM,
      equilibrerProfil: this.equilibrerProfil
    });
  }

  onLancer() {
    this.onConfigChange(); // emit avant de lancer
    this.lancerGeneration.emit();
  }
}
