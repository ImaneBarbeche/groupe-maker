import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
@Component({
  selector: 'app-groupes',
  imports: [CommonModule, FormsModule],
  templateUrl: './groupes.component.html',
  styleUrls: ['./groupes.component.css'],
})
export class GroupesComponent {
  nouveauNomGroupe: string = '';
  groupes: { nom: string; eleves: string[] }[] = [];
  constructor() {
    this.groupes = JSON.parse(localStorage.getItem('groupes') || '[]');
  }
  creerGroupe() {
    if (!this.nouveauNomGroupe.trim()) {
      alert('Le nom du groupe ne peut pas être vide.');
      return;
    }
    const nouveauGroupe = { nom: this.nouveauNomGroupe.trim(), eleves: [] };
    this.groupes.push(nouveauGroupe);
    this.nouveauNomGroupe = '';

    localStorage.setItem('groupes', JSON.stringify(this.groupes));
  }

  ngOnInit() {
    this.groupes = JSON.parse(localStorage.getItem('groupes') || '[]');
  }

  supprimerGroupe(index: number) {
    this.groupes.splice(index, 1);

    if (this.groupes.length === 0) {
      localStorage.removeItem('groupes');
    } else {
      localStorage.setItem('groupes', JSON.stringify(this.groupes));
    }
  }
}
