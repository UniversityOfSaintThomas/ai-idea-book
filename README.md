# AI Idea Book

A comprehensive platform for sharing and exploring AI implementation ideas in education. This project serves as a prototype and features no backend!

## Features

- Browse AI implementation ideas
- Search functionality for finding specific implementations
- View detailed information about each implementation
- Access associated resources (PDFs, URLs, videos)
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

1. Open `src/js/data.js`
2. Locate the `ideasData` array
3. Add a new object following this structure:

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
