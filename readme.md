# Markdown Editor: A React-Based Markdown Editing Application

## Introduction

Markdown Editor is a powerful, web-based markdown editing tool that allows users to create, view, edit, and manage markdown documents effortlessly. Built with modern web technologies including React, TypeScript, and Styled Components, this application offers a sleek user interface, responsive design, and a range of functionalities to enhance your writing and note-taking experience.

Visit the [GitHub Repository](https://github.com/DanielArzani/markdown-editor) for source code and [LiveSite](https://ephemeral-gumdrop-2c1311.netlify.app/) to see the application in action.

## Key Features

- Document Management: Create, read, update, and delete markdown documents with ease.
- Live Markdown Editing: Write markdown in an editor pane and immediately see the formatted HTML preview.
- Customizable Themes: Toggle between light and dark themes for your comfort.
- Syntax Highlighting: Enhance code readability within your markdown with syntax highlighting.
- Responsive Design: A user-friendly interface that adapts to different screen sizes.
- Local Storage Integration: Save your documents locally to ensure they persist across sessions.
- PWA Support: Installable as a Progressive Web App for offline usage.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (version v18.19.0)
- npm

#### Installation

1. Clone the repository (_or download as a ZIP file_):

```bash
git clone https://github.com/DanielArzani/markdown-editor.git
```

2. Navigate to the project directory:

```bash
cd markdown-editor
```

3. Install dependencies:

```bash
npm install
```

4.Start the application:

```bash
npm run dev
```

## Usage

- Create a New Document: Click on the 'New Document' button to start writing.
- Edit Document: Simply type in the markdown editor pane.
- View Preview: The HTML preview updates in real-time as you type.
- Manage Documents: Save, delete, or select a document from the sidebar.
- Change Themes: Switch between light and dark themes from the sidebar.
- Export/Import Documents: Use the upload button to import and the download button to backup your documents.

## Download

There is a download button for creating backup files in the event that something happens since all your work is saved to localStorage. (_You can also use this to add your documents to another browser_)

Clicking on the download button will download all of your currently saved documents as a JSON file called `backup.json`, if you want, you can store this somewhere as a just in case so that you don't lose your documents.

## Upload

The upload buttons allows you to either upload a backup file or to upload a markdown file.

Note that if you upload the backup file, it will **replace** all of your currently saved documents.

## Saving

There are 3 ways of saving, you can press the big save button on the top right, you can press CMD (_control on windows_) + s, or you can simply type and choose a new document to load and it will automatically save your work.

## Technologies Used

- React
- TypeScript
- Vite
- Styled Components
- Framer Motion
- React Markdown

## License

Distributed under the MIT License. See LICENSE for more information.

## Acknowledgments

- [Frontend Mentor](https://www.frontendmentor.io/challenges/inbrowser-markdown-editor-r16TrrQX9) for the design files for the project
