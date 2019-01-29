[![Build Status](https://dev.azure.com/msft-vott/VoTT/_apis/build/status/vott-react-CI?branchName=master)](https://dev.azure.com/msft-vott/VoTT/_build/latest?definitionId=8&branchName=master)

[![Code Coverage](https://codecov.io/gh/Microsoft/vott-react/branch/master/graph/badge.svg)](https://codecov.io/gh/Microsoft/vott-react)

# vott-react

This repository contains custom React Components designed for the Microsoft Open Source VOTT app (https://github.com/Microsoft/VoTT). The components are written in React with Typescript. While the VOTT app uses Redux to manage state, these components do not require it.

The main components are:
- Drag-and-drop tag manager tool
- Scrolling thumbnail viewer

Supporting components, grouped in main component folder, include:
- Asset Preview for loading photo or video
- Tags Input for adding tags to tag manager
- Editor toolbar for choosing selection style

Components may be viewed in a browser using Storybook by cloning the repo and running `npm run storybook`

# Contributing Guidelines

We welcome issues and pull requests into the project. We ask that you follow these simple guidelines:

**Issues**
- Look for duplicate issues & comment on thread if experiencing something similar
- Fill in template information (platform, OS, version, screenshots, etc.)
  
**Pull Requests**
1. Find an issue to work on, or create a new one
2.  Fork repo, make sure you have latest changes from v2
3. Create branch following naming convention: 
    `git checkout -b issue-<###>-<short-description>`
4. Write code
5. Add unit tests
6. Verify linting and unit tests by running npm test
7. Update docs if needed
8. Rebase on master and resolve conflicts
9.  Submit PR to master branch

Try to keep PRs small to decrease the time required to review and merge

Most contributions require you to agree to a Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us the rights to use your contribution. For details, visit https://cla.microsoft.com.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
