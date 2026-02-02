#!/bin/bash
set -e

# Ralph Wiggum Loop for dgautomate.dev
# Usage:
#   ./loop.sh plan [N]     - Run planning mode (N iterations, default unlimited)
#   ./loop.sh build [N]    - Run build mode (N iterations, default unlimited)
#   ./loop.sh [N]          - Alias for build mode
#   ./loop.sh parallel     - Run parallel build with multiple agents

MODE="build"
MAX=0
ITER=0

# Parse arguments
if [[ "$1" == "plan" ]]; then
    MODE="plan"
    MAX="${2:-0}"
elif [[ "$1" == "build" ]]; then
    MODE="build"
    MAX="${2:-0}"
elif [[ "$1" == "parallel" ]]; then
    MODE="parallel"
    MAX="${2:-1}"
elif [[ "$1" =~ ^[0-9]+$ ]]; then
    MODE="build"
    MAX="$1"
fi

echo "=========================================="
echo "  Ralph Wiggum Loop - dgautomate.dev"
echo "=========================================="
echo "Mode: $MODE"
echo "Max iterations: ${MAX:-unlimited}"
echo "Started: $(date)"
echo "=========================================="

if [[ "$MODE" == "parallel" ]]; then
    echo ">>> Parallel mode: Spawning agents for independent zones"
    echo ">>> This runs zones in parallel after scaffold is ready"

    # Check if scaffold exists
    if [[ ! -f "package.json" ]]; then
        echo ">>> Scaffold not found. Running setup first..."
        cat PROMPT_build.md | claude -p --model sonnet --dangerously-skip-permissions
    fi

    # Parallel zone builds
    echo ">>> Spawning parallel agents..."
    cat PROMPT_build.md | claude -p --model sonnet --dangerously-skip-permissions \
        --prompt "Build zones in parallel: Sky, Forest, RockyClimb, CoastalOverlook, Services. Use Task tool with subagent_type general-purpose and model sonnet for each."

    echo ">>> Parallel execution complete"
    exit 0
fi

# Standard loop
while :; do
    ITER=$((ITER + 1))
    echo ""
    echo ">>> Iteration $ITER - $(date)"
    echo ">>> Mode: $MODE"
    echo ""

    # Run the appropriate prompt
    cat "PROMPT_${MODE}.md" | claude -p --model sonnet --dangerously-skip-permissions

    # Check for completion signals
    if [[ -f ".loop_complete" ]]; then
        echo ">>> Loop signaled complete"
        rm -f .loop_complete
        break
    fi

    # Check max iterations
    if [[ "$MAX" -gt 0 && "$ITER" -ge "$MAX" ]]; then
        echo ">>> Reached max iterations ($MAX)"
        break
    fi

    # Small delay between iterations
    echo ">>> Sleeping 2 seconds..."
    sleep 2
done

echo ""
echo "=========================================="
echo "  Loop Complete"
echo "=========================================="
echo "Total iterations: $ITER"
echo "Finished: $(date)"
echo "=========================================="

# Show recent commits
echo ""
echo "Recent commits:"
git log --oneline -5
