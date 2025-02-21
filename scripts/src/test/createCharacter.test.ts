// src/test/createCharacter.test.ts
import { CharacterPF2e } from '../types/character';
import { ProficiencyRank } from '../types/base';

describe('Character Creation', () => {
  test('creates a valid minimal character', () => {
    const testChar: CharacterPF2e = {
      name: "Test Character",
      type: "character",
      system: {
        abilities: {
          str: { value: 10, mod: 0 },
          dex: { value: 12, mod: 1 },
          con: { value: 14, mod: 2 },
          int: { value: 16, mod: 3 },
          wis: { value: 10, mod: 0 },
          cha: { value: 8, mod: -1 }
        },
        attributes: {
          hp: {
            value: 14,
            max: 14,
            temp: 0,
            details: ""
          },
          ac: {
            value: 15
          },
          perception: {
            value: 2,
            rank: ProficiencyRank.Trained
          },
          initiative: {
            value: 3,
            rank: ProficiencyRank.Trained
          },
          saves: {
            fortitude: {
              value: 4,
              rank: ProficiencyRank.Trained,
              ability: "con"
            },
            reflex: {
              value: 3,
              rank: ProficiencyRank.Trained,
              ability: "dex"
            },
            will: {
              value: 2,
              rank: ProficiencyRank.Trained,
              ability: "wis"
            }
          }
        },
        details: {
          level: { value: 1 },
          ancestry: { name: "Human" },
          heritage: { name: "Skilled Heritage" },
          class: { name: "Fighter" },
          background: { name: "Guard" }
        }
      }
    };

    expect(testChar.type).toBe("character");
    expect(testChar.system.details.level.value).toBe(1);
    expect(testChar.system.abilities.str.mod).toBe(0);
    expect(testChar.system.attributes.hp.max).toBe(14);
  });
});