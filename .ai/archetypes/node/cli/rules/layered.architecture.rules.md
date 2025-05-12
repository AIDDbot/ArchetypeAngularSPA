# Layered Architecture

- Groups related features in layers with a ordered dependency.
- Each layer has a single purpose and responsibility.
- Top-Down dependencies: **Application** -> **Domain** -> **System**
- Scaffolding, one folder per layer:
  
```ascii
src/
├── application/  # User/API interaction
├── domain/       # Business rules
└── system/       # Infrastructure
```

- Features are spread across layers, works well for a small set of features.
- Can create feature or specification folders inside the layers.
- Do not create any other technical folder level inside the layers.


Below is the list of layers and artifacts that can be found in each layer.

## Application Layer
- The **Application** layer is the entry point of the application.
- Configuration and bootstrap
- User interface/interaction
- Logs operational events
- Higher level utilities
- Common artifacts at this layer:
  - **Command**: Extracts and processes user commands and arguments
  - **Component**: Visual elements of user interface
  - **Controller**: Receives and redirects requests to the domain layer

> Depends on the **Domain** and **System** layers.

## Domain Layer
- The **Domain** layer contains the business rules and logic.
- Validation rules
- Service level logic
- Transformations
- Business rules
- Common artifacts at this layer:
  - **Validator**: Data validation
  - **Mapper**: Data transformation
  - **Service**: Main logic, and transformation
  
> Depends on the **System** layer.

## System Layer
- The **System** layer contains the infrastructure and configuration.
- Data type definitions
- Fetch and save data repositories
- Low level utilities
- Common artifacts at this layer:
  - **Adapter**: Wraps and hides external or built-in frameworks dependencies
  - **Decorator**: An adapter that adds behavior to classes or functions
  - **Repository**: Persist or fetch from an store (local or remote)


> Depends on its own artifacts. 

## Artifacts

Each instance should be in a module file with name convention <intention>.<artifact>.ts 

- **Adapter**: Wraps and hides external or built-in frameworks dependencies
- **Command**: Extracts and processes user commands and arguments
- **Component**: Visual elements of user interface
- **Config**: Configuration and bootstrap
- **Controller**: Receives and redirects requests to the domain layer
- **Decorator**: Adds behavior to classes or functions
- **Factory**: Creates and configures instances
- **Mapper**: Data transformation
- **Repository**: Persist or fetch from an store (local or remote)
- **Service**: Main logic, and transformation
- **Singleton**: Ensures a class has only one instance and provide a global point of access to it
- **Type**: Data structures, and default values
- **Util**: Common utilities, not tied to an specific domain
- **Validator**: Data validation

