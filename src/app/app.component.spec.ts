import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the title 'groupe-maker'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('groupe-maker');
  });

    it('should load utilisateurActif on ngOnInit if present', () => {
    const user = { username: 'jean' };
    localStorage.setItem('utilisateurActif', JSON.stringify(user));

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();

    expect(app.utilisateurActif).toEqual(user);
  });

 it('should clear utilisateurActif and reload page on seDeconnecter', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    localStorage.setItem('utilisateurActif', JSON.stringify({ username: 'lucie' }));
    spyOn(window.location, 'assign'); // pour intercepter le reload

    app.seDeconnecter();

    expect(localStorage.getItem('utilisateurActif')).toBeNull();
    expect(app.utilisateurActif).toBeNull();
    expect(window.location.assign).toHaveBeenCalledWith('/');
  });

    it('should detect expired CGU and show modal', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    const oldTimestamp = Date.now() - 14 * 30 * 24 * 60 * 60 * 1000; // 14 mois
    localStorage.setItem('cguAccepted', JSON.stringify({ timestamp: oldTimestamp }));

    app.verifierAcceptationCGU();

    expect(app.afficherCGU).toBeTrue();
  });

  it('should not show CGU modal if timestamp is recent', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    const recent = Date.now();
    localStorage.setItem('cguAccepted', JSON.stringify({ timestamp: recent }));

    app.verifierAcceptationCGU();

    expect(app.afficherCGU).toBeFalse();
  });
   it('should store CGU timestamp and hide modal when accepted', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.accepterCGU();

    const data = JSON.parse(localStorage.getItem('cguAccepted') || '{}');
    expect(typeof data.timestamp).toBe('number');
    expect(app.afficherCGU).toBeFalse();
  });
});
