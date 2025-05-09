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
        const ideaCard = document.createElement('a');
        ideaCard.className = 'idea-card';
        ideaCard.href = `./src/pages/idea-detail.html?id=${idea.id}`;
        
        // Format date
        const date = new Date(idea.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        // Combine all tags
        const allTags = [
            ...idea.tags,
            ...idea.aiTools.map(tool => tool.charAt(0).toUpperCase() + tool.slice(1)),
            ...idea.useCases.map(useCase => useCase.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '))
        ];
        
        // Limit tags to 5
        const maxVisibleTags = 5;
        const visibleTags = allTags.slice(0, maxVisibleTags);
        const remainingTags = allTags.length - maxVisibleTags;
        
        let tagsHTML = visibleTags.map(tag => `<span class="tag">${tag}</span>`).join('');
        if (remainingTags > 0) {
            tagsHTML += `<span class="tag more-tags">+${remainingTags}</span>`;
        }
        
        // Resource icon based on type
        let resourceIcon = '';
        switch(idea.resourceType) {
            case 'pdf':
                resourceIcon = '<i class="fas fa-file-pdf"></i>';
                break;
            case 'doc':
                resourceIcon = '<i class="fas fa-file-word"></i>';
                break;
            case 'ppt':
                resourceIcon = '<i class="fas fa-file-powerpoint"></i>';
                break;
            case 'spreadsheet':
                resourceIcon = '<i class="fas fa-file-excel"></i>';
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
            case 'audio':
                resourceIcon = '<i class="fas fa-file-audio"></i>';
                break;
            default:
                resourceIcon = '<i class="fas fa-file"></i>';
        }
        
        // View Resource button if resourceUrl exists
        let resourceButton = '';
        if (idea.resourceUrl) {
            resourceButton = `<a href="${idea.resourceUrl}" target="_blank" class="resource-link" onclick="event.stopPropagation()">${resourceIcon} View Resource</a>`;
        }
        
        // Define valid departments
        const validDepartments = ['business', 'education', 'engineering', 'humanities', 'sciences', 'other'];
        
        // Get department class or use 'other' if department is not in valid list
        const departmentClass = validDepartments.includes(idea.department) ? idea.department : 'other';
        
        ideaCard.innerHTML = `
            <div class="idea-header">
                <div class="department-badge ${departmentClass}">${idea.department.charAt(0).toUpperCase() + idea.department.slice(1)}</div>
                <div class="idea-date">${formattedDate}</div>
            </div>
            <h3 class="idea-title">${idea.title}</h3>
            <p class="idea-author">By ${idea.author}</p>
            <p class="idea-description">${idea.description.substring(0, 150)}${idea.description.length > 150 ? '...' : ''}</p>
            <div class="idea-tags">
                <h4>Tags:</h4>
                <div class="tags-list">${tagsHTML}</div>
            </div>
            <div class="idea-resource">
                ${resourceButton}
            </div>
        `;
        
        ideasContainer.appendChild(ideaCard);
    });
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
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
                idea.tags.some(tag => tag.toLowerCase().includes(searchValue)) ||
                idea.aiTools.some(tool => tool.toLowerCase().includes(searchValue)) ||
                idea.useCases.some(useCase => useCase.toLowerCase().includes(searchValue))
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
    searchInput.addEventListener('input', debounce(filterIdeas, 300));
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
