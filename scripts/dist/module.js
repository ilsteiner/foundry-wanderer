import { WanderersGuideImporterForm } from './importer-form.js';
Hooks.once('init', function () {
    console.log('Wanderer\'s Guide Importer | Initializing');
});
Hooks.once('ready', function () {
    console.log('Wanderer\'s Guide Importer | Ready');
});
// Add button to Actors Directory header
Hooks.on('renderActorDirectory', (app, html, data) => {
    console.log('Wanderer\'s Guide Importer | Adding directory button');
    // Find the header button div
    const buttonDiv = html.find('.header-actions');
    // Add our import button
    const importButton = $(`
        <button class="create-actor">
            <i class="fas fa-file-import"></i> Import from WG
        </button>
    `);
    importButton.on('click', (event) => {
        event.preventDefault();
        console.log('Wanderer\'s Guide Importer | Button clicked');
        new WanderersGuideImporterForm({}, {}).render(true);
    });
    // Add the button to the header
    buttonDiv.append(importButton);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVoRSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtJQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkNBQTJDLENBQUMsQ0FBQztBQUM3RCxDQUFDLENBQUMsQ0FBQztBQUVILEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO0lBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLENBQUMsQ0FBQztBQUN0RCxDQUFDLENBQUMsQ0FBQztBQUVILHdDQUF3QztBQUN4QyxLQUFLLENBQUMsRUFBRSxDQUFDLHNCQUFzQixFQUFFLENBQUMsR0FBZ0IsRUFBRSxJQUFZLEVBQUUsSUFBUyxFQUFFLEVBQUU7SUFDM0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzREFBc0QsQ0FBQyxDQUFDO0lBRXBFLDZCQUE2QjtJQUM3QixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFFL0Msd0JBQXdCO0lBQ3hCLE1BQU0sWUFBWSxHQUFHLENBQUMsQ0FBQzs7OztLQUl0QixDQUFDLENBQUM7SUFFSCxZQUFZLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQXdCLEVBQUUsRUFBRTtRQUNsRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO1FBQzNELElBQUksMEJBQTBCLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4RCxDQUFDLENBQUMsQ0FBQztJQUVILCtCQUErQjtJQUMvQixTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ25DLENBQUMsQ0FBQyxDQUFDIn0=