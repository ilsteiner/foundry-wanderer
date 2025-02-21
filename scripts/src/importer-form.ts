import { WanderersGuideImporter } from './importer.js';

export class WanderersGuideImporterForm extends FormApplication {
    static get defaultOptions(): FormApplicationOptions {
        const defaults = super.defaultOptions;
        const overrides: Partial<FormApplicationOptions> = {
            id: 'wanderers-guide-importer',
            title: game.i18n?.localize('wanderers-guide-importer.form.title') ??
                   'Import from Wanderer\'s Guide',
            template: 'modules/foundry-wanderer/templates/import-form.html',
            width: 400,
            height: 'auto',
            closeOnSubmit: true
        };
        return foundry.utils.mergeObject(defaults, overrides) as FormApplicationOptions;
    }

    async _updateObject(event: Event, formData: any) {
        try {
            // Get the actual file input element
            const form = event.target as HTMLFormElement;
            const fileInput = form.querySelector('input[name="wanderersGuideFileUpload"]') as HTMLInputElement;
            
            if (!fileInput) {
                throw new Error('File input not found');
            }

            const importer = WanderersGuideImporter.getInstance();
            const characterData = await importer.parseCharacterFile(fileInput);
            
            // For now, we just log the data
            console.log('Imported character data:', characterData);
            
            ui.notifications?.info(
                game.i18n?.localize('wanderers-guide-importer.notifications.success') ??
                'Character imported successfully!'
            );
        } catch (error) {
            ui.notifications?.error(
                game.i18n?.localize('wanderers-guide-importer.notifications.error') ??
                'Error importing character'
            );
            console.error(error);
        }
    }
}