// Netlify serverless function for handling newsletter subscription
const fetch = require('node-fetch');

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
    if (!formData.email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Email is required' })
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

    // Mailchimp API configuration
    const apiKey = process.env.MAILCHIMP_API_KEY;
    const listId = process.env.MAILCHIMP_LIST_ID;
    const dataCenter = apiKey ? apiKey.split('-')[1] : null;
    
    // Check if we have the API key and list ID
    if (!apiKey || !listId) {
      console.log('Mailchimp API key or list ID not configured');
      // Return success for now, but log to Netlify
      console.log('Newsletter subscription received:', formData);
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          message: 'Subscription successful (demo mode)',
          data: formData
        })
      };
    }
    
    // Prepare data for Mailchimp
    const subscriberData = {
      email_address: formData.email,
      status: 'subscribed',
      merge_fields: {
        FNAME: formData.name || '',
        COMPANY: formData.company || ''
      }
    };
    
    // Send to Mailchimp API
    const response = await fetch(
      `https://${dataCenter}.api.mailchimp.com/3.0/lists/${listId}/members`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(`apikey:${apiKey}`).toString('base64')}`
        },
        body: JSON.stringify(subscriberData)
      }
    );
    
    const data = await response.json();
    
    // Handle Mailchimp response
    if (!response.ok) {
      // If the email already exists but is unsubscribed, resubscribe them
      if (data.title === 'Member Exists' && data.status === 400) {
        const updateResponse = await fetch(
          `https://${dataCenter}.api.mailchimp.com/3.0/lists/${listId}/members/${data.detail.split(' ')[5].replace(/['"]+/g, '')}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Basic ${Buffer.from(`apikey:${apiKey}`).toString('base64')}`
            },
            body: JSON.stringify({
              status: 'subscribed'
            })
          }
        );
        
        if (!updateResponse.ok) {
          throw new Error('Failed to resubscribe member');
        }
      } else {
        throw new Error(data.title || 'Failed to subscribe to newsletter');
      }
    }
    
    // Return success response
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Subscription successful',
        data: formData
      })
    };
    
  } catch (error) {
    console.error('Error processing subscription:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Internal server error processing your subscription',
        error: error.message
      })
    };
  }
}; 