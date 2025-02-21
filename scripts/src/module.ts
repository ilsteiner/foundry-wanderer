import { WanderersGuideImporterForm } from './importer-form.js';

Hooks.once('init', function() {
    console.log('Wanderer\'s Guide Importer | Initializing');
});

Hooks.once('ready', function() {
    console.log('Wanderer\'s Guide Importer | Ready');
});

// Add button to Actors Directory header
Hooks.on('renderActorDirectory', (app: Application, html: JQuery, data: any) => {
    console.log('Wanderer\'s Guide Importer | Adding directory button');
   
    // Find the header button div
    const buttonDiv = html.find('.header-actions');
   
    // Add our import button
    const importButton = $(`
        <button class="create-actor">
            <i class="fas fa-file-import"></i> Import from WG
        </button>
    `);
   
    importButton.on('click', (event: JQuery.ClickEvent) => {
        event.preventDefault();
        console.log('Wanderer\'s Guide Importer | Button clicked');
        new WanderersGuideImporterForm({}, {}).render(true);
    });
   
    // Add the button to the header
    buttonDiv.append(importButton);
});