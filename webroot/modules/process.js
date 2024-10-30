import { run } from './exec.js';

const setOverlayButton = document.getElementById("setOverlay");
const overlay = document.getElementById("overlay");
const closeButton = document.getElementById("closeButton");
const rebootButton = document.getElementById("rebootButton");

setOverlayButton.addEventListener("click", async () => {
    const checkedCheckbox = document.querySelector('#launchersBox input[type="checkbox"]:checked');
    overlay.style.display = "flex";
    logging();

    try {
        let qscommand;
        if (checkedCheckbox) {
            qscommand = `su -c sh /data/adb/modules/quickswitch/quickswitch --ch=${checkedCheckbox.closest('.launcher-container').querySelector('.launchername').textContent}`;
        } else {
            qscommand = `su -c sh /data/adb/modules/quickswitch/quickswitch --reset`;
        }
        logging(`Processing command: ${qscommand}\n`);
        const result = await run(`${qscommand}`);
        
        if (result !== undefined) {
            logging(result); 
        } else {
            logging('Command executed with errors or returned undefined.');
        }

    } catch (error) {
        logging( `Error: ${error.message}`);
    }
});

function logging(log) {
    const logContent = document.getElementById("logContent");
    if (typeof log === "undefined") {
        logContent.textContent = "";
    } else {
        logContent.textContent += log + '\n'; 
    }
}

closeButton.addEventListener("click", () => {
    overlay.style.display = "none";
});

rebootButton.addEventListener("click", async () => {
    await run(`reboot`)
});

document.addEventListener("DOMContentLoaded", async () => {
});