# AI Idea Book

A comprehensive platform for sharing and exploring AI implementation ideas in education. This project serves as a prototype and features no backend!

## Features

- Browse AI implementation ideas
- Search functionality for finding specific implementations
- View detailed information about each implementation
- Access associated resources (See section "Supported Resource Types" below)
- Submit new AI implementation ideas (not active, implement in future developement)

## Project Structure

```
├── index.html          # Main entry point
├── src/
│   ├── js/            # JavaScript files
│   │   ├── data.js    # Data structure for ideas
│   │   ├── scripts.js # Core functionality
│   │   ├── submit.js  # Idea submission handling (not active)
│   │   └── idea-detail.js # Idea detail page functionality
│   ├── css/           # Stylesheets
│   └── pages/         # Additional HTML pages (submit.html is not active)
└── public/            # Public assets and resources
```

## Adding a New Idea

To add a new idea to the collection, follow these steps:

1. Open `src/js/data.js` in your code editor
2. Find the `ideasData` array (it will look like `const ideasData = [`)
3. Find the last idea in the array (it will end with a closing bracket `}`)
4. Add a comma `,` after the last idea's closing bracket
5. Copy and paste the template below, then fill in your information:

```javascript
{
    id: [next_number], // Increment from the last ID
    title: "Your Idea Title",
    author: "Your Name",
    email: "Your Email",
    department: "Your Department",
    date: "YYYY-MM-DD",
    description: "Detailed description of your AI implementation",
    aiTools: ["tool1", "tool2"], // See section "Supported AI Tools" below
    useCases: ["use-case1", "use-case2"], // See section "Supported Use Cases" below
    resourceType: "type-here", // See section "Supported Resource Types" below
    resourceUrl: "path/to/resource",
    tags: ["tag1", "tag2"]
}
```

### Example of a Complete Idea

Here's a real example to help you understand how to format your idea:

```javascript
{
    id: 1,
    title: "AI-Powered Quiz Generator",
    author: "Jane Doe",
    email: "jane.doe@university.edu",
    department: "Computer Science",
    date: "2025-05-10",
    description: "This tool uses ChatGPT to automatically generate quiz questions from lecture materials.<br><br><strong>How it works:</strong><br>1. Upload your lecture notes<br>2. Select the difficulty level<br>3. Get a set of questions ready to use<br><br><a href='https://example.com'>Click here to see a demo</a>",
    aiTools: ["chatgpt"],
    useCases: ["assessment"],
    resourceType: "url",
    resourceUrl: "https://example.com",
    tags: ["quiz", "automation", "assessment"]
}
```

### Formatting Your Description

The description field supports HTML formatting. Here are some common formatting options:

1. **Line Breaks**
   - Single line break: `<br>`
   - Double line break: `<br><br>`

2. **Text Styling**
   - Bold text: `<strong>Important text</strong>`
   - Italic text: `<em>Emphasized text</em>`

3. **Lists**
   ```
   <ul>
     <li>First item</li>
     <li>Second item</li>
   </ul>
   ```

4. **Links**
   - `<a href="https://example.com">Click here</a>`

5. **Headings**
   - `<h3>Section Title</h3>`

### Troubleshooting

If you run into any issues:

1. **Common Mistakes to Avoid**
   - Don't forget to add a comma after the previous idea
   - Check that all brackets and braces are properly closed
   - Verify that the ID number is unique and one higher than the last idea

### Adding a New Resource File

If your resource is a file (e.g., PDF, Word document, image, video) and not a web URL, you will need to upload it to the project's repository first.

1.  **Navigate to the `public/resources/` directory** in the GitHub interface of the repository.
2.  **Upload your new file** to this directory.
3.  **File Naming Convention:** It's best practice to name your file using all lowercase letters and to replace any spaces with hyphens (`-`). For example, a file named "My Resource.pdf" should be named `my-resource.pdf`.

Once the file is uploaded and correctly named, you will reference it in your new idea within `src/js/data.js` as follows:

*   Set the `resourceType` field to the file's type/extension (e.g., `pdf`, `docx`, `png`, `mp4`).
*   Set the `resourceUrl` field to the path: `/ai-idea-book/public/resources/YOUR-FILE-NAME.EXTENSION`.
    *   For example, if your file is `my-resource.pdf`, the `resourceUrl` would be `/ai-idea-book/public/resources/my-resource.pdf`.

If your resource is a web URL (like a Panopto video link or an external website), you can:

*   Set the `resourceType` field to `url`.
*   Set the `resourceUrl` field directly to the web address (e.g., `https://your.panopto.video.url.com`).

### Supported Resource Types

- PDF Documents (.pdf)
- Word Documents (.doc, .docx)
- PowerPoint Presentations (.ppt, .pptx)
- Images (.png, .jpg, .jpeg, .gif)
- Videos (.mp4, .mov, .avi)
- Audio Files (.mp3, .wav)
- Spreadsheets (.xls, .xlsx)
- URLs(Panopto)/Websites

### Available AI Tools

- chatgpt
- claude
- gemini
- DALL-E
- Midjourney
- other

### Available Use Cases

- content-creation 
- assessment
- student-feedback
- research
- accessibility

## Commit to GitHub pages

Once a new idea has been properly added, click the "Commit changes..." button.
