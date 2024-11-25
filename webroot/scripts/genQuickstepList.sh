pm list packages -e --user 0  | sed 's/package://' | ./busybox xargs -n 1 -P 8 sh -c '
  for pkg; do
    if dumpsys package "$pkg" 2>/dev/null | grep -q "android.intent.category.LAUNCHER_APP"; then
      echo "\"$pkg\""
    fi
  done
' _ | awk 'BEGIN {print "["} {if (NR > 1) printf ", "; printf "%s", $0} END {print "]"}'