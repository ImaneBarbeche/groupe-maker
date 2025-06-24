import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Liste } from '../../models/liste.interface';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-groupes-display',
  standalone: true,
  imports: [CommonModule, DragDropModule, FormsModule],
  templateUrl: './groupes-display.component.html',
  styleUrls: ['./groupes-display.component.css'],
})
export class GroupesDisplayComponent {
  /** Liste complète des groupes générés */
  @Input() groupes: { nom: string; eleves: any[] }[] = [];

  /** Le tirage est-il validé ? */
  @Input() tirageValide: boolean = false;

  /** Liste d’origine (utile pour comparer ou afficher un message) */
  @Input() listeSelectionnee: Liste | null = null;

  /** Actions déléguées au parent */
  @Output() dragDrop = new EventEmitter<CdkDragDrop<any[]>>();
  @Output() valider = new EventEmitter<void>();
  @Output() annuler = new EventEmitter<void>();
  @Output() supprimerGroupe = new EventEmitter<string>();


  onDrop(event: CdkDragDrop<any[]>) {
    this.dragDrop.emit(event);
  }

  onValider() {
    this.valider.emit();
  }

  onAnnuler() {
    this.annuler.emit();
  }
}

