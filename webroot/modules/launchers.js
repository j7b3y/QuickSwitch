import { run } from './exec.js';

async function getQuicksteps() {
    const qslist = JSON.parse(await run('sh webroot/scripts/genQuickstepList.sh'));
    return qslist;
}

function handleCheckboxChange(event) {
    const checkboxes = document.querySelectorAll('#launchersBox input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        if (checkbox !== event.target) {
            checkbox.checked = false; 
        }
    });

    const setOverlayButton = document.getElementById("setOverlay");
    setOverlayButton.textContent = event.target.checked ? "Set" : "Reset";
    
    setOverlayButton.dataset.launcherName = event.target.checked ? event.target.parentElement.previousElementSibling.textContent : '';
}

async function genList() {
    const appList = await getQuicksteps();
    const launchersBox = document.getElementById("launchersBox");
    launchersBox.innerHTML = ""; 

    appList.forEach(app => {
    const launcherContainer = document.createElement("div");
    launcherContainer.className = "launcher-container";

    const launcherName = document.createElement("span");
    launcherName.className = "launchername";
    launcherName.textContent = app;

    const checkbox = document.createElement("span");
    checkbox.className = "checkbox";
    checkbox.innerHTML = '<input type="checkbox" value="false">';

    launcherContainer.appendChild(launcherName);
    launcherContainer.appendChild(checkbox);

    checkbox.querySelector('input').addEventListener('change', (event) => {
    handleCheckboxChange(event);
    });

    launchersBox.appendChild(launcherContainer);
    });
};

await genList()

document.addEventListener("DOMContentLoaded", async () => {
});