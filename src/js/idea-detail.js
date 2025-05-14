// Get idea ID from URL query parameter
function getIdeaId() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

// Find idea by ID
function findIdeaById(id) {
    return ideasData.find(idea => idea.id === id);
}

// Get base URL for GitHub Pages
function getBaseUrl() {
    return '/ai-idea-book';
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    const ideaId = getIdeaId();
    const idea = findIdeaById(ideaId);
    renderIdeaDetails(idea);
});

// Define valid departments
const validDepartments = ['business', 'education', 'engineering', 'humanities', 'sciences', 'other'];

// Render idea details
function renderIdeaDetails(idea) {
    if (!idea) {
        window.location.href = 'index.html';
        return;
    }
    
    // Set page title
    document.title = `${idea.title} | AI Idea Book`;
    
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
    
    // Description
    document.getElementById('idea-description').innerHTML = idea.description;
    
    // Resource
    renderResource(idea);
    
    // Tags
    const allTags = [
        ...idea.tags,
        ...idea.aiTools.map(tool => tool.charAt(0).toUpperCase() + tool.slice(1)),
        ...idea.useCases.map(useCase => useCase.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '))
    ];
    renderSidebarTags(allTags);
    
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
        if (idea.department === currentIdea.department) return true;
        if (idea.aiTools.some(tool => currentIdea.aiTools.includes(tool))) return true;
        if (idea.useCases.some(useCase => currentIdea.useCases.includes(useCase))) return true;
        return false;
    });
    
    relatedIdeas = relatedIdeas.slice(0, 3);
    
    if (relatedIdeas.length === 0) {
        relatedIdeasContainer.innerHTML = '<p>No related ideas found.</p>';
        return;
    }
    
    relatedIdeasContainer.innerHTML = '';
    
    relatedIdeas.forEach(idea => {
        const ideaCard = document.createElement('a');
        ideaCard.className = 'idea-card';
        ideaCard.href = `idea-detail.html?id=${idea.id}`;
        
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
        
        // View Resource button if resourceUrl exists
        let resourceButton = '';
        if (idea.resourceUrl) {
            resourceButton = `<a href="${idea.resourceUrl}" target="_blank" class="resource-link" onclick="event.stopPropagation()">${resourceIcon} View Resource</a>`;
        }
        
        // Get department class or use 'other' if department is not in valid list
        const departmentClass = validDepartments.includes(idea.department) ? idea.department : 'other';
        
        ideaCard.innerHTML = `
            <div class="idea-header">
                <div class="department-badge ${departmentClass}">${idea.department.charAt(0).toUpperCase() + idea.department.slice(1)}</div>
                <div class="idea-date">${formattedDate}</div>
            </div>
            <h3 class="idea-title">${idea.title}</h3>
            <p class="idea-author">By ${idea.author}</p>
            <p class="idea-description">${idea.description.substring(0, 100)}...</p>
            <div class="idea-tags">
                <div class="tags-list">${tagsHTML}</div>
            </div>
            <div class="idea-resource">${resourceButton}</div>
        `;
        
        relatedIdeasContainer.appendChild(ideaCard);
    });
}

function getResourceTypeFromUrl(url) {
    const ext = url.split('.').pop().toLowerCase().split('?')[0].split('#')[0];
    if (["mp3", "wav", "ogg", "aac", "m4a"].includes(ext)) return "audio";
    if (["pdf"].includes(ext)) return "pdf";
    if (["doc", "docx"].includes(ext)) return "office";
    if (["ppt", "pptx"].includes(ext)) return "office";
    if (["xls", "xlsx"].includes(ext)) return "office";
    if (["mp4", "webm", "mov", "avi"].includes(ext)) return "video";
    if (["png", "jpg", "jpeg", "gif", "bmp", "svg", "webp"].includes(ext)) return "image";
    if (url.startsWith("http")) return "url";
    return "other";
}

function renderResource(idea) {
    const resourceSection = document.getElementById('idea-resource');
    if (!resourceSection) return;

    if (!idea.resourceUrl) {
        resourceSection.innerHTML = '<p>No resource available</p>';
        return;
    }

    // Always infer resourceType from the file extension
    let resourceType = getResourceTypeFromUrl(idea.resourceUrl);
    const isClaudeArtifact = idea.resourceUrl.includes('claude.site/artifacts');
    const encodedUrl = encodeURIComponent(idea.resourceUrl);

    // Header
    const resourceHeader = document.createElement('div');
    resourceHeader.className = 'resource-header';
    const resourceTitle = document.createElement('h3');
    resourceTitle.textContent = 'Resources';
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'resource-buttons';

    // Buttons
    const openBtn = document.createElement('a');
    openBtn.href = idea.resourceUrl;
    openBtn.target = '_blank';
    openBtn.className = 'resource-external-link';
    openBtn.innerHTML = '<i class="fas fa-external-link-alt"></i> Open in New Tab';
    const downloadBtn = document.createElement('a');
    downloadBtn.href = idea.resourceUrl;
    downloadBtn.download = '';
    downloadBtn.className = 'resource-download-link';
    downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download';

    // Button logic
    if (resourceType === 'pdf' || resourceType === 'image' || resourceType === 'video') {
        buttonContainer.appendChild(openBtn);
        buttonContainer.appendChild(downloadBtn);
    } else if (resourceType === 'url' || isClaudeArtifact) {
        buttonContainer.appendChild(openBtn);
    } else if (resourceType === 'office') {
        buttonContainer.appendChild(downloadBtn);
    } else if (resourceType === 'audio') {
        buttonContainer.appendChild(downloadBtn);
    } else {
        buttonContainer.appendChild(openBtn);
        buttonContainer.appendChild(downloadBtn);
    }

    resourceHeader.appendChild(resourceTitle);
    resourceHeader.appendChild(buttonContainer);
    resourceSection.innerHTML = '';
    resourceSection.appendChild(resourceHeader);

    // Content
    let resourceHTML = '';
    let showFullscreen = false;
    let iframeId = 'resource-iframe';

    if (isClaudeArtifact) {
        resourceHTML = `
            <div class="resource-message">
                <div class="message-content">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>This resource cannot be displayed directly due to security restrictions.</p>
                    <p>Please click the <b>Open in New Tab</b> button above to view the content.</p>
                </div>
            </div>`;
    } else {
        switch(resourceType) {
            case 'pdf':
                showFullscreen = true;
                resourceHTML = `
                    <div class="pdf-container resource-has-fullscreen">
                        <iframe id="${iframeId}" src="${idea.resourceUrl}#toolbar=0" style="width: 100%; height: 480px; border: none;" allowfullscreen></iframe>
                    </div>`;
                break;
            case 'url':
                showFullscreen = true;
                resourceHTML = `
                    <div class="url-container resource-has-fullscreen">
                        <iframe id="${iframeId}" src="${idea.resourceUrl}" style="width: 100%; height: 480px; border: none;" allowfullscreen></iframe>
                    </div>`;
                break;
            case 'office':
                resourceHTML = `
                    <div class="resource-message">
                        <div class="message-content">
                            <i class="fas fa-exclamation-circle"></i>
                            <p>This Office document cannot be embedded due to browser and host limitations.</p>
                            <p>To view the resource, please click the <b>Download</b> button above and open the file on your device.</p>
                        </div>
                    </div>`;
                break;
            case 'video':
                showFullscreen = true;
                resourceHTML = `
                    <div class="video-container resource-has-fullscreen" style="display: flex; justify-content: center; align-items: center; min-height: 320px;">
                        <video id="dynamic-video" controls style="max-width: 100%; max-height: 720px; border-radius: 8px; background: #000; display: block; margin: auto;">
                            <source src="${idea.resourceUrl}">
                            Your browser does not support the video tag.
                        </video>
                    </div>`;
                break;
            case 'audio':
                resourceHTML = `
                    <div class="audio-container">
                        <div class="custom-audio-player">
                            <div class="audio-info">
                                <i class="fas fa-music"></i>
                                <span class="audio-title">Audio Resource</span>
                            </div>
                            <div class="audio-controls">
                                <button class="play-pause-btn">
                                    <i class="fas fa-play"></i>
                                </button>
                                <div class="progress-container">
                                    <div class="progress-bar">
                                        <div class="progress"></div>
                                    </div>
                                    <div class="time-info">
                                        <span class="current-time">0:00</span>
                                        <span class="duration">0:00</span>
                                    </div>
                                </div>
                                <div class="volume-container">
                                    <i class="fas fa-volume-up"></i>
                                    <input type="range" class="volume-slider" min="0" max="100" value="100">
                                </div>
                            </div>
                            <audio id="audio-player" src="${idea.resourceUrl}" preload="metadata"></audio>
                        </div>
                    </div>`;
                break;
            case 'image':
                resourceHTML = `
                    <div class="image-container" id="dynamic-image-container" style="display: flex; justify-content: center; align-items: center; min-height: 320px;">
                        <img id="dynamic-image" src="${idea.resourceUrl}" alt="Resource Image" style="max-width: 100%; max-height: 720px; margin: auto; display: block; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
                    </div>`;
                break;
            default:
                resourceHTML = `
                    <div class="resource-message">
                        <div class="message-content">
                            <i class="fas fa-exclamation-circle"></i>
                            <p>This resource type cannot be displayed directly. Please use the buttons above to access the file.</p>
                        </div>
                    </div>`;
        }
    }

    const resourceContent = document.createElement('div');
    resourceContent.className = 'resource-content';
    resourceContent.innerHTML = resourceHTML;
    resourceSection.appendChild(resourceContent);

    // Custom audio player logic
    if (resourceType === 'audio') {
        const audioPlayer = document.getElementById('audio-player');
        const playPauseBtn = resourceContent.querySelector('.play-pause-btn');
        const progressBar = resourceContent.querySelector('.progress');
        const currentTimeSpan = resourceContent.querySelector('.current-time');
        const durationSpan = resourceContent.querySelector('.duration');
        const volumeSlider = resourceContent.querySelector('.volume-slider');

        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            seconds = Math.floor(seconds % 60);
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }

        audioPlayer.addEventListener('timeupdate', () => {
            const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressBar.style.width = `${progress}%`;
            currentTimeSpan.textContent = formatTime(audioPlayer.currentTime);
        });
        audioPlayer.addEventListener('loadedmetadata', () => {
            durationSpan.textContent = formatTime(audioPlayer.duration);
        });
        playPauseBtn.addEventListener('click', () => {
            if (audioPlayer.paused) {
                audioPlayer.play().catch(error => {
                    console.error('Error playing audio:', error);
                });
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                audioPlayer.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
        volumeSlider.addEventListener('input', (e) => {
            audioPlayer.volume = e.target.value / 100;
        });
        const progressContainer = resourceContent.querySelector('.progress-container');
        progressContainer.addEventListener('click', (e) => {
            const rect = progressContainer.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            audioPlayer.currentTime = pos * audioPlayer.duration;
        });
        audioPlayer.addEventListener('error', (e) => {
            console.error('Audio loading error:', e);
            resourceContent.innerHTML = `
                <div class="resource-message">
                    <div class="message-content">
                        <i class="fas fa-exclamation-circle"></i>
                        <p>Error loading audio file.</p>
                        <p>Please try downloading the file instead.</p>
                    </div>
                </div>`;
        });
    }

    // Add fullscreen button for embeddable types
    if ((resourceType === 'pdf' || resourceType === 'url' || resourceType === 'video' || resourceType === 'image') && !isClaudeArtifact) {
        const fullscreenBtn = document.createElement('button');
        fullscreenBtn.className = 'fullscreen-btn';
        fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i> Fullscreen';
        let targetElem = null;
        if (resourceType === 'image') {
            targetElem = document.getElementById('dynamic-image-container');
        } else if (resourceType === 'video') {
            targetElem = resourceSection.querySelector('.video-container');
        } else {
            targetElem = document.getElementById(iframeId);
        }
        fullscreenBtn.onclick = function() {
            if (document.fullscreenElement === targetElem) {
                // Exit fullscreen
                if (document.exitFullscreen) document.exitFullscreen();
                else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
                else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
                else if (document.msExitFullscreen) document.msExitFullscreen();
            } else {
                // Enter fullscreen
                if (targetElem.requestFullscreen) targetElem.requestFullscreen();
                else if (targetElem.webkitRequestFullscreen) targetElem.webkitRequestFullscreen();
                else if (targetElem.mozRequestFullScreen) targetElem.mozRequestFullScreen();
                else if (targetElem.msRequestFullscreen) targetElem.msRequestFullscreen();
            }
        };
        // Listen for fullscreen changes to update button
        function updateFullscreenBtn() {
            if (document.fullscreenElement === targetElem) {
                fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i> Exit Fullscreen';
            } else {
                fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i> Fullscreen';
            }
        }
        document.addEventListener('fullscreenchange', updateFullscreenBtn);
        document.addEventListener('webkitfullscreenchange', updateFullscreenBtn);
        document.addEventListener('mozfullscreenchange', updateFullscreenBtn);
        document.addEventListener('MSFullscreenChange', updateFullscreenBtn);
        const container = resourceSection.querySelector('.resource-has-fullscreen') || document.getElementById('dynamic-image-container');
        if (container) {
            container.style.position = 'relative';
            fullscreenBtn.style.position = 'absolute';
            fullscreenBtn.style.top = '16px';
            fullscreenBtn.style.right = '16px';
            fullscreenBtn.style.zIndex = '10';
            container.appendChild(fullscreenBtn);
        }
    }

    // Dynamic sizing for images
    if (resourceType === 'image') {
        const img = document.getElementById('dynamic-image');
        const container = document.getElementById('dynamic-image-container');
        img.addEventListener('load', function() {
            const w = img.naturalWidth;
            const h = img.naturalHeight;
            // Always use fixed width, dynamic height
            const maxWidth = 720;
            const containerWidth = Math.min(maxWidth, window.innerWidth * 0.98);
            let aspect = w / h;
            let height = containerWidth / aspect;
            let maxHeight = Math.min(720, window.innerHeight * 0.8);
            if (height > maxHeight) {
                height = maxHeight;
            }
            container.style.width = containerWidth + 'px';
            container.style.height = height + 'px';
            container.style.maxWidth = '100%';
            container.style.maxHeight = maxHeight + 'px';
            container.style.display = 'flex';
            container.style.justifyContent = 'center';
            container.style.alignItems = 'center';
        });
    }
    // Dynamic sizing for videos
    if (resourceType === 'video') {
        const video = document.getElementById('dynamic-video');
        const container = resourceSection.querySelector('.video-container');
        video.addEventListener('loadedmetadata', function() {
            const w = video.videoWidth;
            const h = video.videoHeight;
            // Always use fixed width, dynamic height
            const maxWidth = 720;
            const containerWidth = Math.min(maxWidth, window.innerWidth * 0.98);
            let aspect = w / h;
            let height = containerWidth / aspect;
            let maxHeight = Math.min(720, window.innerHeight * 0.8);
            if (height > maxHeight) {
                height = maxHeight;
            }
            container.style.width = containerWidth + 'px';
            container.style.height = height + 'px';
            container.style.maxWidth = '100%';
            container.style.maxHeight = maxHeight + 'px';
            container.style.display = 'flex';
            container.style.justifyContent = 'center';
            container.style.alignItems = 'center';
        });
    }
}

// Render tags in the sidebar with expandable logic
function renderSidebarTags(tags) {
    const tagsList = document.getElementById('tags-list');
    tagsList.innerHTML = '';
    const maxVisible = 5;
    let expanded = false;

    function renderTags() {
        tagsList.innerHTML = '';
        let visibleTags = expanded ? tags : tags.slice(0, maxVisible);
        visibleTags.forEach(tag => {
            const tagEl = document.createElement('span');
            tagEl.className = 'tag';
            tagEl.textContent = tag;
            tagsList.appendChild(tagEl);
        });
        if (!expanded && tags.length > maxVisible) {
            const moreTag = document.createElement('span');
            moreTag.className = 'tag more-tags';
            moreTag.textContent = `+${tags.length - maxVisible} more`;
            moreTag.style.cursor = 'pointer';
            moreTag.onclick = () => {
                expanded = true;
                renderTags();
            };
            tagsList.appendChild(moreTag);
        } else if (expanded && tags.length > maxVisible) {
            const lessTag = document.createElement('span');
            lessTag.className = 'tag more-tags';
            lessTag.textContent = 'Show less';
            lessTag.style.cursor = 'pointer';
            lessTag.onclick = () => {
                expanded = false;
                renderTags();
            };
            tagsList.appendChild(lessTag);
        }
    }
    renderTags();
}
