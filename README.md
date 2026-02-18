# Zed Extensions

A collection of extensions for the [Zed](https://zed.dev) editor.

**Repository**: [github.com/lirtsman/zed-extensions](https://github.com/lirtsman/zed-extensions)

## Extensions

### LikeC4

[LikeC4](https://likec4.dev) language support for Zed with syntax highlighting and language server integration.

**Features:**
- Syntax highlighting for `.c4`, `.likec4`, and `.like-c4` files
- Language server integration (code completion, diagnostics, go-to-definition, hover)
- Smart bracket matching and auto-indentation
- Code outline support

See [extensions/likec4/README.md](extensions/likec4/README.md) for detailed documentation.

## Repository Structure

```
zed-extensions/
├── extensions/
│   ├── likec4/                  # LikeC4 Zed extension
│   │   ├── src/                 # Rust extension code
│   │   ├── languages/           # Language configuration & queries
│   │   ├── extension.toml       # Extension manifest
│   │   └── README.md            # Extension documentation
│   │
│   └── tree-sitter-likec4/      # Tree-sitter grammar for LikeC4
│       ├── grammar.js           # Grammar definition
│       ├── src/                  # Generated parser
│       ├── queries/             # Highlighting queries
│       └── README.md            # Grammar documentation
│
└── README.md                    # This file
```

## Development

### Prerequisites

- [Rust](https://rustup.rs/) - For extension development
- [Node.js](https://nodejs.org/) v22+ - For tree-sitter grammar development
- [Zed Editor](https://zed.dev) - For testing

### Installing as Dev Extension

1. Clone this repository
2. Open Zed
3. Run `zed: install dev extension` from the command palette
4. Select the `extensions/likec4` directory

### Building the Tree-sitter Grammar

```bash
cd extensions/tree-sitter-likec4
npm install
npm run generate
```

## License

MIT License - see individual extension directories for details.

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.