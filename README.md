# Domain-driven-design example snippet

### Installation and running
1. Clone the repository
2. Navigate to the project directory
3. Install dependencies: ```npm install```
4. Start the application: ```npm start```
5. To run tests: ```npm run test```

### Calling the API with mocked data
- get kitchen by id: Pass in a kitchenId with value of lookupWithFoundKitchen
  - this will return a kitchen object with mocked data

### Folder structure
- aggregate - Contains most of the code for each of the services
  - data - Contains the entity classes that model the data
  - domain - Contains the business logic
  - infrastructure - Contains code that interacts with databases
- app.ts - The entry point for the Express app which contains routes
- service - Contains the controllers responsible for handling the user input and directing it to the appropriate domain services
    - kitchen - Contains the code for the Kitchen service which supports functions such as retrieving, updating, and deleting kitchens

Typical flow goes like this:
- app.ts -> controllers -> aggregate -> domain (use cases) -> infrastructure (database calls)
- both /infrastructure and /domain might use /data

### Conventions
The following is a list of conventions adopted in source code

- Naming conventions: Files kabob-case, Classes/Interfaces PascalCase, Identifiers/functions camelCase
- Write unit tests before pushing commits to master
- Handle asynchronous operations with async/await
- Validate, fail, and throw exceptions as early as possible
- Use const as default
- Sensitive data should be exposed as an environment variable and not committed to source control

### Main technologies used
- Node.js ^18.14
- Express ^4.18
- TypeScript ^4.4
- Jest
- MongoDB
