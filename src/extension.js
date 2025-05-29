const vscode = require('vscode');
const { gitCommands } = require('./gitCommands');

class GitCommandsProvider {
    constructor() {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this.searchText = '';
        this.expandedState = true; // Track global expand state
    }

    refresh(searchText = '') {
        this.searchText = searchText.toLowerCase();
        this._onDidChangeTreeData.fire(undefined);
    }

    getTreeItem(element) {
        if (element.isCategory) {
            const categoryItem = new vscode.TreeItem(
                element.label,
                this.expandedState ? 
                    vscode.TreeItemCollapsibleState.Expanded : 
                    vscode.TreeItemCollapsibleState.Collapsed
            );
            categoryItem.iconPath = new vscode.ThemeIcon('folder');
            categoryItem.contextValue = 'category';
            return categoryItem;
        }

        // This is a command item
        const commandItem = new vscode.TreeItem(
            element.command,
            vscode.TreeItemCollapsibleState.None
        );
        commandItem.description = element.description;
        commandItem.tooltip = `${element.command}\n${element.description}`;
        commandItem.contextValue = 'gitCommand';
        commandItem.iconPath = new vscode.ThemeIcon('symbol-event');

        // Make command clickable for copy
        commandItem.command = {
            command: 'gitCommands.contextCopy',
            title: 'Copy Command',
            arguments: [element]
        };

        return commandItem;
    }

    getChildren(element) {
        if (!element) {
            // Root level - show categories with matching commands
            const categories = [...new Set(gitCommands
                .filter(cmd => 
                    !this.searchText || 
                    cmd.command.toLowerCase().includes(this.searchText) || 
                    cmd.description.toLowerCase().includes(this.searchText)
                )
                .map(cmd => cmd.category))]
                .sort();

            return categories.map(cat => ({
                label: cat,
                isCategory: true
            }));
        }

        // Show filtered commands for the selected category
        return gitCommands
            .filter(cmd => {
                const matchesCategory = cmd.category === element.label;
                const matchesSearch = !this.searchText || 
                    cmd.command.toLowerCase().includes(this.searchText) || 
                    cmd.description.toLowerCase().includes(this.searchText);
                return matchesCategory && matchesSearch;
            });
    }

    // Add method to handle expansion state
    setExpandedState(expanded) {
        this.expandedState = expanded;
        this._onDidChangeTreeData.fire(undefined);
    }
}

function activate(context) {
    const treeDataProvider = new GitCommandsProvider();
    
    // Create Tree View
    const treeView = vscode.window.createTreeView('gitCommandsView', {
        treeDataProvider,
        showCollapseAll: true
    });

    let searchInputBox;

    // Register search box
    const searchBoxCommand = vscode.commands.registerCommand('gitCommands.searchBox', async () => {
        searchInputBox = vscode.window.createInputBox();
        searchInputBox.placeholder = 'Search git commands...';
        searchInputBox.prompt = 'Type to search git commands';
        searchInputBox.value = treeDataProvider.searchText;

        // Handle real-time search as user types
        searchInputBox.onDidChangeValue(text => {
            treeDataProvider.refresh(text);
        });

        searchInputBox.onDidAccept(() => {
            searchInputBox.hide();
        });

        searchInputBox.onDidHide(() => {
            searchInputBox.dispose();
        });

        searchInputBox.show();
    });

    // Register copy command
    const copyCommand = vscode.commands.registerCommand('gitCommands.copyCommand', async (item) => {
        try {
            if (item && item.command) {
                await vscode.env.clipboard.writeText(item.command);
                vscode.window.showInformationMessage(`Copied: ${item.command}`);
            }
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to copy: ${error.message}`);
        }
    });

    // Register run command
    const runCommand = vscode.commands.registerCommand('gitCommands.runCommand', async (item) => {
        try {
            if (item && item.command) {
                const terminal = vscode.window.createTerminal('Git');
                terminal.show();
                terminal.sendText(item.command);
            }
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to run command: ${error.message}`);
        }
    });

    // Register context menu commands
    const copyContextCommand = vscode.commands.registerCommand('gitCommands.contextCopy', (item) => {
        vscode.commands.executeCommand('gitCommands.copyCommand', item);
    });

    const runContextCommand = vscode.commands.registerCommand('gitCommands.contextRun', (item) => {
        vscode.commands.executeCommand('gitCommands.runCommand', item);
    });

    // Register expand all categories
    const expandAll = vscode.commands.registerCommand('gitCommands.expandAll', () => {
        treeDataProvider.setExpandedState(true);
    });

    // Handle built-in collapse all
    treeView.onDidChangeVisibility(() => {
        if (!treeView.visible) {
            treeDataProvider.setExpandedState(false);
        }
    });

    context.subscriptions.push(
        treeView,
        searchBoxCommand,
        copyCommand,
        runCommand,
        copyContextCommand,
        runContextCommand,
        expandAll
    );

    // Start with expanded categories
    treeDataProvider.setExpandedState(true);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}; 