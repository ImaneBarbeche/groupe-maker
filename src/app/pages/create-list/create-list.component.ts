import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListesService } from '../../services/listes.service';
import { Liste } from '../../models/liste.interface';
import { Personne } from '../../models/personne.interface';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class CreateListComponent {
  createListForm: FormGroup;
  people: Personne[] = [];

  constructor(private fb: FormBuilder, private listeService: ListesService) {
    this.createListForm = this.fb.group({
      listName: ['', Validators.required],
      personName: ['', Validators.required],
      personAge: ['', [Validators.required, Validators.min(0)]],
    });
  }

  addPerson() {
    const person: Personne = {
      id: (this.people.length + 1).toString(),
      nom: this.createListForm.value.personName,
      genre: 'ne se prononce pas', // Valeur par défaut, à adapter avec un select
      aisanceFrancais: 1, // Valeur par défaut, à adapter avec un select
      ancienDWWM: false, // Valeur par défaut, à adapter avec une checkbox
      niveauTechnique: 1, // Valeur par défaut, à adapter avec un select
      profil: 'réservé', // Valeur par défaut, à adapter avec un select
      age: this.createListForm.value.personAge,
    };
    this.people.push(person);
    this.createListForm.patchValue({ personName: '', personAge: '' });
  }

  submit() {
    if (this.createListForm.valid) {
      const newList: Liste = {
        id: this.listeService.getNewListId(), // Génère un nouvel ID pour la liste
        nom: this.createListForm.value.listName,
        personnes: this.people,
        tirages: 0, // Initialise le nombre de tirages à 0
      };
      this.listeService.addList(newList); // Ajoute la liste via le service
      alert('Liste créée avec succès !');
      this.resetForm();
    }
  }

  resetForm() {
    this.createListForm.reset();
    this.people = [];
  }
}