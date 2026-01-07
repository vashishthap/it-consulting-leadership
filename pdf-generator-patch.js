// PDF Generation Function for AI Readiness Assessment
// This file contains the PDF generation logic

function generatePDFReport() {
    // Import jsPDF from CDN
    const { jsPDF } = window.jspdf;
    
    if (!jsPDF) {
        alert('PDF library not loaded. Please refresh the page and try again.');
        return;
    }
    
    // Create new PDF document
    const doc = new jsPDF();
    
    // Get data from global variables
    const name = userData.name;
    const company = userData.company;
    const email = userData.email;
    const totalScore = finalTotalScore;
    const pillarScores = finalPillarScores;
    
    // Determine maturity level
    let maturityLevel;
    if (totalScore >= 80) maturityLevel = "Advanced";
    else if (totalScore >= 60) maturityLevel = "Intermediate";
    else if (totalScore >= 40) maturityLevel = "Developing";
    else maturityLevel = "Beginner";
    
    // PAGE 1: COVER PAGE
    // Background color
    doc.setFillColor(10, 10, 15);
    doc.rect(0, 0, 210, 297, 'F');
    
    // Logo/Brand
    doc.setFontSize(24);
    doc.setTextColor(0, 217, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('Nothing But Value', 105, 40, { align: 'center' });
    
    // Title
    doc.setFontSize(32);
    doc.setTextColor(255, 255, 255);
    doc.text('AI Readiness', 105, 80, { align: 'center' });
    doc.text('Assessment Report', 105, 95, { align: 'center' });
    
    // Score circle
    doc.setFillColor(26, 26, 46);
    doc.circle(105, 140, 35, 'F');
    
    // Score
    doc.setFontSize(48);
    if (totalScore >= 80) doc.setTextColor(0, 255, 136);
    else if (totalScore >= 60) doc.setTextColor(0, 217, 255);
    else if (totalScore >= 40) doc.setTextColor(255, 149, 0);
    else doc.setTextColor(255, 51, 102);
    doc.text(totalScore + '/100', 105, 148, { align: 'center' });
    
    // Maturity level
    doc.setFontSize(18);
    doc.text(maturityLevel, 105, 190, { align: 'center' });
    
    // User info
    doc.setFontSize(12);
    doc.setTextColor(160, 160, 176);
    doc.text('Prepared for:', 105, 220, { align: 'center' });
    doc.setTextColor(255, 255, 255);
    doc.text(name, 105, 230, { align: 'center' });
    doc.text(company, 105, 238, { align: 'center' });
    
    // Date
    doc.setTextColor(160, 160, 176);
    const date = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    doc.text(date, 105, 260, { align: 'center' });
    
    // Footer
    doc.setFontSize(10);
    doc.text('nothingbutvalue.com', 105, 280, { align: 'center' });
    
    // PAGE 2: PILLAR BREAKDOWN
    doc.addPage();
    doc.setFillColor(10, 10, 15);
    doc.rect(0, 0, 210, 297, 'F');
    
    // Header
    doc.setFontSize(24);
    doc.setTextColor(0, 217, 255);
    doc.text('Your Pillar Breakdown', 20, 30);
    
    // Pillars
    let yPos = 50;
    const pillars = ['Strategy', 'Data', 'Technology', 'People', 'Governance'];
    
    pillars.forEach(pillar => {
        const score = pillarScores[pillar];
        
        // Pillar name
        doc.setFontSize(14);
        doc.setTextColor(255, 255, 255);
        doc.text(pillar, 20, yPos);
        
        // Score
        if (score >= 80) doc.setTextColor(0, 255, 136);
        else if (score >= 60) doc.setTextColor(0, 217, 255);
        else if (score >= 40) doc.setTextColor(255, 149, 0);
        else doc.setTextColor(255, 51, 102);
        doc.text(score + '%', 180, yPos);
        
        // Progress bar background
        doc.setFillColor(40, 40, 50);
        doc.roundedRect(20, yPos + 5, 170, 8, 4, 4, 'F');
        
        // Progress bar fill
        const barWidth = (score / 100) * 170;
        if (score >= 80) doc.setFillColor(0, 255, 136);
        else if (score >= 60) doc.setFillColor(0, 217, 255);
        else if (score >= 40) doc.setFillColor(255, 149, 0);
        else doc.setFillColor(255, 51, 102);
        doc.roundedRect(20, yPos + 5, barWidth, 8, 4, 4, 'F');
        
        yPos += 30;
    });
    
    // PAGE 3: RECOMMENDATIONS
    doc.addPage();
    doc.setFillColor(10, 10, 15);
    doc.rect(0, 0, 210, 297, 'F');
    
    // Header
    doc.setFontSize(24);
    doc.setTextColor(0, 217, 255);
    doc.text('Key Recommendations', 20, 30);
    
    // Recommendations based on score
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    yPos = 50;
    
    if (totalScore >= 80) {
        doc.text('1. Scale Your AI Initiatives', 20, yPos);
        yPos += 10;
        doc.setFontSize(10);
        doc.setTextColor(160, 160, 176);
        doc.text('   Focus on expanding successful pilots across the organization.', 20, yPos);
        yPos += 20;
        
        doc.setFontSize(12);
        doc.setTextColor(255, 255, 255);
        doc.text('2. Optimize and Measure ROI', 20, yPos);
        yPos += 10;
        doc.setFontSize(10);
        doc.setTextColor(160, 160, 176);
        doc.text('   Implement comprehensive metrics to track AI impact.', 20, yPos);
        yPos += 20;
        
        doc.setFontSize(12);
        doc.setTextColor(255, 255, 255);
        doc.text('3. Build Centers of Excellence', 20, yPos);
        yPos += 10;
        doc.setFontSize(10);
        doc.setTextColor(160, 160, 176);
        doc.text('   Establish AI CoEs to drive innovation and best practices.', 20, yPos);
    } else if (totalScore >= 60) {
        doc.text('1. Strengthen Data Foundation', 20, yPos);
        yPos += 10;
        doc.setFontSize(10);
        doc.setTextColor(160, 160, 176);
        doc.text('   Improve data quality and accessibility for AI initiatives.', 20, yPos);
        yPos += 20;
        
        doc.setFontSize(12);
        doc.setTextColor(255, 255, 255);
        doc.text('2. Expand AI Skills', 20, yPos);
        yPos += 10;
        doc.setFontSize(10);
        doc.setTextColor(160, 160, 176);
        doc.text('   Invest in training programs to build AI capabilities.', 20, yPos);
        yPos += 20;
        
        doc.setFontSize(12);
        doc.setTextColor(255, 255, 255);
        doc.text('3. Scale Pilot Projects', 20, yPos);
        yPos += 10;
        doc.setFontSize(10);
        doc.setTextColor(160, 160, 176);
        doc.text('   Move successful pilots into production environments.', 20, yPos);
    } else if (totalScore >= 40) {
        doc.text('1. Define Clear AI Strategy', 20, yPos);
        yPos += 10;
        doc.setFontSize(10);
        doc.setTextColor(160, 160, 176);
        doc.text('   Develop a comprehensive AI roadmap aligned with business goals.', 20, yPos);
        yPos += 20;
        
        doc.setFontSize(12);
        doc.setTextColor(255, 255, 255);
        doc.text('2. Start with Quick Wins', 20, yPos);
        yPos += 10;
        doc.setFontSize(10);
        doc.setTextColor(160, 160, 176);
        doc.text('   Identify high-impact, low-complexity use cases to demonstrate value.', 20, yPos);
        yPos += 20;
        
        doc.setFontSize(12);
        doc.setTextColor(255, 255, 255);
        doc.text('3. Build Data Infrastructure', 20, yPos);
        yPos += 10;
        doc.setFontSize(10);
        doc.setTextColor(160, 160, 176);
        doc.text('   Establish data governance and quality processes.', 20, yPos);
    } else {
        doc.text('1. Establish AI Vision', 20, yPos);
        yPos += 10;
        doc.setFontSize(10);
        doc.setTextColor(160, 160, 176);
        doc.text('   Define what AI transformation means for your organization.', 20, yPos);
        yPos += 20;
        
        doc.setFontSize(12);
        doc.setTextColor(255, 255, 255);
        doc.text('2. Assess Current State', 20, yPos);
        yPos += 10;
        doc.setFontSize(10);
        doc.setTextColor(160, 160, 176);
        doc.text('   Conduct a thorough assessment of data, technology, and skills.', 20, yPos);
        yPos += 20;
        
        doc.setFontSize(12);
        doc.setTextColor(255, 255, 255);
        doc.text('3. Start Small', 20, yPos);
        yPos += 10;
        doc.setFontSize(10);
        doc.setTextColor(160, 160, 176);
        doc.text('   Begin with a single pilot project to learn and build momentum.', 20, yPos);
    }
    
    // Call to action
    yPos += 40;
    doc.setFillColor(0, 217, 255);
    doc.roundedRect(20, yPos, 170, 40, 8, 8, 'F');
    
    doc.setFontSize(16);
    doc.setTextColor(10, 10, 15);
    doc.text('Ready to Transform Your Business?', 105, yPos + 15, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text('Book a free 30-minute strategy call', 105, yPos + 25, { align: 'center' });
    doc.text('nothingbutvalue.com', 105, yPos + 33, { align: 'center' });
    
    // Save PDF
    const filename = `AI-Readiness-Report-${company.replace(/\s+/g, '-')}-${Date.now()}.pdf`;
    doc.save(filename);
    
    // Show success message
    alert(`✅ Your AI Readiness Report has been downloaded!\n\nWe've also sent a copy to: ${email}`);
}
