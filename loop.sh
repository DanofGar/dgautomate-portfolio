#!/bin/bash
set -e

# Ralph Wiggum Loop for dgautomate.dev
#
# Claude runs on HOST (has auth), npm commands run in DOCKER (isolated)
#
# Usage:
#   ./loop.sh plan [N]     - Run planning mode (N iterations, default unlimited)
#   ./loop.sh build [N]    - Run build mode (N iterations, default unlimited)
#   ./loop.sh [N]          - Alias for build mode
#   ./loop.sh parallel     - Run parallel build with multiple agents
#   ./loop.sh setup        - Build Docker image and verify setup

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

MODE="build"
MAX=0
ITER=0

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Docker image name
DOCKER_IMAGE="dgautomate-dev"

# Check if Docker image exists
check_docker_image() {
    if ! docker image inspect "$DOCKER_IMAGE" &>/dev/null; then
        echo -e "${YELLOW}>>> Docker image not found. Building...${NC}"
        build_docker_image
    fi
}

# Build Docker image
build_docker_image() {
    echo -e "${GREEN}>>> Building Docker image: $DOCKER_IMAGE${NC}"
    docker build -t "$DOCKER_IMAGE" -f- . << 'DOCKERFILE'
FROM node:20-slim

RUN apt-get update && apt-get install -y \
    git \
    curl \
    tree \
    ripgrep \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

CMD ["/bin/bash"]
DOCKERFILE
    echo -e "${GREEN}>>> Docker image built successfully${NC}"
}

# Run npm command in Docker
docker_npm() {
    docker run --rm \
        -v "$(pwd)":/workspace \
        -w /workspace \
        -p 3000:3000 \
        "$DOCKER_IMAGE" \
        npm "$@"
}

# Run any command in Docker
docker_run() {
    docker run --rm \
        -v "$(pwd)":/workspace \
        -w /workspace \
        -p 3000:3000 \
        "$DOCKER_IMAGE" \
        "$@"
}

# Export functions for Claude to use via eval
export -f docker_npm
export -f docker_run

# Parse arguments
if [[ "$1" == "setup" ]]; then
    echo "=========================================="
    echo "  Ralph Wiggum Setup"
    echo "=========================================="
    build_docker_image
    echo ""
    echo -e "${GREEN}>>> Setup complete!${NC}"
    echo "Run: ./loop.sh build 5"
    exit 0
elif [[ "$1" == "plan" ]]; then
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

# Verify Docker image exists
check_docker_image

echo "=========================================="
echo "  Ralph Wiggum Loop - dgautomate.dev"
echo "=========================================="
echo -e "Mode: ${GREEN}$MODE${NC}"
echo -e "Max iterations: ${YELLOW}${MAX:-unlimited}${NC}"
echo "Docker image: $DOCKER_IMAGE"
echo "Started: $(date)"
echo "=========================================="
echo ""
echo -e "${YELLOW}NOTE: Claude runs on HOST. npm commands run in DOCKER.${NC}"
echo ""

if [[ "$MODE" == "parallel" ]]; then
    echo ">>> Parallel mode: Spawning agents for independent zones"
    echo ">>> This runs zones in parallel after scaffold is ready"

    # Check if scaffold exists
    if [[ ! -f "package.json" ]] || [[ ! -d "node_modules" ]]; then
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
    echo -e "${GREEN}>>> Iteration $ITER - $(date)${NC}"
    echo ">>> Mode: $MODE"
    echo ""

    # Run the appropriate prompt
    # Claude runs on HOST with --dangerously-skip-permissions
    cat "PROMPT_${MODE}.md" | claude -p --model sonnet --dangerously-skip-permissions

    # Check for completion signals
    if [[ -f ".loop_complete" ]]; then
        echo -e "${GREEN}>>> Loop signaled complete${NC}"
        rm -f .loop_complete
        break
    fi

    # Check max iterations
    if [[ "$MAX" -gt 0 && "$ITER" -ge "$MAX" ]]; then
        echo -e "${YELLOW}>>> Reached max iterations ($MAX)${NC}"
        break
    fi

    # Small delay between iterations
    echo ">>> Sleeping 2 seconds..."
    sleep 2
done

echo ""
echo "=========================================="
echo -e "${GREEN}  Loop Complete${NC}"
echo "=========================================="
echo "Total iterations: $ITER"
echo "Finished: $(date)"
echo "=========================================="

# Show recent commits
echo ""
echo "Recent commits:"
git log --oneline -5 2>/dev/null || echo "(no commits yet)"
