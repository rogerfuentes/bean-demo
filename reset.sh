#!/usr/bin/env bash
set -euo pipefail

SCENARIO="${1:-main}"
cd "$(dirname "$0")"

# Clean any worktrees Fermata left behind (skip the main worktree)
git worktree list --porcelain | awk '/^worktree/ {print $2}' | tail -n +2 | while read -r wt; do
  git worktree remove --force "$wt" 2>/dev/null || true
done
git worktree prune 2>/dev/null || true

# Reset to requested scenario
git checkout "$SCENARIO"
git reset --hard "$SCENARIO"
git clean -fd

echo "✓ bean reset to $SCENARIO"
