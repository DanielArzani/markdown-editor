// This is the markdown syntax, it will be shown to new users and those who have 0 saved files
const MARKDOWN_CHEAT_SHEET =
  'Thanks for visiting [The Markdown Guide](https://www.markdownguide.org)!\n\n' +
  'This Markdown cheat sheet provides a quick overview of all the Markdown syntax elements. ' +
  'It can’t cover every edge case, so if you need more information about any of these elements, ' +
  'refer to the reference guides for [basic syntax](https://www.markdownguide.org/basic-syntax/) ' +
  'and [extended syntax](https://www.markdownguide.org/extended-syntax/).\n\n' +
  '## Table of Contents\n\n' +
  'To create a Table of Contents (TOC), just add `## TOC` in your markdown. ' +
  'Headings following this will be included in the TOC.\n\n' +
  '## Basic Syntax\n\n' +
  'These are the elements outlined in John Gruber’s original design document. ' +
  'All Markdown applications support these elements.\n\n' +
  '### Heading\n\n# H1\n\n## H2\n\n### H3\n\n' +
  '### Bold\n\n**bold text**\n\n' +
  '### Italic\n\n_italicized text_\n\n' +
  '### Blockquote\n\n> blockquote\n\n' +
  '### Ordered List\n\n1. First item\n2. Second item\n3. Third item\n\n' +
  '### Unordered List\n\n- First item\n- Second item\n- Third item\n\n' +
  '### Code\n\n`code`\n\n' +
  '### Horizontal Rule\n\n---\n\n' +
  '### Link\n\n[Markdown Guide](https://www.markdownguide.org)\n\n' +
  '### Image\n\n![alt text](https://www.markdownguide.org/assets/images/tux.png)\n\n' +
  '## Extended Syntax\n\n' +
  'These elements extend the basic syntax by adding additional features. ' +
  'Not all Markdown applications support these elements.\n\n' +
  '### Table\n\n| Syntax    | Description |\n| --------- | ----------- |\n| Header    | Title       |\n| Paragraph | Text        |\n\n' +
  '### Fenced Code Block\n\n```\n{\n  "firstName": "John",\n  "lastName": "Smith",\n  "age": 25\n}\n```\n\n' +
  "### Footnote\n\nHere's a sentence with a footnote. [^1]\n\n" +
  '[^1]: This is the footnote.\n\n' +
  '### Heading ID\n\n### My Great Heading {#custom-id}\n\n' +
  '### Definition List\n\nterm\n: definition\n\n' +
  '### Strikethrough\n\n~~The world is flat.~~\n\n' +
  '### Task List\n\n- [x] Write the press release\n- [ ] Update the website\n- [ ] Contact the media\n\n' +
  '### Emoji\n\nThat is so funny! :joy:\n\n' +
  '(See also [Copying and Pasting Emoji](https://www.markdownguide.org/extended-syntax/#copying-and-pasting-emoji))\n\n' +
  '### Highlight\n\nI need to highlight these ==very important words==.\n\n' +
  '### Subscript\n\nH~2~O\n\n' +
  '### Superscript\n\nX^2^';

export default function mdCheatSheet() {
  return MARKDOWN_CHEAT_SHEET;
}
