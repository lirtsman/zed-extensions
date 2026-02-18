# tree-sitter-likec4

Tree-sitter grammar for the [LikeC4](https://likec4.dev) architecture modeling language.

## Overview

LikeC4 is a domain-specific language for describing software architecture using the C4 model approach. This tree-sitter grammar provides:

- Accurate syntax parsing for `.c4`, `.likec4`, and `.like-c4` files
- Syntax highlighting queries
- Injection support for embedded Markdown in descriptions
- Integration with editors like Zed, Neovim, Helix, and more

## Installation

### Using npm

```bash
npm install tree-sitter-likec4
```

### Building from source

```bash
git clone https://github.com/lirtsman/zed-extensions.git
cd zed-extensions/extensions/tree-sitter-likec4
npm install
npm run generate
npm run build
```

## Usage

### With tree-sitter CLI

```bash
# Parse a file
tree-sitter parse example.c4

# Run highlighting
tree-sitter highlight example.c4
```

### In Node.js

```javascript
const Parser = require('tree-sitter');
const LikeC4 = require('tree-sitter-likec4');

const parser = new Parser();
parser.setLanguage(LikeC4);

const sourceCode = `
specification {
  element actor {
    style {
      shape person
      color blue
    }
  }
}
`;

const tree = parser.parse(sourceCode);
console.log(tree.rootNode.toString());
```

### In Zed Editor

This grammar is used by the [LikeC4 Zed extension](https://github.com/likec4/zed-likec4).

## Language Features

The grammar supports all LikeC4 language constructs:

### Top-level blocks
- `specification` - Define element kinds, relationship kinds, and tags
- `model` - Define elements and their relationships
- `views` - Define architecture diagram views
- `deployment` - Define deployment diagrams
- `global` - Define global styles and predicates

### Elements and Relationships

```c4
model {
  customer = actor 'Customer' {
    description 'A customer using the system'
  }
  
  system = softwareSystem 'Main System' {
    webapp = container 'Web Application'
    database = container 'Database' {
      technology 'PostgreSQL'
    }
  }
  
  customer -> system.webapp 'Uses'
  system.webapp -> system.database 'Reads/Writes'
}
```

### Views

```c4
views {
  view index {
    title 'System Landscape'
    include *
    autoLayout TopBottom
  }
  
  view systemContext of system {
    include *
    style system {
      color green
    }
  }
}
```

### Styles

```c4
specification {
  element microservice {
    style {
      shape component
      color indigo
      icon tech:kubernetes
    }
  }
}
```

## Query Files

The `queries/` directory contains:

- `highlights.scm` - Syntax highlighting queries
- `injections.scm` - Language injection for embedded Markdown

## Development

### Generate the parser

```bash
npm run generate
```

### Run tests

```bash
npm test
```

### Build WebAssembly version

```bash
npm run build-wasm
```

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

### Adding test cases

Add test files in the `test/corpus/` directory following tree-sitter's test format.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Related Projects

- [LikeC4](https://github.com/likec4/likec4) - The LikeC4 compiler and tooling
- [LikeC4 VS Code Extension](https://marketplace.visualstudio.com/items?itemName=likec4.likec4-vscode) - VS Code support
- [LikeC4 Zed Extension](https://github.com/lirtsman/zed-extensions) - Zed editor support

## Resources

- [LikeC4 Documentation](https://likec4.dev/docs)
- [Tree-sitter Documentation](https://tree-sitter.github.io/tree-sitter/)
- [C4 Model](https://c4model.com/)