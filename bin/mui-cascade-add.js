#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { program } = require('commander');

// Simple color helpers using ANSI codes
const colors = {
    red: (text) => `\x1b[31m${text}\x1b[0m`,
    green: (text) => `\x1b[32m${text}\x1b[0m`,
    yellow: (text) => `\x1b[33m${text}\x1b[0m`,
    blue: (text) => `\x1b[34m${text}\x1b[0m`,
    cyan: (text) => `\x1b[36m${text}\x1b[0m`,
    white: (text) => `\x1b[37m${text}\x1b[0m`,
};

// Component registry - maps component names to their source files
const COMPONENTS = {
    button: {
        files: ['Button/Button.tsx'],
        dependencies: [],
    },
    card: {
        files: ['Card/Card.tsx'],
        dependencies: [],
    },
    input: {
        files: ['Input/Input.tsx'],
        dependencies: [],
    },
    modal: {
        files: ['Modal/Modal.tsx'],
        dependencies: [],
    },
};

program
    .name('mui-cascade-add')
    .description('Add components from mui-cascade to your project')
    .argument('<component>', 'Component name to add (e.g., button, card, input)')
    .option('-o, --output <path>', 'Output directory', 'src/components/ui')
    .action(async (componentName, options) => {
        try {
            const component = COMPONENTS[componentName.toLowerCase()];

            if (!component) {
                console.error(colors.red(`Error: Component "${componentName}" not found.`));
                console.log(colors.yellow('\nAvailable components:'));
                Object.keys(COMPONENTS).forEach(name => {
                    console.log(colors.cyan(`  - ${name}`));
                });
                process.exit(1);
            }

            // Get the package root directory
            const packageRoot = path.join(__dirname, '..');
            const sourceDir = path.join(packageRoot, 'src', 'components');
            const targetDir = path.resolve(process.cwd(), options.output);

            console.log(colors.blue(`\nAdding ${componentName} component...\n`));

            // Create target directory if it doesn't exist
            await fs.ensureDir(targetDir);

            // Copy component files
            for (const file of component.files) {
                const sourcePath = path.join(sourceDir, file);
                const fileName = path.basename(file);
                const componentDir = path.dirname(file);
                const targetPath = path.join(targetDir, componentDir);

                await fs.ensureDir(targetPath);
                await fs.copy(sourcePath, path.join(targetPath, fileName));

                console.log(colors.green(`✓ Copied ${file}`));
            }

            console.log(colors.green(`\n✓ Successfully added ${componentName} component!`));
            console.log(colors.cyan(`\nComponent location: ${path.relative(process.cwd(), targetDir)}\n`));

            // Show import example
            const componentDirName = path.dirname(component.files[0]);
            const componentFileName = path.basename(component.files[0], '.tsx');
            console.log(colors.yellow('Import example:'));
            console.log(colors.white(`  import { ${componentFileName} } from './${path.relative('src', path.join(options.output, componentDirName, componentFileName))}';`));
            console.log();

        } catch (error) {
            console.error(colors.red('\nError:'), error.message);
            process.exit(1);
        }
    });

program.parse();
