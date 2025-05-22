// Netlify serverless function for handling contact form submissions
// This is a fallback in case Netlify Forms is not used or for custom processing

const sgMail = require('@sendgrid/mail');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  try {
    // Parse the form data
    const formData = JSON.parse(event.body);
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.company) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields' })
      };
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid email format' })
      };
    }

    // Check if SendGrid API key is configured
    const apiKey = process.env.SENDGRID_API_KEY;
    
    if (!apiKey) {
      console.log('SendGrid API key not configured');
      // Return success for now, but log to Netlify
      console.log('Form submission received:', formData);
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          message: 'Form submitted successfully (demo mode)',
          data: formData
        })
      };
    }
    
    // Configure SendGrid
    sgMail.setApiKey(apiKey);
    
    const msg = {
      to: process.env.CONTACT_EMAIL || 'hello@medsprynt.com',
      from: 'no-reply@medsprynt.com',
      subject: 'New Contact Form Submission from Med Sprynt Website',
      text: `
        Name: ${formData.name}
        Email: ${formData.email}
        Company: ${formData.company}
        Website: ${formData.website || 'Not provided'}
        Message: ${formData.message || 'Not provided'}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Company:</strong> ${formData.company}</p>
        <p><strong>Website:</strong> ${formData.website || 'Not provided'}</p>
        <p><strong>Message:</strong> ${formData.message || 'Not provided'}</p>
      `,
    };
    
    // Send email
    await sgMail.send(msg);
    
    // Return success response
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Form submitted successfully',
        data: formData
      })
    };
    
  } catch (error) {
    console.error('Error processing form submission:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Internal server error processing your request',
        error: error.message
      })
    };
  }
}; 