# CodeRunnerUI

A modern, CHEF.convex-style code execution environment with a split-pane interface featuring an integrated chat assistant and Monaco editor.

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🚀 Features

- **💬 Integrated Chat Interface** - Built-in AI assistant for interactive development
- **📝 Monaco Editor** - Full-featured code editor with syntax highlighting
- **▶️ Live Code Execution** - Run JavaScript code directly in the browser
- **📁 File Management** - Interactive file tree with multiple file support
- **🖥️ Terminal Output** - Real-time console output and error display
- **🎨 Split-Pane Layout** - Resizable panels for optimal workspace
- **🔄 Multi-Tab Support** - Switch between Code, Preview, and Database views
- **🌙 Dark Theme** - Eye-friendly VS Code-inspired dark interface

## 📸 Screenshot

The interface includes:
- Left panel with chat assistant
- Right panel with Monaco editor
- Collapsible file tree
- Integrated terminal for execution output
- Tab-based navigation

## 🛠️ Tech Stack

- **Monaco Editor** v0.44.0 - Microsoft's powerful code editor
- **Vanilla JavaScript** - No framework dependencies
- **HTML5 & CSS3** - Modern web standards
- **CDN-based** - No build process required

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/goody81/CodeRunnerUI.git
cd CodeRunnerUI
```

2. Open `index.html` in your browser:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve

# Or simply open index.html in your browser
```

3. Navigate to `http://localhost:8000`

## 🎯 Usage

### Running Code

1. Select a file from the file tree (default: `main.js`)
2. Write or edit your JavaScript code in the Monaco editor
3. Click the **▶ Run** button or press the run button in the toolbar
4. View output in the terminal panel at the bottom

### File Navigation

- Click on files in the left sidebar to switch between them
- Supported file types: JavaScript (`.js`), CSS (`.css`), HTML (`.html`), Markdown (`.md`)
- Collapse/expand the file tree using the **◀/▶** button

### Chat Assistant

- Type messages in the chat input at the bottom of the left panel
- Press **Enter** or click the send button
- The assistant can help guide your development workflow

### Terminal

- Toggle terminal visibility with the terminal icon in the tabs area
- Terminal shows console.log output, errors, and execution results
- Close terminal with the **✕** button

## 📁 Project Structure

```
CodeRunnerUI/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling
├── app.js              # Application logic and Monaco setup
└── README.md           # This file
```

## 🔧 Built-in Files

The editor comes with sample files:

- **main.js** - Example JavaScript with Fibonacci function
- **utils.js** - Utility functions (formatDate, debounce)
- **styles.css** - Sample CSS styles
- **index.html** - Sample HTML template
- **README.md** - Sample project documentation

## 🎨 Customization

### Changing Editor Theme

Edit `app.js` line 80-88 to modify Monaco editor settings:

```javascript
monaco.editor.create(document.getElementById('editor'), {
    theme: 'vs-dark',  // Change to 'vs-light' or custom theme
    fontSize: 14,
    // ... other options
});
```

### Adding New Files

Add entries to the `files` object in `app.js`:

```javascript
const files = {
    'newfile.js': `// Your code here`,
    // ... existing files
};
```

## 🔒 Security Note

Code execution uses JavaScript's `eval()` function for demonstration purposes. This is **not recommended for production** use with untrusted code. For production environments, consider:

- Server-side code execution with sandboxing
- Web Workers for isolated execution
- Code sanitization and validation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Roadmap

- [ ] Add more language support (Python, TypeScript, etc.)
- [ ] Implement database viewer functionality
- [ ] Add file save/export functionality
- [ ] Implement collaborative editing
- [ ] Add code formatting and linting
- [ ] Create preview iframe for HTML/CSS rendering

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**goody81**

- GitHub: [@goody81](https://github.com/goody81)

## 🙏 Acknowledgments

- Monaco Editor by Microsoft
- Inspired by CHEF.convex coding environments
- VS Code UI/UX design patterns

---

**Happy Coding! 🎉**
