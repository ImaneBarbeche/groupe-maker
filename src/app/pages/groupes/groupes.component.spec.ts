import { GroupesComponent } from './groupes.component';
import { Eleve } from '../../models/utilisateur.interface';
import { Liste } from '../../models/utilisateur.interface';

describe('GroupesComponent (classe uniquement)', () => {
  let component: GroupesComponent;
  let mockService: any;

  beforeEach(() => {
    // Arrange : création d’un faux service
    mockService = {
      getUtilisateurActif: () => ({ username: 'julie' }),
      getListes: () => [],
      getGroupes: () => [],
      getHistorique: () => [],
      setHistorique: jasmine.createSpy('setHistorique'),
      setListes: jasmine.createSpy('setListes'),
      setGroupes: jasmine.createSpy('setGroupes'),
    };

    component = new GroupesComponent(mockService);
    component.utilisateurActif = mockService.getUtilisateurActif();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // Test de la méthode pour générer des groupes vides
  it('should generate 3 empty groups', () => {
    // Arrange
    component.nombreDeGroupes = 3;

    // Act
    component.genererGroupesVides();

    // Assert
    expect(component.groupes.length).toBe(3);
    component.groupes.forEach((groupe) => {
      expect(groupe.eleves).toEqual([]);
    });
  });

  it('should not generate groups if nombreDeGroupes is null or negative', () => {
    // Arrange
    component.nombreDeGroupes = null;
    component.nombreDeGroupes = -1;

    // Act
    component.genererGroupesVides();

    // Assert
    expect(component.groupes.length).toBe(0);
  });
  // Test des méthodes de tirage
  it('should validate a draw and save it to history', () => {
    // Arrange
    component.listeSelectionnee = {
      id: '123',
      nom: 'Ma liste',
      eleves: [
        { id: '1', firstName: 'Luna' } as Eleve,
        { id: '2', firstName: 'Alex' } as Eleve,
      ],
      tirages: 0,
    };

    component.groupes = [
      { nom: 'Groupe 1', eleves: [{ id: '1', firstName: 'Luna' } as Eleve] },
      { nom: 'Groupe 2', eleves: [{ id: '2', firstName: 'Alex' } as Eleve] },
    ];

    // Act
    component.validerTirage();

    // Assert
    expect(component.tirageValide).toBeTrue();
    expect(component.historiqueTirages.length).toBe(1);
    expect(mockService.setHistorique).toHaveBeenCalled();
    expect(mockService.setListes).toHaveBeenCalledWith(
      'julie',
      jasmine.any(Array)
    );
  });
  // Test de la méthode de suppression d'un groupe
  it('should delete a group and update the table', () => {
    // Arrange
    component.groupes = [
      { nom: 'Groupe 1', eleves: [{ id: '1', firstName: 'Luna' } as Eleve] },
      { nom: 'Groupe 2', eleves: [{ id: '2', firstName: 'Alex' } as Eleve] },
    ];

    // Act
    component.supprimerGroupe(0);

    // Assert
    expect(component.groupes.length).toBe(1);
    expect(component.groupes[0].nom).toBe('Groupe 2');
    expect(mockService.setGroupes).toHaveBeenCalledWith(component.groupes);
  });

  it('should delete all groups and update the table', () => {
    // Arrange
    component.groupes = [
      { nom: 'Groupe 1', eleves: [{ id: '1', firstName: 'Moana' } as Eleve] },
    ];

    // Act

    component.supprimerGroupe(0);

    // Assert
    expect(component.groupes.length).toBe(0);
    expect(mockService.removeGroupes).toHaveBeenCalledWith(component.groupes);
  });
  it('should not delete a group and update the table if supprimerGroupe is called with an invalid index', () => {
    // Arrange
    component.groupes = [
      { nom: 'Groupe 1', eleves: [{ id: '1', firstName: 'Luna' } as Eleve] },
      { nom: 'Groupe 2', eleves: [{ id: '2', firstName: 'Alex' } as Eleve] },
    ];

    // Act
    component.supprimerGroupe(2);
    component.supprimerGroupe(-1);

    // Assert
    expect(component.groupes.length).toBe(2);
    expect(mockService.setGroupes).not.toHaveBeenCalled();
    expect(mockService.removeGroupes).not.toHaveBeenCalled();
  });
});
