// Fix for startAssessment function
// This script patches the startAssessment function to show email capture first

(function() {
    // Store the original function
    const originalStartAssessment = window.startAssessment;
    
    // Override with fixed version
    window.startAssessment = function() {
        const modal = document.getElementById('assessmentModal');
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Reset state
            window.currentQuestion = 0;
            window.answers = {};
            
            // Show email capture form first (NOT questions)
            const emailCapture = document.getElementById('emailCapture');
            const questionsContainer = document.getElementById('questionsContainer');
            const resultsContainer = document.getElementById('resultsContainer');
            
            if (emailCapture) emailCapture.style.display = 'block';
            if (questionsContainer) questionsContainer.style.display = 'none';
            if (resultsContainer) resultsContainer.style.display = 'none';
            
            console.log('Assessment started - showing email capture form');
        } else {
            console.error('Assessment modal not found');
        }
    };
    
    console.log('Assessment fix applied successfully');
})();
