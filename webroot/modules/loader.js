const launchers = document.getElementById("launchers");

async function loadModule(moduleName) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = `modules/${moduleName}.js`;

        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load module: ${moduleName}`));
        
        document.body.appendChild(script);
    });
}

launchers.addEventListener("click", async () => {
    const launchersBox = document.getElementById("launchersBox");
    const loadingAnim = document.createElement("div");
    loadingAnim.className = "loadingAnim";
    launchersBox.appendChild(loadingAnim);

    await loadModule("launchers");

    launchersBox.removeChild(loadingAnim);
});