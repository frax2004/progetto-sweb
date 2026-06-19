import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CharacterManagementService {
  constructor (private httpclient: HttpClient) {}
  
  displayClasses() {
    return this.httpclient.post<any>(
      `${environment.api_url}/api/character-management/class-display`,
      {}
    )
    .pipe(
      tap(
        res => sessionStorage.setItem("Risposta:  ", res.message)
      )
    );
  }

  displaySpecificLevel(className: string) {
    return this.httpclient.post<any>(
      `${environment.api_url}/api/character-management/level-display-specific`,
      {className: className}
    );
  }

  displaySpecies() {
    return this.httpclient.post<any>(
      `${environment.api_url}/api/character-management/species-display`,
      {}
    );
  }

  displayBackgrounds() {
    return this.httpclient.post<any>(
      `${environment.api_url}/api/character-management/background-display`,
      {}
    );
  }
  
  displayLevelRowByClassAndLevel(level: number, className: string) {
    return this.httpclient.post<any>(
      `${environment.api_url}/api/character-management/level-display-by-class-and-level`,
      {level: level, className: className}
    );
  }

  displaySpellsByClass(className: string) {
    return this.httpclient.post<any>(
      `${environment.api_url}/api/character-management/spell-display-by-class`,
      {className: className}
    );
  }

  displayClassByName(className: string) {
    return this.httpclient.post<any>(
      `${environment.api_url}/api/character-management/class-display-by-name`,
      {className: className}
    );
  }

  displaySpeciesByName(speciesName: string) {
    return this.httpclient.post<any>(
      `${environment.api_url}/api/character-management/species-display-by-name`,
      {speciesName: speciesName}
    );
  }

  displayBackgroundByName(bgName: string) {
    return this.httpclient.post<any>(
      `${environment.api_url}/api/character-management/background-display-by-name`,
      {bgName: bgName}
    );
  }

  insertCharacter(
    name: string,
    healthPoints: number,
    imgURL: string,
    characterClass: string,
    subclass: string | undefined,
    species: string,
    subspecies: string | undefined,
    background: string,
    level: number,
    levelSpecifics: any | undefined,
    equipment: any[],
    proficiencies: any[],
    languages: any[],
    speciesTraits: any[] | undefined,
    speed: number,
    size: string,
    startingGold: any,
    backgroundFeature: any,
    statistics: any,
    spellsKnown: number | undefined,
    cantripsKnown: number | undefined,
    spells: any[] | undefined,
    cantrips: any[] | undefined,
  ) {

     return this.httpclient.post<any>(
      `${environment.api_url}/api/character-management/insert-character`,
      {
        name: name,
        healthPoints: healthPoints,
        imgURL: imgURL, 
        characterClass: characterClass,
        subclass: subclass,
        species: species,
        subspecies: subspecies,
        background: background,
        level: level,
        levelSpecifics: levelSpecifics,
        equipment: equipment,
        proficiencies: proficiencies,
        languages: languages,
        speciesTraits: speciesTraits,
        speed: speed,
        size: size,
        startingGold: startingGold,
        backgroundFeature: backgroundFeature,
        statistics: statistics,
        spellsKnown: spellsKnown,
        cantripsKnown: cantripsKnown,
        spells: spells,
        cantrips: cantrips,
      }
    )
    .pipe(
      tap(res => sessionStorage.setItem("Risposta:  ", JSON.stringify(res,null,2)))
    );
  }

  getAbilityScores() {
    return this.httpclient.post<any>(
      `${environment.api_url}/api/character-management/get-ability-scores`,
      {}
    );
  }

  
  getCharacterByIdx(idx_personaggio: string) {
    return this.httpclient.post<any>(
      `${environment.api_url}/api/character-management/get-character-by-idx`,
      {idx_personaggio: idx_personaggio}
    );
  }

  getCharacterAbilityScores(idx_personaggio: string) {
    return this.httpclient.post<any>(
      `${environment.api_url}/api/character-management/get-character-stats`,
      {idx_personaggio: idx_personaggio}
    );
  }

  getCharacterProficiencies(idx_personaggio: string) {
    return this.httpclient.post<any>(
      `${environment.api_url}/api/character-management/get-character-proficiencies`,
      {idx_personaggio: idx_personaggio}
    );
  }
}
