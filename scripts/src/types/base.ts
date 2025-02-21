// src/types/base.ts
export enum ProficiencyRank {
    Untrained = 0,
    Trained = 1,
    Expert = 2,
    Master = 3,
    Legendary = 4
  }
  
  export interface AttributeValue {
    value: number;
  }
  
  export interface RankedAttribute extends AttributeValue {
    rank: ProficiencyRank;
  }
  
  export interface HPAttribute extends AttributeValue {
    max: number;
    temp: number;
    details: string;
  }
  
  export interface AbilityScore {
    value: number;
    mod: number;
  }