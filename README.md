# Super Todo - AI-Powered E2E Testing Demonstration

A modern React todo application built specifically to demonstrate **AI agent mode testing** with **Playwright MCP server**. This repository showcases the evolution from naive test generation to production-level E2E testing practices using AI assistance.

## 🎯 Purpose

This super todo app serves as a **live demonstration platform** for:

- **AI-driven test generation** using Playwright MCP server
- **Progressive test development** from basic scripts to production-ready suites
- **Best practices implementation** through AI agent collaboration
- **Production-level E2E architecture** with comprehensive testing rules

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm
- Playwright MCP server configured in your AI environment

### Installation & Setup

```bash
# Clone and install dependencies
npm install

# Start the development server
npm run dev
# App runs on http://localhost:3000

# Install Playwright browsers (if needed)
npx playwright install
```

## 🧪 Testing Demonstration Workflow

This repository demonstrates a **3-stage progression** of AI-assisted test development:

### Stage 1: Naive Test Generation 🐣

**Goal**: Generate basic functional tests with minimal guidance

```bash
# Ask AI to create a simple test
"Generate a Playwright test for Super-Todo that adds a todo and marks it complete"

# Run the generated test
npx playwright test e2e/add-and-complete.spec.ts --headed
```

**Expected Result**: Working but basic test with hardcoded selectors and minimal architecture.

### Stage 2: Best Practices Implementation 🔧

**Goal**: Refactor tests using production patterns with AI assistance

Ask AI to implement:

- **Data-testid locators only** (no text/role selectors)
- **Page Object Model** architecture
- **Centralized test ID management**
- **Component-based test organization**

```bash
# AI refactors the test using production patterns
"Refactor the test to use data-testid locators and extract actions into a TodosPage"

# Run the improved test
npm run test:e2e
```

### Stage 3: Production-Level Architecture 🏗️

**Goal**: Full enterprise-ready testing suite with comprehensive patterns

The AI implements:

- **Three-layer architecture** (Specs → Pages → Components)
- **Centralized TestID enums**
- **Comprehensive waiting strategies**
- **Error handling and reliability patterns**
- **Cross-platform compatibility**

## 🏛️ Production Testing Architecture

### File Structure

```
tests/
├── e2e/              # Test specifications (assertions only)
├── pages/            # Page objects (application pages)
├── components/       # E2E components (reusable UI elements)
└── constants/        # Test IDs and shared constants
```

### Three-Layer Architecture

1. **Spec Files** (`tests/e2e/*.spec.ts`)
   - **Ultra-short** - only high-level actions and assertions
   - Delegate all implementation to pages/components
   - Focus on user journey verification

2. **Page Objects** (`tests/pages/*.page.ts`)
   - Represent actual application pages
   - Handle page-specific workflows
   - Compose e2e-components as needed

3. **E2E Components** (`tests/components/*.ts`)
   - Mirror `src/components` structure
   - Reusable across multiple pages
   - Contain component-specific locators and actions

### Core Testing Rules

✅ **Data-testid locators ONLY** - never use text/role/CSS selectors  
✅ **Assertions only in specs** - pages/components return data, don't assert  
✅ **TestID enums** - centralized constants, no hardcoded strings  
✅ **Component hierarchy** - respect ownership relationships  
✅ **Reliable waiting** - proper state management and navigation handling  
✅ **Cross-platform compatibility** - works on Linux and Windows

## 🛠️ Technology Stack

**Frontend Framework**:

- **React 19** with **TanStack Router** for file-based routing
- **TanStack Query** for server state management
- **TanStack Store** for client state management
- **Tailwind CSS 4** + **Shadcn UI** for styling
- **TypeScript** for type safety

**Testing Stack**:

- **Playwright** for E2E testing
- **Vitest** for unit testing
- **Custom testing architecture** with production-level patterns

**Development Tools**:

- **Vite** for blazing-fast development
- **ESLint** + **Prettier** for code quality
- **Cursor AI** with comprehensive testing rules

## 📋 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Production build

# Testing
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests headless
npm run test:e2e:ui  # Run E2E tests with UI
npm run test:e2e:headed  # Run E2E tests in headed mode
npm run test:e2e:debug   # Debug E2E tests

# Code Quality
npm run lint         # Run ESLint
npm run format       # Run Prettier
npm run check        # Format + lint fix
```

## 🤝 Contributing

This is a demonstration repository. Feel free to:

- Fork and experiment with different AI testing approaches
- Submit issues for testing pattern improvements
- Share your own AI-generated testing experiences
- Contribute additional demo scenarios

## 📄 License

MIT License - feel free to use this demonstration for learning and teaching AI-powered testing approaches.

---

**Ready to see AI-powered testing in action?**

Start with `demo-instructions.md` and watch as simple prompts evolve into production-ready test suites! 🚀
