generateReport = () => {
  const { filteredPosts } = this.state;
  const doc = new jsPDF();

  // Set font size for title
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 255); 
  doc.text('ALL NOTES', 105, 15, null, null, 'center'); 

  // Set font size for content
  doc.setFontSize(12);

  // Add content for each note
  filteredPosts.forEach((post, index) => {
    const yPos = 30 + (index * 70); 

    // Add a border around each note
    doc.rect(10, yPos, 190, 50); 

    // Add content inside the border
    doc.text(`Description: ${post.description}`, 15, yPos + 10);
    doc.text(`Note: ${post.note}`, 15, yPos + 30);
  });

  // Save the report
  doc.save('report.pdf');
}
