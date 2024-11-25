import {run} from "./exec.js";

async function getmodver() {
    const modver = await run("grep '^version=' module.prop | cut -d'=' -f2")
    return modver;
}

async function getroot() {
  try {
    const root = await run("readlink -f ./busybox");
    if (root.match(/magisk/)) {
        return "Magisk";
        } else if (root.match(/ksu/)) {
            return "KernelSU";
        } else if (root.match(/ap/)) {
            return "Apatch";
        }
    } catch (error) {
        return "Unknown";
    }
}

async function getlauncher() {
    const launcher = await run("grep '^description=' module.prop | sed -E 's/.*\\[ Quickstep : ([^ ]+) \\].*/\\1/' | sed 's/✅//g'")
    return launcher;
}

async function updateDashboardValues() {
    document.getElementById("modver").textContent = await getmodver();
    document.getElementById("root").textContent = await getroot();
    document.getElementById("launcher").textContent = await getlauncher();
}

document.addEventListener("DOMContentLoaded", await updateDashboardValues);