# LikeC4 Zed Extension - Development Guide

This document provides instructions for developing, testing, and publishing the LikeC4 extension for Zed editor.

## Project Structure

```
extensions/likec4/
├── extension.toml          # Extension manifest
├── Cargo.toml              # Rust dependencies
├── LICENSE                 # MIT License
├── README.md               # User documentation
├── DEVELOPMENT.md          # This file
├── src/
│   └── likec4.rs          # Extension Rust code (language server integration)
├── languages/
│   └── likec4/
│       ├── config.toml     # Language configuration
│       ├── highlights.scm  # Syntax highlighting queries
│       ├── brackets.scm    # Bracket matching queries
│       ├── indents.scm     # Indentation queries
│       └── outline.scm     # Code outline queries
└── grammars/
    └── likec4.tmLanguage.json  # TextMate grammar (fallback)

extensions/tree-sitter-likec4/
├── grammar.js              # Tree-sitter grammar definition
├── package.json            # npm package configuration
├── LICENSE                 # MIT License
├── README.md               # Grammar documentation
├── queries/
│   ├── highlights.scm      # Highlighting queries
│   └── injections.scm      # Language injection queries
└── src/                    # Generated parser files
```

## Prerequisites

1. **Rust** - Install via [rustup](https://rustup.rs/)
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

2. **Node.js** (v22+) - For tree-sitter grammar development
   ```bash
   brew install node  # or your preferred method
   ```

3. **tree-sitter-cli** - For grammar development
   ```bash
   npm install -g tree-sitter-cli
   ```

4. **Zed Editor** - Install from [zed.dev](https://zed.dev)

## Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/likec4/zed-likec4.git
cd zed-likec4
```

### 2. Generate Tree-sitter Grammar

```bash
cd extensions/tree-sitter-likec4
npm install
npm run generate
```

This creates the parser files in `src/`.

### 3. Install as Dev Extension

1. Open Zed
2. Open Command Palette (`Cmd+Shift+P` on macOS)
3. Run `zed: install dev extension`
4. Navigate to and select the `extensions/likec4` directory

The extension will be compiled and loaded. Check Zed logs (`zed: open log`) for any errors.

## Building

### Extension Code (Rust)

The Rust code is compiled to WebAssembly when installing as a dev extension. To check for compilation errors locally:

```bash
cd extensions/likec4
cargo check
```

### Tree-sitter Grammar

```bash
cd extensions/tree-sitter-likec4

# Generate parser
npm run generate

# Test grammar
npm test

# Build WebAssembly version
npm run build-wasm
```

## Testing

### Manual Testing

1. Install the dev extension in Zed
2. Open a `.c4` file
3. Verify:
   - File is recognized as "LikeC4" (check bottom-right corner)
   - Syntax highlighting works correctly
   - Language server features work (completion, hover, go-to-definition)
   - Comments toggle with `Cmd+/`
   - Brackets auto-close

### Test Files

Use the example file in your project:

```c4
specification {
  element actor {
    style {
      shape person
      color blue
    }
  }
  
  element system {
    style {
      shape rectangle
      color indigo
    }
  }
}

model {
  customer = actor 'Customer' {
    description 'A user of the system'
  }
  
  webapp = system 'Web Application' {
    technology 'Node.js'
  }
  
  customer -> webapp 'Uses'
}

views {
  view index {
    title 'System Overview'
    include *
    autoLayout TopBottom
  }
}
```

### Grammar Testing

```bash
cd extensions/tree-sitter-likec4

# Parse a file
tree-sitter parse ../path/to/test.c4

# Test highlighting
tree-sitter highlight ../path/to/test.c4
```

## Debugging

### Extension Logs

1. Open Zed logs: `Cmd+Shift+P` → `zed: open log`
2. Look for messages containing "likec4" or "LikeC4"

### Verbose Logging

Start Zed from terminal for more detailed logs:

```bash
zed --foreground
```

### Language Server Issues

If the language server fails to start:

1. Check if Node.js is installed: `node --version`
2. Try installing the server manually:
   ```bash
   npm install -g @likec4/language-server
   likec4-language-server --version
   ```
3. Check Zed logs for specific error messages

### Grammar Issues

If syntax highlighting doesn't work:

1. Verify the grammar was generated: check `extensions/tree-sitter-likec4/src/parser.c` exists
2. Test the grammar independently:
   ```bash
   cd extensions/tree-sitter-likec4
   tree-sitter parse test.c4
   ```
3. Check query files for syntax errors

## Publishing

### Tree-sitter Grammar

1. Create repository at `https://github.com/likec4/tree-sitter-likec4`
2. Push the grammar code
3. Tag a release:
   ```bash
   git tag v0.1.0
   git push origin v0.1.0
   ```
4. Publish to npm:
   ```bash
   npm publish
   ```

### Zed Extension

1. Update `extension.toml` with the correct grammar commit hash:
   ```toml
   [grammars.likec4]
   repository = "https://github.com/likec4/tree-sitter-likec4"
   commit = "abc123..."  # actual commit hash
   ```

2. Fork `zed-industries/extensions` repository

3. Add extension as submodule:
   ```bash
   cd extensions
   git submodule add https://github.com/likec4/zed-likec4.git extensions/likec4
   ```

4. Add entry to `extensions.toml`:
   ```toml
   [likec4]
   submodule = "extensions/likec4"
   version = "0.1.0"
   ```

5. Create pull request to `zed-industries/extensions`

## Extension Architecture

### Language Server Integration

The Rust code (`src/likec4.rs`) handles:
- Finding or installing `@likec4/language-server`
- Launching the language server with `--stdio` flag
- Formatting completion labels for better display

### Syntax Highlighting

Tree-sitter queries in `languages/likec4/highlights.scm` map syntax nodes to highlight groups:
- `@keyword` - Language keywords
- `@type` - Element kinds
- `@function` - View names
- `@string` - String literals
- `@property` - Property names
- `@constant` - Colors, values
- `@comment` - Comments

### Language Configuration

`languages/likec4/config.toml` defines:
- File extensions (`.c4`, `.likec4`, `.like-c4`)
- Comment styles (`//`, `/* */`)
- Bracket pairs
- Indentation settings

## Contributing

### Code Style

- Rust: Follow standard Rust formatting (`cargo fmt`)
- Tree-sitter queries: Use consistent indentation and comments
- Documentation: Keep README.md and DEVELOPMENT.md up to date

### Pull Requests

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit PR with clear description

### Reporting Issues

Include:
- Zed version
- OS version
- Steps to reproduce
- Expected vs actual behavior
- Relevant log output

## Resources

- [Zed Extension Documentation](https://zed.dev/docs/extensions)
- [Tree-sitter Documentation](https://tree-sitter.github.io/tree-sitter/)
- [LikeC4 Documentation](https://likec4.dev/docs)
- [LikeC4 Language Server](https://github.com/likec4/likec4/tree/main/packages/language-server)