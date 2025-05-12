# Node CLI Archetype rules

- **Language** : TypeScript
- **Architecture** : Layered, no DI
- **Paradigm** : Functional and Object Oriented
- **Framework** : Node.js
- **Testing** : {{: built-in | Jest }}
- **Linting** : {{: Biome | ESLint }}
- **Formatting** : {{: Biome | Prettier }}

## Dependencies

This archetype is dependency free, use modern node.js built-in functions:

- `fetch` to make http requests
- `styleText` to colorize the console output 
- `parseArgs` to parse command line arguments 
- `node:fs` to read and write files


### DevDependencies

- `Biome` for linting and formatting (alternatively use `ESLint` and `Prettier`)

## Testing

- Use the built-in testing module (alternatively use `Jest`)


## Scripts

- `start` to start the application in production mode
- `dev` to start the application in development mode
- `build` to build the application
- `test` to run the tests
- `lint` to run the linting and formatting


## Configuration

- `.env` to store the environment variables
  - add `.env.example` to the root of the project
  - ignore `.env` in the `.gitignore` file
- `config.ts` to configure the application





