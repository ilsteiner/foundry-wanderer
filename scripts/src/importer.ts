// Types for our character data
interface WanderersGuideCharacter {
    // We'll expand this as we understand the data structure
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

    async parseCharacterFile(fileInput: HTMLInputElement): Promise<WanderersGuideCharacter> {
        try {
            if (!fileInput.files || fileInput.files.length === 0) {
                throw new Error('No file selected');
            }

            const file = fileInput.files[0];
            const content = await this.readFileContent(file);
            const characterData = JSON.parse(content);
            
            console.log('Parsed character data:', characterData);
            
            // Basic validation that we have some kind of data
            if (!characterData || typeof characterData !== 'object') {
                throw new Error('Invalid character data format');
            }
            
            return characterData;
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
}