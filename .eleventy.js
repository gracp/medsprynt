module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  
  // Helper function to safely parse dates
  function safelyParseDate(date) {
    if (!date) return new Date();
    
    try {
      // If it's already a Date object
      if (date instanceof Date) return date;
      
      // Try to parse the date
      const parsedDate = new Date(date);
      
      // Check if the date is valid
      if (isNaN(parsedDate.getTime())) {
        console.warn(`Invalid date: ${date}, using current date instead.`);
        return new Date();
      }
      
      return parsedDate;
    } catch (error) {
      console.warn(`Error parsing date: ${date}, using current date instead.`);
      return new Date();
    }
  }
  
  // Add date filter
  eleventyConfig.addFilter("date", function(date, format) {
    const parsedDate = safelyParseDate(date);
    return parsedDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  });
  
  // Add filter for ISO string date formatting
  eleventyConfig.addFilter("isoDateString", function(date) {
    const parsedDate = safelyParseDate(date);
    return parsedDate.toISOString();
  });
  
  // Add dateToFormat filter for sitemap
  eleventyConfig.addFilter("dateToFormat", function(date, format) {
    const parsedDate = safelyParseDate(date);
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    
    // Basic format 'yyyy-MM-dd'
    return `${year}-${month}-${day}`;
  });
  
  // Add dateIso filter for blog posts
  eleventyConfig.addFilter("dateIso", function(date) {
    const parsedDate = safelyParseDate(date);
    return parsedDate.toISOString();
  });
  
  // Add dateDisplay filter for blog posts
  eleventyConfig.addFilter("dateDisplay", function(date) {
    const parsedDate = safelyParseDate(date);
    return parsedDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  });
  
  // Add debugging shortcode
  eleventyConfig.addShortcode("debug", function(value) {
    return `<pre class="debug">${JSON.stringify(value, null, 2)}</pre>`;
  });
  
  // Add global data object with dynamic buildTime
  eleventyConfig.addGlobalData("buildTime", () => {
    return new Date().toISOString();
  });
  
  // Return the configuration object
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    }
  };
}; 