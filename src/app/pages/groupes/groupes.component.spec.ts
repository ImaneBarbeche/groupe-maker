import { GroupesComponent } from './groupes.component';
import { Eleve} from '../../models/eleve.interface';
import { Liste } from '../../models/liste.interface';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

describe('GroupesComponent (classe uniquement)', () => {
  let component: GroupesComponent;
  let mockService: any;

  beforeEach(() => {
    mockService = {
      getUtilisateurActif: () => ({ username: 'julie' }),
      getListes: () => [],
      getGroupes: () => [],
      getHistorique: () => [],
      setHistorique: jasmine.createSpy('setHistorique'),
      setListes: jasmine.createSpy('setListes'),
      removeGroupes: jasmine.createSpy('removeGroupes'),
    };

    component = new GroupesComponent(mockService);
    component.utilisateurActif = mockService.getUtilisateurActif();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate 3 empty groups', () => {
    component.nombreDeGroupes = 3;
    component.listeSelectionnee = { id: '1', nom: 'Liste A', eleves: [], tirages: 0 };
    component.genererGroupesVides();
    expect(component.listeSelectionnee.groupes?.length).toBe(3);
  });

  it('should not generate groups if nombreDeGroupes is null or negative', () => {
    component.nombreDeGroupes = -1;
    component.listeSelectionnee = { id: '1', nom: 'Liste A', eleves: [], tirages: 0 };
    component.genererGroupesVides();
    expect(component.listeSelectionnee.groupes).toBeUndefined();
  });

  it('should validate a draw and save it to history', () => {
    component.listeSelectionnee = {
      id: '123', nom: 'Ma liste', tirages: 0,
      eleves: [
        { id: '1', firstName: 'Luna' } as Eleve,
        { id: '2', firstName: 'Alex' } as Eleve,
      ],
      groupes: [
        { nom: 'Groupe 1', eleves: [{ id: '1', firstName: 'Luna' } as Eleve] },
        { nom: 'Groupe 2', eleves: [{ id: '2', firstName: 'Alex' } as Eleve] },
      ]
    };

    component.validerTirage();
    expect(component.listeSelectionnee.tirageValide).toBeTrue();
    expect(component.historiqueTirages.length).toBe(1);
    expect(mockService.setHistorique).toHaveBeenCalled();
    expect(mockService.setListes).toHaveBeenCalled();
  });

  it('should delete a group and update the table', () => {
    component.listeSelectionnee = {
      id: '1', nom: 'Liste A', tirages: 0, eleves: [],
      groupes: [
        { nom: 'Groupe 1', eleves: [] },
        { nom: 'Groupe 2', eleves: [] }
      ]
    };
    component.supprimerGroupeParNom('Groupe 1');
    expect(component.listeSelectionnee.groupes?.length).toBe(1);
    expect(component.listeSelectionnee.groupes?.[0].nom).toBe('Groupe 2');
  });

  it('should not delete a group with an invalid name', () => {
    component.listeSelectionnee = {
      id: '1', nom: 'Liste A', tirages: 0, eleves: [], groupes: [
        { nom: 'Groupe 1', eleves: [] }
      ]
    };
    component.supprimerGroupeParNom('Inexistant');
    expect(component.listeSelectionnee.groupes?.length).toBe(1);
  });

  it('should move an element from one group to another', () => {
    const sourceGroupe = { nom: 'G1', eleves: [{ id: '1', firstName: 'Luna' } as Eleve] };
    const targetGroupe = { nom: 'G2', eleves: [] as Eleve[] };
    component.listeSelectionnee = { id: '1', nom: 'Liste', tirages: 0, eleves: [], groupes: [sourceGroupe, targetGroupe] };

    const event = {
      previousContainer: { data: sourceGroupe.eleves },
      container: { data: targetGroupe.eleves },
      previousIndex: 0,
      currentIndex: 0,
    } as unknown as CdkDragDrop<any>;

    component.deplacerEleve(event);
    expect(sourceGroupe.eleves.length).toBe(0);
    expect(targetGroupe.eleves.length).toBe(1);
  });

  it('should not move if drag is within the same group', () => {
    const groupe = { nom: 'G1', eleves: [{ id: '1', firstName: 'Luna' } as Eleve] };
    const event = {
      previousContainer: { data: groupe.eleves },
      container: { data: groupe.eleves },
      previousIndex: 0,
      currentIndex: 0,
    } as unknown as CdkDragDrop<any>;

    component.deplacerEleve(event);
    expect(groupe.eleves.length).toBe(1);
  });
});
