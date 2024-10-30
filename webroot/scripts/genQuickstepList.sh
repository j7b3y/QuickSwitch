packages=($(pm list packages | sed 's/package://'))
launcher_apps=()

for pkg in "${packages[@]}"; do
    if dumpsys package "$pkg" 2>/dev/null | grep -q 'android.intent.category.LAUNCHER_APP'; then
        launcher_apps+=("\"$pkg\"")
    fi
done

echo "[${launcher_apps[*]}]" | sed 's/ /, /g'