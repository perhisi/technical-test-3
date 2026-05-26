# React Refactoring Assessment

## Overview
This is a simple Todo List application built with React. While the application works, it contains several issues related to **security**, **performance**, **code quality**, and **best practices** that need to be addressed.

## Time Limit
**2 Days**

## Your Task
Audit the codebase, identify issues, and implement fixes. Your goal is to improve the code quality without breaking existing functionality.

## Setup Instructions

### Prerequisites
- Node.js v22+
- pnpm (latest version)

### Installation
```bash
pnpm install
```

### Development
```bash
pnpm dev
```
Open http://localhost:5173 in your browser.

### Testing
```bash
pnpm test
```

All existing tests must pass after your refactoring.

## What We're Looking For

### 1. **Security Issues**
- Are there any security vulnerabilities?
- Is user input handled safely?
- Are there any exposed secrets or sensitive data?

### 2. **Performance Issues**
- Are there unnecessary re-renders?
- Is state management optimal?
- Are expensive calculations memoized?

### 3. **Code Quality**
- Are React best practices followed?
- Is the code maintainable and readable?
- Are there proper error boundaries?

### 4. **Accessibility**
- Are there accessibility issues?
- Are proper ARIA labels used?

### 5. **Developer Experience**
- Is the code well-structured?
- Are there proper TypeScript types (if applicable)?
- Is error handling adequate?

## Deliverables

1. **Fixed Code** - Implement your improvements
2. **Atomic Commits** - One commit per issue with clear messages

## Rules

- ✅ You may use AI tools (Claude, ChatGPT, Copilot, etc.)
- ✅ You may search documentation online
- ✅ All existing tests must pass
- ❌ Do not add new features
- ❌ Do not rewrite the entire application
- ❌ Do not break existing functionality

## Tips

1. **Read first, code later** - Understand the entire codebase before making changes
2. **Prioritize ruthlessly** - Fix the most critical issues first
3. **Test constantly** - Run tests after each change
4. **Document as you go** - Write notes about what you find
5. **Make surgical fixes** - Change only what's necessary

## Getting Started

1. Run the app and explore its functionality
2. Read through all the code files
3. Run the tests to understand expected behavior
4. Start identifying and documenting issues
5. Implement fixes with atomic commits
6. Verify all tests still pass

## Issues Fixed

### Security Issues
- Issue 1: Removed unused API_KEY constant that was exposed in code
- Issue 15: Replaced `dangerouslySetInnerHTML` with `DOMPurify.sanitize()` to prevent XSS attacks

### Performance Issues
- Issue 4: Added `[state.todos]` dependency array to localStorage useEffect to prevent excessive writes
- Issue 8: Converted `getFilteredTodos()` function to memoized `filteredTodos` with useMemo
- Issue 9: Converted `stats` object to memoized value with useMemo
- Issue 5: Added useCallback to `addTodo` function with proper dependency array
- Issue 14: Keys using indexes could be better with IDs, considered using IDs than index because IDs are stable, React can track items correctly, No bugs when: delete, insert, reorder

### Code Quality
- Issue 6: Changed `Date.now()` to `crypto.randomUUID()` for better unique ID generation
- Issue 7: Added error handling with try/catch to `deleteTodo` and `toggleTodo` functions
- Issue 16: Remove the remaining debug code

### Accessibility
- Issue 11: Added label with `htmlFor` and `aria-label` to input element

### Styling
- Issue 12: Replaced inline styles with CSS classes (`.filter-container`, `.btn`, `.btn.active`, `.empty-state`)

### State Management
- Issue 2: State references: Changed all direct `todos`/`input`/`filter` references to `state.todos`/`state.input`/`state.filter`
- Issue 10: Extract inline event handler to handleKeyPress function for better performance
- Issue 3: Update localStorage loading to use consolidated state management

### UX Improvements
- Issue 13: Added empty state message when no todos are found

Good luck! 🚀
