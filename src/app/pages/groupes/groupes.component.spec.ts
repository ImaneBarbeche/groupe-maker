import { GroupesComponent } from './groupes.component';
import { Eleve } from '../../models/utilisateur.interface';
import { Liste } from '../../models/utilisateur.interface';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

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
      removeGroupes: jasmine.createSpy('removeGroupes'),
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
  expect(mockService.removeGroupes).toHaveBeenCalledWith();
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

  it('if a list is selected, the groups should be generated from that list', () => {
    // Arrange
    component.listeSelectionnee = {
      id: '123',
      nom: 'Ma liste',
      eleves: [
        { id: '1', firstName: 'Luna' } as Eleve,
        { id: '2', firstName: 'Alex' } as Eleve,
        { id: '3', firstName: 'Moana' } as Eleve,
      ],
      tirages: 0,
    };
    component.nombreDeGroupes = 2;

    // Act
    component.onListeSelectionnee();

    // Assert
    expect(component.elevesDisponibles.length).toBe(3);
    expect(component.elevesDisponibles).toEqual(
      component.listeSelectionnee.eleves
    );
    expect(component.elevesDisponibles).not.toBe(
      component.listeSelectionnee.eleves
    );
  });

  it('should not generate groups if no list is selected', () => {
    // Arrange
    component.listeSelectionnee = undefined;
    component.nombreDeGroupes = 2;

    // Act
    component.onListeSelectionnee();

    // Assert
    expect(component.elevesDisponibles.length).toBe(0);
  });
  // Test de la méthode drag and drop
  it('should move an element from one group to another', () => {
    // Arrange
    const sourceGroupe = {
      nom: 'Groupe 1',
      eleves: [{ id: '1', firstName: 'Luna' } as Eleve],
    };
    const targetGroupe = {
      nom: 'Groupe 2',
      eleves: [] as Eleve[],
    };

    component.groupes = [sourceGroupe, targetGroupe];

    const event = {
      previousContainer: { data: sourceGroupe.eleves },
      container: { data: targetGroupe.eleves },
      previousIndex: 0,
      currentIndex: 0,
    } as unknown as CdkDragDrop<any>;

    // Act
    component.deplacerEleve(event);

    // Assert
    expect(sourceGroupe.eleves.length).toBe(0);
    expect(targetGroupe.eleves.length).toBe(1);
    expect(targetGroupe.eleves[0].id).toBe('1');
  });

  it('should not move an element if the source group is the same as the target group', () => {
    // Arrange
    const sourceGroupe = {
      nom: 'Groupe 1',
      eleves: [{ id: '1', firstName: 'Luna' } as Eleve],
    };
    const event = {
      previousContainer: { data: sourceGroupe.eleves },
      container: { data: sourceGroupe.eleves }, // même tableau = même groupe
      previousIndex: 0,
      currentIndex: 0,
    } as unknown as CdkDragDrop<any>;

    // Act
    component.deplacerEleve(event);

    // Assert
    expect(sourceGroupe.eleves.length).toBe(1);
    expect(sourceGroupe.eleves[0].id).toBe('1');
  });

  //Test de la méthode de tirage aléatoire
  it('should shuffle students randomly', () => {
    // Arrange
    component.elevesDisponibles = [
      { id: '1', firstName: 'Luna' },
      { id: '2', firstName: 'Alex' },
      { id: '3', firstName: 'Mina' },
      { id: '4', firstName: 'Noah' },
      { id: '5', firstName: 'Eva' },
      { id: '6', firstName: 'Leo' },
    ] as Eleve[];

    component.nombreDeGroupes = 3;
    component.listeSelectionnee = {} as Liste;
    component.mixDWWM = false;

    // Act
    component.genererRepartition();

    // Assert
    // Vérifie qu'on a bien 3 groupes
    expect(component.groupes.length).toBe(3);

    // Récupère tous les élèves répartis dans les groupes
    const tousLesElevesRepartis = component.groupes.flatMap((g) => g.eleves);

    // Vérifie qu'on a bien 6 élèves répartis
    expect(tousLesElevesRepartis.length).toBe(6);

    // Vérifie qu'il n'y a aucun doublon (en se basant sur l'id)
    const ids = tousLesElevesRepartis.map((e) => e.id);
    const idsUniques = new Set(ids);
    expect(idsUniques.size).toBe(6); // s'il y a un doublon, ça échouera
  });

  it('should shuffle students randomly with DWWM', () => {
    // Arrange
    component.elevesDisponibles = [
      { id: '1', firstName: 'Luna', dwwmStudent: true },
      { id: '2', firstName: 'Alex', dwwmStudent: false },
      { id: '3', firstName: 'Mina', dwwmStudent: true },
      { id: '4', firstName: 'Noah', dwwmStudent: false },
      { id: '5', firstName: 'Eva', dwwmStudent: true },
      { id: '6', firstName: 'Leo', dwwmStudent: false },
    ] as Eleve[];

    component.nombreDeGroupes = 3;
    component.listeSelectionnee = {} as Liste;
    component.mixDWWM = true;

    // Act
    component.genererRepartition();

    // Assert
   
    expect(component.groupes.length).toBe(3); // Vérifie qu'on a bien 3 groupes

    // Récupère tous les élèves répartis dans les groupes
    const tousLesElevesRepartis = component.groupes.flatMap((g) => g.eleves);

    // Vérifie qu'on a bien 6 élèves répartis
    expect(tousLesElevesRepartis.length).toBe(6);

    // Vérifie qu'il n'y a aucun doublon (en se basant sur l'id)
    const ids = tousLesElevesRepartis.map((e) => e.id);
    const idsUniques = new Set(ids);
    expect(idsUniques.size).toBe(6); // s'il y a un doublon, ça échouera
    // Vérifie que chaque groupe contient au moins un élève DWWM
    component.groupes.forEach((groupe) => {
      const contientDwwm = groupe.eleves.some((e) => e.dwwmStudent);
      expect(contientDwwm).toBeTrue();
    });
  });

  it('should not shuffle students if no list is selected', () => {
    // Arrange
    component.listeSelectionnee = undefined;
    component.nombreDeGroupes = 3;

    // Act
    component.genererRepartition();

    // Assert
    expect(component.groupes.length).toBe(0);
  });

  it('should not shuffle students if no students are available', () => {
    // Arrange
    component.elevesDisponibles = [];
    component.nombreDeGroupes = 3;
    component.listeSelectionnee = {} as Liste;

    // Act
    component.genererRepartition();

    // Assert
    expect(component.groupes.length).toBe(0);
  });

  it('should not shuffle students if number of groups is invalid', () => {
    // Arrange
    component.nombreDeGroupes = -1;
    component.listeSelectionnee = {} as Liste;


    // Act
    component.genererRepartition();

    // Assert
    expect(component.groupes.length).toBe(0);
  });
});
