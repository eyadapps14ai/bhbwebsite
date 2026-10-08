#!/bin/zsh
cd "${0:A:h}"
export PATH="/Users/khaledaladdin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH"
node node_modules/vite/bin/vite.js --host 127.0.0.1
