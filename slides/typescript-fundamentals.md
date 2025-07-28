---
title: TypeScript Fundamentals
description: Type-safe JavaScript development with TypeScript
slug: typescript-fundamentals
---

# TypeScript Fundamentals

## JavaScript with Superpowers

🔧 Add type safety to your JavaScript

---

## What is TypeScript?

- **Superset** of JavaScript
- Adds static type checking
- Compiles to JavaScript
- Developed by Microsoft
- Industry standard for large projects

---

## Why TypeScript?

### Benefits
- Catch errors at compile time
- Better IDE support
- Improved refactoring
- Self-documenting code
- Better team collaboration

### Trade-offs
- Learning curve
- Build step required
- More verbose code

---

## Basic Types

```typescript
// Primitives
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;

// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob"];

// Any (avoid when possible)
let anything: any = "could be anything";
```

---

## Object Types

```typescript
// Object type annotation
let person: {
  name: string;
  age: number;
  email?: string; // Optional property
} = {
  name: "John",
  age: 30
};

// Index signature
let scores: { [key: string]: number } = {
  math: 95,
  science: 87
};
```

---

## Interfaces

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  isAdmin?: boolean;
}

const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com"
};
```

--

### Extending Interfaces

```typescript
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: string;
  department: string;
}

const emp: Employee = {
  name: "Bob",
  age: 25,
  employeeId: "EMP001",
  department: "Engineering"
};
```

---

## Functions

```typescript
// Function declaration
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// Arrow function
const add = (a: number, b: number): number => a + b;

// Optional parameters
function buildName(first: string, last?: string): string {
  return last ? `${first} ${last}` : first;
}

// Default parameters
function greetUser(name: string = "Guest"): string {
  return `Welcome, ${name}!`;
}
```

---

## Union Types

```typescript
// Union types
type Status = "loading" | "success" | "error";
let currentStatus: Status = "loading";

// Function with union parameters
function formatValue(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value.toString();
}
```

---

## Type Aliases

```typescript
// Type alias
type Point = {
  x: number;
  y: number;
};

type ID = string | number;

// Function type
type EventHandler = (event: Event) => void;

const onClick: EventHandler = (e) => {
  console.log("Clicked!");
};
```

---

## Classes

```typescript
class Animal {
  private name: string;
  protected species: string;

  constructor(name: string, species: string) {
    this.name = name;
    this.species = species;
  }

  public getName(): string {
    return this.name;
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name, "Canine");
  }

  public bark(): void {
    console.log(`${this.getName()} barks!`);
  }
}
```

---

## Generics

```typescript
// Generic function
function identity<T>(arg: T): T {
  return arg;
}

const stringResult = identity<string>("hello");
const numberResult = identity<number>(42);

// Generic interface
interface Container<T> {
  value: T;
  getValue(): T;
}

const stringContainer: Container<string> = {
  value: "hello",
  getValue() { return this.value; }
};
```

---

## Utility Types

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Partial - makes all properties optional
type UserUpdate = Partial<User>;

// Pick - select specific properties
type UserPublic = Pick<User, 'id' | 'name' | 'email'>;

// Omit - exclude specific properties
type UserCreate = Omit<User, 'id'>;
```

---

## Type Guards

```typescript
// typeof guard
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
}

// Custom type guard
function isString(value: any): value is string {
  return typeof value === "string";
}
```

---

## Modules

```typescript
// math.ts
export function add(a: number, b: number): number {
  return a + b;
}

export const PI = 3.14159;

// app.ts
import { add, PI } from './math';

const result = add(2, 3);
console.log(`PI is ${PI}`);
```

---

## Configuration

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

## Best Practices

- ✅ Enable strict mode
- ✅ Use interfaces for object shapes
- ✅ Prefer type unions over any
- ✅ Use meaningful type names
- ✅ Leverage type inference
- ❌ Avoid any type
- ❌ Don't over-engineer types

---

# Start Using TypeScript

Better JavaScript through static typing

[Back to presentations](/slides/)