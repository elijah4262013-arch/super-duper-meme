# Contributing to Weather Radar Pro

First off, **thank you for considering contributing** to Weather Radar Pro! We welcome contributions from everyone, whether you're fixing bugs, improving documentation, or adding new features.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Recognition](#recognition)

---

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). We expect all contributors to foster a welcoming and inclusive environment.

---

## Getting Started

### Prerequisites

- A **GitHub account**
- **Git** installed on your computer
- A **text editor** or IDE (VS Code, Sublime Text, etc.)
- A **web browser** for testing (Chrome, Firefox, Safari, Edge)

### Quick Setup

```bash
# Fork the repository
git clone https://github.com/your-username/super-duper-meme.git
cd super-duper-meme

# Add the upstream remote
git remote add upstream https://github.com/elijah4262013-arch/super-duper-meme.git

# Install a local web server (optional, for development)
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

---

## How Can I Contribute?

### Reporting Bugs

This is one of the most valuable ways to contribute! Please use our [Bug Report template](https://github.com/elijah4262013-arch/super-duper-meme/issues/new?template=bug_report.md) and include:

- **Clear description** of the issue
- **Steps to reproduce**
- **Expected vs. actual behavior**
- **Screenshots or videos** (if applicable)
- **Environment information** (browser, OS, etc.)
- **Console errors** (if any)

### Suggesting Enhancements

Have an idea for a new feature? Use our [Feature Request template](https://github.com/elijah4262013-arch/super-duper-meme/issues/new?template=feature_request.md) and include:

- **The problem** you're trying to solve
- **Your proposed solution**
- **Alternatives** you've considered
- **Mockups or diagrams** (if available)

### Working on Issues

1. **Find an issue**: Browse our [open issues](https://github.com/elijah4262013-arch/super-duper-meme/issues) and look for:
   - Issues labeled `good first issue` (beginner-friendly)
   - Issues labeled `help wanted` (needs community help)
   - Issues matching your skills

2. **Claim the issue**: Comment on the issue to let others know you're working on it

3. **Create a branch**:
   ```bash
   git checkout -b fix/issue-number-description
   # or for features:
   git checkout -b feature/description
   ```

4. **Make your changes**: Implement the fix or feature

5. **Test thoroughly**: Ensure your changes work and don't break existing functionality

6. **Commit and push**:
   ```bash
   git add .
   git commit -m "Your descriptive commit message"
   git push origin your-branch-name
   ```

7. **Open a Pull Request**: Go to GitHub and open a PR from your branch

---

## Development Setup

### Local Development

```bash
# Clone your fork
git clone https://github.com/your-username/super-duper-meme.git
cd super-duper-meme

# Start a development server
python -m http.server 8000
```

The application will be available at `http://localhost:8000`. Any changes you make to `index.html` will be reflected immediately upon page refresh.

### Recommended Tools

- **Browser Developer Tools**: For debugging (F12 in most browsers)
- **Prettier**: For code formatting
- **ESLint**: For JavaScript linting
- **Live Server**: VS Code extension for live reloading

### Project Structure

```
super-duper-meme/
├── index.html              # Main application file
├── README.md               # Project documentation
├── CONTRIBUTING.md         # This file
├── LICENSE                 # MPL 2.0 license
└── .github/
    ├── workflows/
    │   └── deploy-pages.yml # GitHub Actions deployment
    └── ISSUE_TEMPLATE/
        ├── bug_report.md
        └── feature_request.md
```

---

## Pull Request Guidelines

### Before Submitting

- [ ] **Read this document** thoroughly
- [ ] **Check for existing PRs** that might conflict with yours
- [ ] **Test your changes** in multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] **Test on mobile** devices if your change affects the UI
- [ ] **Run linting** (if applicable)
- [ ] **Update documentation** if your change affects how users interact with the app

### PR Checklist

Please ensure your Pull Request includes:

1. **Clear title**: Prefix with `[FEATURE]`, `[FIX]`, `[DOCS]`, `[REFACTOR]`, etc.
   - Good: `[FEATURE] Add historical radar data playback`
   - Bad: `Added some stuff`

2. **Descriptive description**: Explain what the PR does and why it's needed

3. **Linked issues**: Reference any related issues using `Closes #123` or `Related to #456`

4. **Screenshots or videos**: For UI changes, include before/after screenshots or a short video

5. **Testing instructions**: Explain how reviewers can test your changes

### PR Template

```markdown
## Summary

Brief description of the changes made.

## Related Issues

- Closes #123
- Related to #456

## Changes Made

- [ ] Added new feature X
- [ ] Fixed bug Y
- [ ] Improved documentation for Z
- [ ] Refactored code in module A

## Testing

Describe how you tested your changes:
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Tested on mobile
- [ ] Manual testing of feature X
- [ ] Verified no regressions in existing features

## Screenshots

Add screenshots or videos showing the changes.

## Additional Notes

Any other relevant information.
```

---

## Coding Standards

### General

- **Indentation**: 4 spaces (no tabs)
- **Line length**: Keep lines under 120 characters when possible
- **File size**: Keep files under 500 lines when possible
- **Naming**: Use descriptive, meaningful names

### HTML

- Use semantic HTML5 elements (`<header>`, `<main>`, `<section>`, etc.)
- Include proper ARIA attributes for accessibility
- Use `data-*` attributes for custom data
- Keep class names lowercase with hyphens (`control-panel`, not `controlPanel`)

### CSS

- **Organization**: Group related styles together
- **Comments**: Use section comments for major UI components
- **Units**: Prefer `rem` for font sizes, `px` for borders, `%` for layouts
- **Colors**: Use HEX or RGB values consistently
- **Specificity**: Avoid overly specific selectors
- **Performance**: Minimize use of expensive properties like `box-shadow` in animations

### JavaScript

- **ES6+ Features**: Use modern JavaScript features (arrow functions, template literals, etc.)
- **Variables**: Use `const` by default, `let` when reassignment is needed
- **Functions**: Use arrow functions for callbacks
- **Error handling**: Include try-catch for external API calls
- **Comments**: Add JSDoc-style comments for functions
- **Modularity**: Keep functions small and focused (single responsibility)

### Example Function

```javascript
/**
 * Calculates the distance between two coordinates using Haversine formula
 * @param {number} lat1 - Latitude of point 1
 * @param {number} lng1 - Longitude of point 1
 * @param {number} lat2 - Latitude of point 2
 * @param {number} lng2 - Longitude of point 2
 * @returns {number} Distance in kilometers
 */
function calculateDistance(lat1, lng1, lat2, lng2) {
    // Implementation here
}
```

---

## Testing

### Manual Testing

Before submitting a PR, please test your changes in:

- [ ] **Desktop browsers**: Chrome, Firefox, Safari, Edge
- [ ] **Mobile browsers**: Chrome for Android, Safari for iOS
- [ ] **Different screen sizes**: Test responsive behavior
- [ ] **Different zoom levels**: Ensure map works at all zoom levels

### Test Cases

For new features, consider the following test scenarios:

1. **Normal usage**: Does the feature work as expected?
2. **Edge cases**: What happens with unusual inputs?
3. **Error conditions**: How does it handle errors?
4. **Performance**: Does it affect application performance?
5. **Accessibility**: Can it be used with keyboard only? Screen reader?
6. **Cross-browser**: Does it work in all supported browsers?

---

## Commit Message Guidelines

### Format

We follow a modified [Conventional Commits](https://www.conventionalcommits.org/) format:

```
type(scope): subject

body

footer
```

### Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat(radar): add velocity mode` |
| `fix` | Bug fix | `fix(ui): correct mobile layout` |
| `docs` | Documentation changes | `docs: update README with usage instructions` |
| `style` | Style changes (CSS, formatting) | `style: improve button hover effects` |
| `refactor` | Code refactoring | `refactor: extract map initialization logic` |
| `perf` | Performance improvements | `perf: optimize radar data rendering` |
| `test` | Adding or fixing tests | `test: add mobile responsiveness tests` |
| `chore` | Build or maintenance tasks | `chore: update dependencies` |

### Scope

The scope should be the component or area affected:
- `radar` - Radar data and visualization
- `ui` - User interface
- `map` - Map functionality
- `config` - Configuration
- `docs` - Documentation
- `styles` - CSS and styling

### Subject

- Use **lowercase**
- Use **imperative mood** ("add" not "added", "fix" not "fixed")
- **No period** at the end
- Keep it **short and descriptive**

### Examples

```bash
# Good
git commit -m "feat(radar): add historical data playback"
git commit -m "fix(ui): correct legend display on mobile"
git commit -m "docs: update README with installation instructions"

# Bad
git commit -m "Added some stuff"
git commit -m "fixed bug"
git commit -m "update"
```

---

## Recognition

All contributors will be recognized in one or more of the following ways:

1. **GitHub Contributors**: Your GitHub profile will appear in the repository's contributors list
2. **Release Notes**: Major contributions will be mentioned in release notes
3. **Special Thanks**: Exceptional contributions may receive special recognition in the README

### Becoming a Maintainer

Regular contributors who demonstrate:
- Deep understanding of the codebase
- Consistent, high-quality contributions
- Willingness to help others
- Commitment to the project's goals

May be invited to become maintainers with write access to the repository.

---

## Need Help?

If you have questions about contributing:

1. **Check this document** for answers
2. **Look at existing PRs** to see examples
3. **Ask in an issue** if you need clarification
4. **Join our community** (if we have one - link to Discord/Slack/etc.)

---

## Resources

- [GitHub Documentation](https://docs.github.com/)
- [Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [Markdown Guide](https://www.markdownguide.org/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Leaflet Documentation](https://leafletjs.com/reference.html)

---

<p align="center">
  Thank you for contributing to Weather Radar Pro! ❤️
</p>
