import { ProficiencyRank } from './types/base.js';
export class WanderersGuideImporter {
    static instance;
    constructor() { }
    static getInstance() {
        if (!WanderersGuideImporter.instance) {
            WanderersGuideImporter.instance = new WanderersGuideImporter();
        }
        return WanderersGuideImporter.instance;
    }
    async parseCharacterFile(fileInput) {
        try {
            if (!fileInput.files || fileInput.files.length === 0) {
                throw new Error('No file selected');
            }
            const file = fileInput.files[0];
            const content = await this.readFileContent(file);
            const wgData = JSON.parse(content);
            // Basic validation that we have some kind of data
            if (!wgData || typeof wgData !== 'object') {
                throw new Error('Invalid character data format');
            }
            console.log('Parsed Wanderer\'s Guide data:', wgData);
            // Convert to Foundry format
            const character = {
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
        }
        catch (error) {
            console.error('Error parsing character file:', error);
            throw error;
        }
    }
    async readFileContent(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    resolve(event.target.result);
                }
                else {
                    reject(new Error('Failed to read file content'));
                }
            };
            reader.onerror = () => {
                reject(new Error('Error reading file'));
            };
            reader.readAsText(file);
        });
    }
    convertProficiencyRank(wgProficiency) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW1wb3J0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBTWxELE1BQU0sT0FBTyxzQkFBc0I7SUFDdkIsTUFBTSxDQUFDLFFBQVEsQ0FBeUI7SUFFaEQsZ0JBQXVCLENBQUM7SUFFeEIsTUFBTSxDQUFDLFdBQVc7UUFDZCxJQUFJLENBQUMsc0JBQXNCLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbkMsc0JBQXNCLENBQUMsUUFBUSxHQUFHLElBQUksc0JBQXNCLEVBQUUsQ0FBQztRQUNuRSxDQUFDO1FBQ0QsT0FBTyxzQkFBc0IsQ0FBQyxRQUFRLENBQUM7SUFDM0MsQ0FBQztJQUVELEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxTQUEyQjtRQUNoRCxJQUFJLENBQUM7WUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztnQkFDbkQsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ3hDLENBQUM7WUFFRCxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqRCxNQUFNLE1BQU0sR0FBNEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUU1RCxrREFBa0Q7WUFDbEQsSUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUUsQ0FBQztnQkFDeEMsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBQ3JELENBQUM7WUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxFQUFF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