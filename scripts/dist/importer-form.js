import { WanderersGuideImporter } from './importer.js';
export class WanderersGuideImporterForm extends FormApplication {
    static get defaultOptions() {
        const defaults = super.defaultOptions;
        const overrides = {
            id: 'wanderers-guide-importer',
            title: game.i18n?.localize('wanderers-guide-importer.form.title') ??
                'Import from Wanderer\'s Guide',
            template: 'modules/foundry-wanderer/templates/import-form.html',
            width: 400,
            height: 'auto',
            closeOnSubmit: true
        };
        return foundry.utils.mergeObject(defaults, overrides);
    }
    async _updateObject(event, formData) {
        try {
            // Get the actual file input element
            const form = event.target;
            const fileInput = form.querySelector('input[name="wanderersGuideFileUpload"]');
            if (!fileInput) {
                throw new Error('File input not found');
            }
            const importer = WanderersGuideImporter.getInstance();
            const characterData = await importer.parseCharacterFile(fileInput);
            // For now, we just log the data
            console.log('Imported character data:', characterData);
            ui.notifications?.info(game.i18n?.localize('wanderers-guide-importer.notifications.success') ??
                'Character imported successfully!');
        }
        catch (error) {
            ui.notifications?.error(game.i18n?.localize('wanderers-guide-importer.notifications.error') ??
                'Error importing character');
            console.error(error);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0ZXItZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9pbXBvcnRlci1mb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RCxNQUFNLE9BQU8sMEJBQTJCLFNBQVEsZUFBZTtJQUMzRCxNQUFNLEtBQUssY0FBYztRQUNyQixNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDO1FBQ3RDLE1BQU0sU0FBUyxHQUFvQztZQUMvQyxFQUFFLEVBQUUsMEJBQTBCO1lBQzlCLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxxQ0FBcUMsQ0FBQztnQkFDMUQsK0JBQStCO1lBQ3RDLFFBQVEsRUFBRSxxREFBcUQ7WUFDL0QsS0FBSyxFQUFFLEdBQUc7WUFDVixNQUFNLEVBQUUsTUFBTTtZQUNkLGFBQWEsRUFBRSxJQUFJO1NBQ3RCLENBQUM7UUFDRixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQTJCLENBQUM7SUFDcEYsQ0FBQztJQUVELEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBWSxFQUFFLFFBQWE7UUFDM0MsSUFBSSxDQUFDO1lBQ0Qsb0NBQW9DO1lBQ3BDLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUF5QixDQUFDO1lBQzdDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsd0NBQXdDLENBQXFCLENBQUM7WUFFbkcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUM1QyxDQUFDO1lBRUQsTUFBTSxRQUFRLEdBQUcsc0JBQXNCLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdEQsTUFBTSxhQUFhLEdBQUcsTUFBTSxRQUFRLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFbkUsZ0NBQWdDO1lBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFFdkQsRUFBRSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQ2xCLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLGdEQUFnRCxDQUFDO2dCQUNyRSxrQ0FBa0MsQ0FDckMsQ0FBQztRQUNOLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2IsRUFBRSxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQ25CLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLDhDQUE4QyxDQUFDO2dCQUNuRSwyQkFBMkIsQ0FDOUIsQ0FBQztZQUNGLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsQ0FBQztJQUNMLENBQUM7Q0FDSiJ9