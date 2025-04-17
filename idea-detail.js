// Get idea ID from URL query parameter
function getIdeaId() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

// Find idea by ID
function findIdeaById(id) {
    return ideasData.find(idea => idea.id === id);
}

// Render idea details
function renderIdeaDetails(idea) {
    if (!idea) {
        window.location.href = 'index.html';
        return;
    }
    
    // Set page title
    document.title = `${idea.title} | Faculty AI Idea Book`;
    
    // Update idea details
    document.getElementById('idea-title').textContent = idea.title;
    document.getElementById('idea-author').textContent = idea.author;
    document.getElementById('idea-department').textContent = idea.department.charAt(0).toUpperCase() + idea.department.slice(1);
    
    // Format date
    const date = new Date(idea.date);
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('idea-date').textContent = formattedDate;
    
    // Description and benefits
    document.getElementById('idea-description').innerHTML = idea.description;
    document.getElementById('idea-benefits').textContent = idea.benefits;
    
    // Resource
    const resourceSection = document.getElementById('resource-section');
    const resourceContainer = document.getElementById('idea-resource');
    
    if (idea.resourceType === 'none' || !idea.resourceUrl) {
        resourceSection.style.display = 'none';
    } else {
        resourceSection.style.display = 'block';
        
        let resourceHTML = '';
        switch(idea.resourceType) {
            case 'pdf':
                resourceHTML = `
                    <div class="pdf-preview">
                        <i class="fas fa-file-pdf"></i>
                        <h4>PDF Document</h4>
                        <p>View or download the attached PDF resource</p>
                        <a href="${idea.resourceUrl}" class="resource-link btn" target="_blank">
                            <i class="fas fa-download"></i> Download PDF
                        </a>
                    </div>
                `;
                break;
            case 'url':
                resourceHTML = `
                    <div class="url-preview">
                        <i class="fas fa-globe"></i>
                        <h4>Web Resource</h4>
                        <p>Visit the linked web resource</p>
                        <a href="${idea.resourceUrl}" class="resource-link btn" target="_blank">
                            <i class="fas fa-external-link-alt"></i> Visit Website
                        </a>
                    </div>
                `;
                break;
            case 'image':
                resourceHTML = `
                    <div class="image-preview">
                        <img src="${idea.resourceUrl}" alt="Resource image for ${idea.title}">
                        <a href="${idea.resourceUrl}" class="resource-link btn" target="_blank">
                            <i class="fas fa-image"></i> View Full Image
                        </a>
                    </div>
                `;
                break;
            case 'video':
                resourceHTML = `
                    <div class="video-preview">
                        <i class="fas fa-video"></i>
                        <h4>Video Resource</h4>
                        <p>Watch the related video</p>
                        <a href="${idea.resourceUrl}" class="resource-link btn" target="_blank">
                            <i class="fas fa-play"></i> Watch Video
                        </a>
                    </div>
                `;
                break;
            default:
                resourceHTML = `
                    <div class="resource-preview">
                        <i class="fas fa-file"></i>
                        <h4>Resource</h4>
                        <p>Access the attached resource</p>
                        <a href="${idea.resourceUrl}" class="resource-link btn" target="_blank">
                            <i class="fas fa-external-link-alt"></i> View Resource
                        </a>
                    </div>
                `;
        }
        
        resourceContainer.innerHTML = resourceHTML;
    }
    
    // AI Tools
    const aiToolsList = document.getElementById('ai-tools-list');
    aiToolsList.innerHTML = '';
    
    idea.aiTools.forEach(tool => {
        const toolName = tool.charAt(0).toUpperCase() + tool.slice(1);
        const li = document.createElement('li');
        li.textContent = toolName;
        aiToolsList.appendChild(li);
    });
    
    // Use Cases
    const useCasesList = document.getElementById('use-cases-list');
    useCasesList.innerHTML = '';
    
    idea.useCases.forEach(useCase => {
        const useCaseName = useCase.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        const li = document.createElement('li');
        li.textContent = useCaseName;
        useCasesList.appendChild(li);
    });
    
    // Tags
    const tagsList = document.getElementById('tags-list');
    tagsList.innerHTML = '';
    
    idea.tags.forEach(tag => {
        const li = document.createElement('li');
        li.textContent = tag;
        tagsList.appendChild(li);
    });
    
    // Contact author link
    const contactAuthorLink = document.getElementById('contact-author');
    const authorEmail = idea.email || "example@stthomas.edu";
    contactAuthorLink.href = `mailto:${authorEmail}?subject=Question about your AI idea: ${idea.title}`;
    
    // Render related ideas
    renderRelatedIdeas(idea);
}

// Render related ideas
function renderRelatedIdeas(currentIdea) {
    const relatedIdeasContainer = document.getElementById('related-ideas-container');
    if (!relatedIdeasContainer) return;
    
    // Find ideas with similar department, AI tools, or use cases
    let relatedIdeas = ideasData.filter(idea => {
        if (idea.id === currentIdea.id) return false;
        
        // Check for shared department
        if (idea.department === currentIdea.department) return true;
        
        // Check for shared AI tools
        if (idea.aiTools.some(tool => currentIdea.aiTools.includes(tool))) return true;
        
        // Check for shared use cases
        if (idea.useCases.some(useCase => currentIdea.useCases.includes(useCase))) return true;
        
        return false;
    });
    
    // Limit to 3 related ideas
    relatedIdeas = relatedIdeas.slice(0, 3);
    
    if (relatedIdeas.length === 0) {
        relatedIdeasContainer.innerHTML = '<p>No related ideas found.</p>';
        return;
    }
    
    relatedIdeasContainer.innerHTML = '';
    
    relatedIdeas.forEach(idea => {
        const ideaCard = document.createElement('div');
        ideaCard.className = 'idea-card';
        
        // Format date
        const date = new Date(idea.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        ideaCard.innerHTML = `
            <div class="idea-header">
                <div class="department-badge ${idea.department}">${idea.department.charAt(0).toUpperCase() + idea.department.slice(1)}</div>
                <div class="idea-date">${formattedDate}</div>
            </div>
            <h3 class="idea-title"><a href="idea-detail.html?id=${idea.id}">${idea.title}</a></h3>
            <p class="idea-author">By ${idea.author}</p>
            <p class="idea-description">${idea.description.substring(0, 100)}...</p>
            <a href="idea-detail.html?id=${idea.id}" class="btn secondary view-details">View Details</a>
        `;
        
        relatedIdeasContainer.appendChild(ideaCard);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    const ideaId = getIdeaId();
    const idea = findIdeaById(ideaId);
    renderIdeaDetails(idea);
});