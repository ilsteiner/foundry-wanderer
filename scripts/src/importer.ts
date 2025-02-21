import type { CharacterPF2e } from './types/character.js';
import { ProficiencyRank } from './types/base.js';

interface WanderersGuideCharacter {
    [key: string]: any;
}

export class WanderersGuideImporter {
    private static instance: WanderersGuideImporter;

    private constructor() {}

    static getInstance(): WanderersGuideImporter {
        if (!WanderersGuideImporter.instance) {
            WanderersGuideImporter.instance = new WanderersGuideImporter();
        }
        return WanderersGuideImporter.instance;
    }

    async parseCharacterFile(fileInput: HTMLInputElement): Promise<CharacterPF2e> {
        try {
            if (!fileInput.files || fileInput.files.length === 0) {
                throw new Error('No file selected');
            }

            const file = fileInput.files[0];
            const content = await this.readFileContent(file);
            const wgData: WanderersGuideCharacter = JSON.parse(content);

            // Basic validation that we have some kind of data
            if (!wgData || typeof wgData !== 'object') {
                throw new Error('Invalid character data format');
            }

            console.log('Parsed Wanderer\'s Guide data:', wgData);

            // Convert to Foundry format
            const character: CharacterPF2e = {
                name: wgData.build?.name || "Unnamed Character",
                type: "character",
                system: {
                    abilities: {
                        str: { value: wgData.build?.abilityScores?.str || 10, mod: Math.floor((wgData.build?.abilityScores?.str - 10) / 2) || 0 },
                        dex: { value: wgData.build?.abilityScores?.dex || 10, mod: Math.floor((wgData.build?.abilityScores?.dex - 10) / 2) || 0 },
                        con: { value: wgData.build?.abilityScores?.con || 10, mod: Math.floor((wgData.build?.abilityScores?.con - 10) / 2) || 0 },
                        int: { value: wgData.build?.abilityScores?.int || 10, mod: Math.floor((wgData.build?.abilityScores?.int - 10) / 2) || 0 },
                        wis: { value: wgData.build?.abilityScores?.wis || 10, mod: Math.floor((wgData.build?.abilityScores?.wis - 10) / 2) || 0 },
                        cha: { value: wgData.build?.abilityScores?.cha || 10, mod: Math.floor((wgData.build?.abilityScores?.cha - 10) / 2) || 0 }
                    },
                    attributes: {
                        hp: {
                            value: wgData.build?.maxHP || 0,
                            max: wgData.build?.maxHP || 0,
                            temp: 0,
                            details: ""
                        },
                        ac: {
                            value: wgData.build?.totalAC || 10
                        },
                        perception: {
                            value: wgData.build?.perception || 0,
                            rank: this.convertProficiencyRank(wgData.build?.perceptionProficiency)
                        },
                        initiative: {
                            value: wgData.build?.perception || 0,
                            rank: this.convertProficiencyRank(wgData.build?.perceptionProficiency)
                        },
                        saves: {
                            fortitude: {
                                value: wgData.build?.saves?.fortitude || 0,
                                rank: this.convertProficiencyRank(wgData.build?.proficiencies?.fortitude),
                                ability: "con"
                            },
                            reflex: {
                                value: wgData.build?.saves?.reflex || 0,
                                rank: this.convertProficiencyRank(wgData.build?.proficiencies?.reflex),
                                ability: "dex"
                            },
                            will: {
                                value: wgData.build?.saves?.will || 0,
                                rank: this.convertProficiencyRank(wgData.build?.proficiencies?.will),
                                ability: "wis"
                            }
                        }
                    },
                    details: {
                        level: { value: wgData.build?.level || 1 },
                        ancestry: { name: wgData.build?.ancestry?.name || "" },
                        heritage: { name: wgData.build?.heritage?.name || "" },
                        class: { name: wgData.build?.class?.name || "" },
                        background: { name: wgData.build?.background?.name || "" }
                    }
                }
            };

            console.log('Converted to Foundry format:', character);
            return character;

        } catch (error) {
            console.error('Error parsing character file:', error);
            throw error;
        }
    }

    private async readFileContent(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    resolve(event.target.result as string);
                } else {
                    reject(new Error('Failed to read file content'));
                }
            };
            reader.onerror = () => {
                reject(new Error('Error reading file'));
            };
            reader.readAsText(file);
        });
    }

    private convertProficiencyRank(wgProficiency: string | undefined): ProficiencyRank {
        switch (wgProficiency?.toLowerCase()) {
            case 'trained':
                return ProficiencyRank.Trained;
            case 'expert':
                return ProficiencyRank.Expert;
            case 'master':
                return ProficiencyRank.Master;
            case 'legendary':
                return ProficiencyRank.Legendary;
            default:
                return ProficiencyRank.Untrained;
        }
    }
}