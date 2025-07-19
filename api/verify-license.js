import axios from 'axios';

export default async function handler(req, res) {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end();
    return;
  }

  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Validate request body
  if (!req.body || !req.body.license) {
    console.log('Invalid request: Missing license key');
    res.status(400).json({ error: 'License key is required' });
    return;
  }

  const { license } = req.body;
  
  // Basic license key validation
  if (typeof license !== 'string' || license.trim().length === 0) {
    console.log('Invalid request: Empty or invalid license key');
    res.status(400).json({ error: 'Invalid license key format' });
    return;
  }

  // Use environment variable for security (since repo is public)
  const product_id = process.env.GUMROAD_PRODUCT_ID;

  if (!product_id) {
    console.error('GUMROAD_PRODUCT_ID environment variable not set');
    res.status(500).json({ error: 'Server configuration error' });
    return;
  }

  console.log(`License validation request for product: ${product_id}`);

  try {
    const gumroadRes = await axios.post('https://api.gumroad.com/v2/licenses/verify', {
      product_id,
      license_key: license.trim(),
    }, {
      timeout: 10000, // 10 second timeout
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    console.log('Gumroad API response received');

    if (gumroadRes.data.success && gumroadRes.data.purchase) {
      // Check if it's a subscription and if it's active
      const isActive = !gumroadRes.data.purchase.subscription || 
                      gumroadRes.data.purchase.subscription.status === 'active';
      
      if (isActive) {
        console.log(`License valid for user: ${gumroadRes.data.purchase.email}`);
        res.status(200).json({ 
          valid: true, 
          email: gumroadRes.data.purchase.email,
          purchase_date: gumroadRes.data.purchase.sale_timestamp,
          product_name: gumroadRes.data.purchase.product_name
        });
      } else {
        console.log('License found but subscription inactive');
        res.status(200).json({ 
          valid: false, 
          reason: 'subscription_inactive' 
        });
      }
    } else {
      console.log('License validation failed');
      res.status(200).json({ 
        valid: false, 
        reason: 'invalid_license' 
      });
    }
  } catch (e) {
    console.error('Gumroad API error:', e.message);
    
    // Handle specific error types
    if (e.code === 'ECONNABORTED') {
      res.status(408).json({ error: 'Request timeout' });
    } else if (e.response) {
      // Gumroad API error
      console.error('Gumroad API error response:', e.response.status, e.response.data);
      res.status(200).json({ 
        valid: false, 
        reason: 'api_error' 
      });
    } else {
      // Network or other error
      res.status(500).json({ 
        valid: false, 
        reason: 'server_error' 
      });
    }
  }
} 