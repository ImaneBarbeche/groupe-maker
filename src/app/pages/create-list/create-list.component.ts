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
      id: (this.people.length + 1).toString(), // Génère un ID unique basé sur la longueur
      prenom: this.createListForm.value.personName,
      nom: '', // Ajoutez un champ vide pour `nom` si nécessaire
      language: 0, // Valeur par défaut
      techLevel: 0, // Valeur par défaut
      profil: '', // Valeur par défaut
      dwwmStudent: false, // Valeur par défaut
      gender: '', // Valeur par défaut
      age: this.createListForm.value.personAge,
      groupe: '', // Valeur par défaut
    };
    this.people.push(person);
    this.createListForm.patchValue({ personName: '', personAge: '' }); // Réinitialise les champs de la personne
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