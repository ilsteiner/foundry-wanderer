// src/types/character.ts
import { AttributeValue, RankedAttribute, HPAttribute, AbilityScore, ProficiencyRank } from './base';

export interface AbilityScores {
  str: AbilityScore;
  dex: AbilityScore;
  con: AbilityScore;
  int: AbilityScore;
  wis: AbilityScore;
  cha: AbilityScore;
}

export interface SavingThrow extends RankedAttribute {
  ability: keyof AbilityScores;
}

export interface CharacterAttributes {
  hp: HPAttribute;
  ac: AttributeValue;
  perception: RankedAttribute;
  initiative: RankedAttribute;
  saves: {
    fortitude: SavingThrow;
    reflex: SavingThrow;
    will: SavingThrow;
  };
}

export interface CharacterDetails {
  level: { value: number; };
  ancestry: { name: string; };
  heritage: { name: string; };
  class: { name: string; };
  background: { name: string; };
}

export interface CharacterSystemData {
  abilities: AbilityScores;
  attributes: CharacterAttributes;
  details: CharacterDetails;
}

export interface CharacterPF2e {
  name: string;
  type: "character";
  system: CharacterSystemData;
}