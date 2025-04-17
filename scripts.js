// Sample data for the ideas
const ideasData = [
    {
        id: 1,
        title: "Using AI to Grade APA Style",
        author: "Glori Hinck",
        email: "ghinck@stthomas.edu",
        department: "other",
        date: "2025-04-17",
        description: "Correctly presenting citations and a reference list is an important skill for students to develop. This implementation will describe the prompt strategies used to evaluate adherence to APA style in a student-submitted paper and will share a prompt that others can adapt for use in their own courses.<br><br>One recommended teaching strategy is to have students analyze their own papers with this prompt and to make any recommended changes before submitting for grading. A faculty member can quickly and easily run the same prompt for final grading. If completed within the BoodleBox system, the papers are secure and are not used to train the data. The faculty member could also set the course up within BoodleBox so that they do not have to run the prompt again, they can view the results obtained by the student.",
        aiTools: ["other"],
        useCases: ["assessment", "student-feedback", "research"],
        resourceType: "pdf",
        resourceUrl: "resources/apa-style-grading-with-ai.pdf",
        tags: ["citation style", "APA", "grading", "feedback"]
    },
    {
        id: 2,
        title: "AI-Generated Case Studies for Business Ethics",
        author: "Prof. Michael Chen",
        email: "example@stthomas.edu",
        department: "business",
        date: "2024-08-22",
        description: "I use Claude to generate complex, realistic business ethics case studies that reflect current issues and challenges. These AI-generated cases provide students with diverse scenarios to analyze and discuss, helping them develop critical thinking skills in ethical decision-making.",
        benefits: "The AI can quickly generate relevant, contemporary cases that reflect real-world complexity. Students appreciate the variety and relevance of the scenarios.",
        aiTools: ["claude"],
        useCases: ["content-creation", "assessment"],
        resourceType: "url",
        resourceUrl: "https://example.com/business-ethics-cases",
        tags: ["ethics", "case studies", "decision making"]
    },
    {
        id: 3,
        title: "DALL-E for Visual Learning in Art History",
        author: "Dr. Emily Rodriguez",
        email: "example@stthomas.edu",
        department: "humanities",
        date: "2024-07-10",
        description: "I've integrated DALL-E into my art history courses to help students understand artistic styles and techniques. Students can prompt the AI to create images in the style of specific artists or periods, which helps them visualize and comprehend artistic elements more effectively.",
        benefits: "Students develop a deeper understanding of artistic styles and can experiment with creative variations. The visual learning approach has significantly improved concept retention.",
        aiTools: ["dall-e"],
        useCases: ["content-creation", "accessibility"],
        resourceType: "image",
        resourceUrl: "resources/art-history-examples.jpg",
        tags: ["visual learning", "art history", "creativity"]
    },
    {
        id: 4,
        title: "Gemini for Automated Lab Report Feedback",
        author: "Prof. David Kim",
        email: "example@stthomas.edu",
        department: "sciences",
        date: "2024-10-05",
        description: "I use Gemini to provide preliminary feedback on student lab reports in my chemistry courses. The AI reviews reports for scientific accuracy, proper methodology description, and data analysis, giving students immediate feedback before final submission.",
        benefits: "Students receive rapid feedback that helps them improve their work before final grading. This has led to higher quality submissions and better learning outcomes.",
        aiTools: ["gemini"],
        useCases: ["feedback", "assessment"],
        resourceType: "pdf",
        resourceUrl: "resources/lab-report-feedback-system.pdf",
        tags: ["feedback", "science education", "assessment"]
    },
    {
        id: 5,
        title: "Midjourney for Engineering Design Visualization",
        author: "Dr. Robert Martinez",
        email: "example@stthomas.edu",
        department: "engineering",
        date: "2024-09-30",
        description: "I've incorporated Midjourney into my engineering design courses to help students visualize their concepts quickly. Students describe their design ideas, and the AI generates visual representations that they can refine and iterate upon.",
        benefits: "The rapid visualization process accelerates the design iteration cycle and helps students communicate their ideas more effectively. It also encourages more creative thinking in the design process.",
        aiTools: ["midjourney"],
        useCases: ["content-creation", "research"],
        resourceType: "url",
        resourceUrl: "https://example.com/engineering-design-gallery",
        tags: ["design", "visualization", "engineering education"]
    },
    {
        id: 6,
        title: "ChatGPT for Multilingual Discussion Facilitation",
        author: "Prof. Lisa Wong",
        email: "example@stthomas.edu",
        department: "humanities",
        date: "2024-08-15",
        description: "In my global studies courses, I use ChatGPT to facilitate discussions among students who speak different languages. The AI helps translate and clarify communications, enabling more inclusive and diverse classroom discussions.",
        benefits: "International students can participate more fully in discussions, and all students gain exposure to diverse perspectives. The approach has significantly improved classroom inclusion and global awareness.",
        aiTools: ["chatgpt"],
        useCases: ["accessibility", "feedback"],
        resourceType: "url",
        resourceUrl: "https://example.com/multilingual-discussion-guide",
        tags: ["language", "inclusion", "global education"]
    }
];

// DOM elements
const ideasContainer = document.getElementById('ideas-container');
const departmentFilter = document.getElementById('department');
const aiToolFilter = document.getElementById('ai-tool');
const useCaseFilter = document.getElementById('use-case');
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const clearFiltersBtn = document.getElementById('clear-filters');
const ideaCountElement = document.getElementById('idea-count');

// Function to render ideas
function renderIdeas(ideas) {
    if (!ideasContainer) return;
    
    ideasContainer.innerHTML = '';
    
    if (ideas.length === 0) {
        ideasContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No ideas found</h3>
                <p>Try adjusting your filters or search terms</p>
            </div>
        `;
        ideaCountElement.textContent = '0';
        return;
    }
    
    ideaCountElement.textContent = ideas.length;
    
    ideas.forEach(idea => {
        const ideaCard = document.createElement('div');
        ideaCard.className = 'idea-card';
        
        // Format date
        const date = new Date(idea.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        // Create tags HTML
        const tagsHTML = idea.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        
        // Create tools HTML
        const toolsHTML = idea.aiTools.map(tool => {
            let toolName = tool.charAt(0).toUpperCase() + tool.slice(1);
            return `<span class="tool">${toolName}</span>`;
        }).join('');
        
        // Create use cases HTML
        const useCasesHTML = idea.useCases.map(useCase => {
            let useCaseName = useCase.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            return `<span class="use-case">${useCaseName}</span>`;
        }).join('');
        
        // Resource icon based on type
        let resourceIcon = '';
        switch(idea.resourceType) {
            case 'pdf':
                resourceIcon = '<i class="fas fa-file-pdf"></i>';
                break;
            case 'url':
                resourceIcon = '<i class="fas fa-link"></i>';
                break;
            case 'image':
                resourceIcon = '<i class="fas fa-image"></i>';
                break;
            case 'video':
                resourceIcon = '<i class="fas fa-video"></i>';
                break;
            default:
                resourceIcon = '<i class="fas fa-file"></i>';
        }
        
        ideaCard.innerHTML = `
            <div class="idea-header">
                <div class="department-badge ${idea.department}">${idea.department.charAt(0).toUpperCase() + idea.department.slice(1)}</div>
                <div class="idea-date">${formattedDate}</div>
            </div>
            <h3 class="idea-title"><a href="idea-detail.html?id=${idea.id}">${idea.title}</a></h3>
            <p class="idea-author">By ${idea.author}</p>
            <p class="idea-description">${idea.description.substring(0, 150)}${idea.description.length > 150 ? '...' : ''}</p>
            <div class="idea-tools">
                <h4>AI Tools:</h4>
                <div class="tools-list">${toolsHTML}</div>
            </div>
            <div class="idea-use-cases">
                <h4>Use Cases:</h4>
                <div class="use-cases-list">${useCasesHTML}</div>
            </div>
            <div class="idea-tags">
                <h4>Tags:</h4>
                <div class="tags-list">${tagsHTML}</div>
            </div>
            <div class="idea-resource">
                <a href="${idea.resourceUrl}" target="_blank" class="resource-link">
                    ${resourceIcon} View Resource
                </a>
            </div>
            <a href="idea-detail.html?id=${idea.id}" class="btn secondary view-details">View Details</a>
        `;
        
        ideasContainer.appendChild(ideaCard);
    });
}

// Filter ideas based on selected filters and search term
function filterIdeas() {
    const departmentValue = departmentFilter.value;
    const aiToolValue = aiToolFilter.value;
    const useCaseValue = useCaseFilter.value;
    const searchValue = searchInput.value.toLowerCase();
    
    let filteredIdeas = ideasData;
    
    // Filter by department
    if (departmentValue) {
        filteredIdeas = filteredIdeas.filter(idea => idea.department === departmentValue);
    }
    
    // Filter by AI tool
    if (aiToolValue) {
        filteredIdeas = filteredIdeas.filter(idea => idea.aiTools.includes(aiToolValue));
    }
    
    // Filter by use case
    if (useCaseValue) {
        filteredIdeas = filteredIdeas.filter(idea => idea.useCases.includes(useCaseValue));
    }
    
    // Filter by search term
    if (searchValue) {
        filteredIdeas = filteredIdeas.filter(idea => {
            return (
                idea.title.toLowerCase().includes(searchValue) ||
                idea.description.toLowerCase().includes(searchValue) ||
                idea.author.toLowerCase().includes(searchValue) ||
                idea.tags.some(tag => tag.toLowerCase().includes(searchValue))
            );
        });
    }
    
    renderIdeas(filteredIdeas);
}

// Event listeners
if (searchBtn) {
    searchBtn.addEventListener('click', filterIdeas);
}

if (searchInput) {
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            filterIdeas();
        }
    });
}

if (departmentFilter) {
    departmentFilter.addEventListener('change', filterIdeas);
}

if (aiToolFilter) {
    aiToolFilter.addEventListener('change', filterIdeas);
}

if (useCaseFilter) {
    useCaseFilter.addEventListener('change', filterIdeas);
}

if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', function() {
        departmentFilter.value = '';
        aiToolFilter.value = '';
        useCaseFilter.value = '';
        searchInput.value = '';
        filterIdeas();
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderIdeas(ideasData);
});