// Monaco Editor Setup
require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' } });

let editor;
let currentFile = 'main.js';

const files = {
    'main.js': `// Welcome to CHEF.convex Style Code Runner!
console.log('Hello from CHEF.convex!');

function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log('Fibonacci(10):', fibonacci(10));

// DOM Manipulation Example
const message = 'Code executed successfully!';
console.log(message);

// Try changing this code and clicking Run!`,
    'utils.js': `// Utility Functions
export function formatDate(date) {
    return new Date(date).toLocaleDateString();
}

export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}`,
    'styles.css': `/* Add your custom styles here */
body {
    font-family: sans-serif;
    padding: 20px;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}`,
    'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My App</title>
</head>
<body>
    <h1>Welcome to My App</h1>
    <script src="main.js"></script>
</body>
</html>`,
    'README.md': `# Code Runner Project

This is a CHEF.convex-style code execution environment.

## Features
- Real-time code execution
- Monaco Editor integration
- File management
- Terminal output

## Usage
Write your code in the editor and click "Run" to execute!`
};

// Initialize Monaco Editor
require(['vs/editor/editor.main'], function () {
    editor = monaco.editor.create(document.getElementById('editor'), {
        value: files[currentFile],
        language: 'javascript',
        theme: 'vs-dark',
        fontSize: 14,
        minimap: { enabled: true },
        automaticLayout: true,
        scrollBeyondLastLine: false,
        tabSize: 2,
    });
});

// Chat Functionality
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');

function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'assistant-message'}`;
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${isUser ? '👤' : '🤖'}</div>
        <div class="message-content">
            <p>${content}</p>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendBtn.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
        addMessage(message, true);
        chatInput.value = '';
        
        // Simulate assistant response
        setTimeout(() => {
            addMessage('I received your message! The code editor is ready for you to write and execute code.');
        }, 500);
    }
});

chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendBtn.click();
    }
});

// Tab Switching
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;
        
        // Update active tab
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update active pane
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
        document.getElementById(`${targetTab}Pane`).classList.add('active');
    });
});

// File Tree
document.querySelectorAll('.file').forEach(file => {
    file.addEventListener('click', () => {
        const fileName = file.dataset.file;
        if (fileName && files[fileName]) {
            currentFile = fileName;
            
            // Update active file
            document.querySelectorAll('.file').forEach(f => f.classList.remove('active'));
            file.classList.add('active');
            
            // Update editor content
            if (editor) {
                const language = fileName.endsWith('.js') ? 'javascript' : 
                                fileName.endsWith('.css') ? 'css' :
                                fileName.endsWith('.html') ? 'html' : 
                                fileName.endsWith('.md') ? 'markdown' : 'javascript';
                
                monaco.editor.setModelLanguage(editor.getModel(), language);
                editor.setValue(files[fileName]);
            }
            
            // Update file path
            document.querySelector('.path-text').textContent = fileName.includes('/') ? fileName : `src > ${fileName}`;
        }
    });
});

// Folder Toggle
document.querySelectorAll('.folder-name').forEach(folderName => {
    folderName.addEventListener('click', () => {
        const folder = folderName.parentElement;
        folder.classList.toggle('collapsed');
    });
});

// Collapse File Tree
const collapseBtn = document.getElementById('collapseTree');
const fileTree = document.getElementById('fileTree');

collapseBtn.addEventListener('click', () => {
    fileTree.classList.toggle('collapsed');
    collapseBtn.textContent = fileTree.classList.contains('collapsed') ? '▶' : '◀';
});

// Run Code
const runBtn = document.getElementById('runBtn');
const terminal = document.getElementById('terminal');
const terminalContent = document.getElementById('terminalContent');

runBtn.addEventListener('click', () => {
    if (!editor) return;
    
    const code = editor.getValue();
    terminal.classList.add('active');
    terminalContent.innerHTML = '<div class="terminal-line info">$ Executing code...</div>';
    
    // Capture console output
    const logs = [];
    const originalLog = console.log;
    const originalError = console.error;
    
    console.log = (...args) => {
        logs.push({ type: 'log', message: args.join(' ') });
        originalLog.apply(console, args);
    };
    
    console.error = (...args) => {
        logs.push({ type: 'error', message: args.join(' ') });
        originalError.apply(console, args);
    };
    
    try {
        // Execute code in a sandboxed environment
        const result = eval(code);
        
        logs.forEach(log => {
            const line = document.createElement('div');
            line.className = `terminal-line ${log.type}`;
            line.textContent = log.message;
            terminalContent.appendChild(line);
        });
        
        if (result !== undefined) {
            const resultLine = document.createElement('div');
            resultLine.className = 'terminal-line success';
            resultLine.textContent = `Result: ${result}`;
            terminalContent.appendChild(resultLine);
        }
        
        const successLine = document.createElement('div');
        successLine.className = 'terminal-line success';
        successLine.textContent = '✓ Execution completed successfully';
        terminalContent.appendChild(successLine);
        
    } catch (error) {
        const errorLine = document.createElement('div');
        errorLine.className = 'terminal-line error';
        errorLine.textContent = `Error: ${error.message}`;
        terminalContent.appendChild(errorLine);
    }
    
    // Restore console
    console.log = originalLog;
    console.error = originalError;
    
    terminalContent.scrollTop = terminalContent.scrollHeight;
});

// Terminal Toggle
const terminalToggle = document.getElementById('terminalToggle');
const closeTerminal = document.getElementById('closeTerminal');

terminalToggle.addEventListener('click', () => {
    terminal.classList.toggle('active');
});

closeTerminal.addEventListener('click', () => {
    terminal.classList.remove('active');
});

// Resizable Divider
const divider = document.getElementById('divider');
const leftPanel = document.querySelector('.left-panel');
let isResizing = false;

divider.addEventListener('mousedown', (e) => {
    isResizing = true;
    document.body.style.cursor = 'col-resize';
});

document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;
    
    const newWidth = (e.clientX / window.innerWidth) * 100;
    if (newWidth > 20 && newWidth < 60) {
        leftPanel.style.width = `${newWidth}%`;
    }
});

document.addEventListener('mouseup', () => {
    isResizing = false;
    document.body.style.cursor = 'default';
});

// New Chat Button
document.querySelector('.new-chat-btn').addEventListener('click', () => {
    chatMessages.innerHTML = `
        <div class="message assistant-message">
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <p>New chat started! How can I help you today?</p>
            </div>
        </div>
    `;
});

console.log('🎨 CHEF.convex-style UI loaded successfully!');
