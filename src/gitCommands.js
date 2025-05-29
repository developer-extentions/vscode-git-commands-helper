const gitCommands = [
    // Basic Commands
    {
        command: 'git init',
        description: 'Initialize a new Git repository',
        category: 'Basic'
    },
    {
        command: 'git clone <repository-url>',
        description: 'Clone a repository from remote',
        category: 'Basic'
    },
    {
        command: 'git status',
        description: 'Show working tree status',
        category: 'Basic'
    },
    {
        command: 'git log',
        description: 'Show commit logs',
        category: 'Basic'
    },

    // Staging Commands
    {
        command: 'git add .',
        description: 'Add all files to staging',
        category: 'Staging'
    },
    {
        command: 'git add <file>',
        description: 'Add specific file to staging',
        category: 'Staging'
    },
    {
        command: 'git reset <file>',
        description: 'Unstage a file while retaining changes',
        category: 'Staging'
    },

    // Commit Commands
    {
        command: 'git commit -m \"<message>\"',
        description: 'Commit staged changes',
        category: 'Commit'
    },
    {
        command: 'git commit --amend',
        description: 'Modify the last commit',
        category: 'Commit'
    },

    // Branch Commands
    {
        command: 'git branch',
        description: 'List all branches',
        category: 'Branch'
    },
    {
        command: 'git branch <branch-name>',
        description: 'Create a new branch',
        category: 'Branch'
    },
    {
        command: 'git checkout <branch-name>',
        description: 'Switch to a branch',
        category: 'Branch'
    },
    {
        command: 'git checkout -b <branch-name>',
        description: 'Create and switch to a new branch',
        category: 'Branch'
    },

    // Remote Commands
    {
        command: 'git remote add origin <url>',
        description: 'Add a remote repository',
        category: 'Remote'
    },
    {
        command: 'git push origin <branch>',
        description: 'Push commits to remote repository',
        category: 'Remote'
    },
    {
        command: 'git pull origin <branch>',
        description: 'Pull changes from remote repository',
        category: 'Remote'
    },

    // Stash Commands
    {
        command: 'git stash',
        description: 'Stash changes in working directory',
        category: 'Stash'
    },
    {
        command: 'git stash list',
        description: 'List all stashed changes',
        category: 'Stash'
    },
    {
        command: 'git stash pop',
        description: 'Apply and remove the latest stash',
        category: 'Stash'
    },
    {
        command: 'git stash apply',
        description: 'Apply the latest stash without removing it',
        category: 'Stash'
    },

    // Worktree Commands
    {
        command: 'git worktree add <path> <branch>',
        description: 'Create a new worktree',
        category: 'Worktree'
    },
    {
        command: 'git worktree list',
        description: 'List all worktrees',
        category: 'Worktree'
    },
    {
        command: 'git worktree remove <path>',
        description: 'Remove a worktree',
        category: 'Worktree'
    },

    // Submodule Commands
    {
        command: 'git submodule add <url>',
        description: 'Add a new submodule',
        category: 'Submodule'
    },
    {
        command: 'git submodule init',
        description: 'Initialize submodules',
        category: 'Submodule'
    },
    {
        command: 'git submodule update',
        description: 'Update submodules',
        category: 'Submodule'
    },

    // Advanced Commands
    {
        command: 'git rebase <branch>',
        description: 'Rebase current branch onto another branch',
        category: 'Advanced'
    },
    {
        command: 'git cherry-pick <commit>',
        description: 'Apply changes from specific commit',
        category: 'Advanced'
    },
    {
        command: 'git reset --hard HEAD',
        description: 'Reset to last commit, discarding all changes',
        category: 'Advanced'
    }
];

module.exports = { gitCommands }; 