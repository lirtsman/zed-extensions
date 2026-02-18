# LikeC4 Extension for Zed

This extension provides [LikeC4](https://likec4.dev) language support for the [Zed](https://zed.dev) editor.

LikeC4 is a domain-specific language for describing software architecture using the C4 model approach.

## Features

- **Syntax Highlighting**: Full syntax highlighting for `.c4`, `.likec4`, and `.like-c4` files
- **Language Server Integration**: Powered by the official `@likec4/language-server`
  - Code completion
  - Go to definition
  - Hover documentation
  - Diagnostics and error reporting
  - Code formatting
- **Smart Editing**:
  - Auto-closing brackets and quotes
  - Comment toggling (`//` line comments, `/* */` block comments)
  - Auto-indentation

## Installation

### From Zed Extensions

1. Open Zed
2. Open the command palette (`Cmd+Shift+P` on macOS, `Ctrl+Shift+P` on Linux)
3. Search for "zed: extensions"
4. Search for "LikeC4" and click Install

### As a Dev Extension (for development)

1. Clone this repository
2. Open Zed
3. Open the command palette
4. Search for "zed: install dev extension"
5. Select the `extensions/likec4` directory

## Requirements

The extension will automatically download and install the LikeC4 language server. However, you can also install it manually:

```bash
npm install -g @likec4/language-server
```

Or add it to your project's dependencies:

```bash
npm install --save-dev @likec4/language-server
```

## File Types

This extension recognizes the following file extensions:

- `.c4`
- `.likec4`
- `.like-c4`

## Example

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
    description 'A customer of the system'
  }

  webApp = system 'Web Application' {
    description 'The main web application'
  }

  customer -> webApp 'Uses'
}

views {
  view index {
    title 'System Overview'
    include *
    autoLayout TopBottom
  }
}
```

## Configuration

No additional configuration is required. The extension works out of the box.

### Language Server Settings

The LikeC4 language server can be configured through Zed's LSP settings. Add to your `settings.json`:

```json
{
  "lsp": {
    "likec4-language-server": {
      "initialization_options": {
        // Add any language server options here
      }
    }
  }
}
```

## Troubleshooting

### Language server not starting

1. Ensure Node.js (v22+) is installed and available in your PATH
2. Check Zed's log (`zed: open log`) for error messages
3. Try manually installing the language server: `npm install -g @likec4/language-server`

### Syntax highlighting not working

1. Ensure the file has a supported extension (`.c4`, `.likec4`, or `.like-c4`)
2. Restart Zed after installing the extension

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Related Links

- [LikeC4 Documentation](https://likec4.dev)
- [LikeC4 GitHub Repository](https://github.com/likec4/likec4)
- [Zed Editor](https://zed.dev)
- [Zed Extensions Documentation](https://zed.dev/docs/extensions)
- [This Repository](https://github.com/lirtsman/zed-extensions)