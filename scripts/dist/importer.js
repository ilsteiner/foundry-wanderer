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
            const characterData = JSON.parse(content);
            console.log('Parsed character data:', characterData);
            // Basic validation that we have some kind of data
            if (!characterData || typeof characterData !== 'object') {
                throw new Error('Invalid character data format');
            }
            return characterData;
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW1wb3J0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTUEsTUFBTSxPQUFPLHNCQUFzQjtJQUN2QixNQUFNLENBQUMsUUFBUSxDQUF5QjtJQUVoRCxnQkFBdUIsQ0FBQztJQUV4QixNQUFNLENBQUMsV0FBVztRQUNkLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNuQyxzQkFBc0IsQ0FBQyxRQUFRLEdBQUcsSUFBSSxzQkFBc0IsRUFBRSxDQUFDO1FBQ25FLENBQUM7UUFDRCxPQUFPLHNCQUFzQixDQUFDLFFBQVEsQ0FBQztJQUMzQyxDQUFDO0lBRUQsS0FBSyxDQUFDLGtCQUFrQixDQUFDLFNBQTJCO1FBQ2hELElBQUksQ0FBQztZQUNELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUNuRCxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDeEMsQ0FBQztZQUVELE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pELE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUVyRCxrREFBa0Q7WUFDbEQsSUFBSSxDQUFDLGFBQWEsSUFBSSxPQUFPLGFBQWEsS0FBSyxRQUFRLEVBQUUsQ0FBQztnQkFDdEQsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBQ3JELENBQUM7WUFFRCxPQUFPLGFBQWEsQ0FBQztRQUN6QixDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsK0JBQStCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdEQsTUFBTSxLQUFLLENBQUM7UUFDaEIsQ0FBQztJQUNMLENBQUM7SUFFTyxLQUFLLENBQUMsZUFBZSxDQUFDLElBQVU7UUFDcEMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNuQyxNQUFNLE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1lBRWhDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDdEIsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDO29CQUN2QixPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFnQixDQUFDLENBQUM7Z0JBQzNDLENBQUM7cUJBQU0sQ0FBQztvQkFDSixNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxDQUFDO2dCQUNyRCxDQUFDO1lBQ0wsQ0FBQyxDQUFDO1lBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUU7Z0JBQ2xCLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7WUFDNUMsQ0FBQyxDQUFDO1lBRUYsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSiJ9