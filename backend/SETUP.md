## Setup Commands

### Install
npm install express dotenv cors helmet
npm install -D typescript ts-node nodemon @types/node @types/express @types/cors

### Scripts (package.json)
"dev":   "nodemon --exec ts-node src/server.ts"
"build": "tsc"
"start": "node dist/server.js"

### tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "Node16",
    "moduleResolution": "node16",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}