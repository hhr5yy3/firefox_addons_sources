## Build frontend requirements and commands

- required **node js** version `v18.17.0 (npm v9.6.7)`
- `npm install` - to install packages
- `npm run release` - build frontend, create release .zip arсhive and create source .zip archive for firefox store support

### Clear build **OS:** Ubuntu 22.04.2 LTS
- `node v18.17.0`
- `rm -rf ./node_modules`
- `npm install`
- `npm run release`

## Optional commands
- `npm run prod` - build frontend
- `npm run dev` - build non-minimized frontend and watch for changes