# Clean code rules

## Formatting
- Keep a blank line between imports sections and functions, types, interfaces, classes, etc.
- Avoid blank lines inside blocks of code.
- Be consistent with indentation and spacing between operators.

## Intentional naming
- Use fully descriptive names for variables and functions.
- Start with a verb every function and flag variables (like `is`, `has`, `can`...).  
- Avoid magic numbers and strings by declaring named constants.

## Avoid complexity
- Divide complex instructions into steps.
- Use early return guards.
- Extract and call inner blocks of conditional or repetitive code.
  
## Structure the data
- Prefer structures over primitives.
- Prefer composition over inheritance.
- Place validations near the definitions.

## Cohesion vs coupling
- Place together things that change together.
- Show behavior, hide implementation details.
- Wrap external dependencies with adapters.

## Dependencies
- Keep dependencies to a minimum.
- One and only one direction of dependencies.
- One and only one level of dependencies (don't talk to strangers).

## Principles
- YAGNI: You ain't gonna need it (do the minimum).
- KISS: Keep it simple stupid (do the simplest thing that could work).
- DRY: Don't repeat yourself (do the same thing once, use it everywhere).
