function showContent(contentId) {

    document.querySelectorAll('.content').forEach(content => {
        content.classList.remove('active');
    });
    
    document.getElementById(contentId).classList.add('active');
    
    document.querySelectorAll('.navbar a').forEach(link => {
        link.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
}

window.showContent = showContent;