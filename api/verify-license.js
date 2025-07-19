import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { license } = req.body;
  // Use environment variable for security (since repo is public)
  const product_id = process.env.GUMROAD_PRODUCT_ID;

  if (!product_id) {
    console.error('GUMROAD_PRODUCT_ID environment variable not set');
    res.status(500).json({ error: 'Server configuration error' });
    return;
  }

  try {
    const gumroadRes = await axios.post('https://api.gumroad.com/v2/licenses/verify', {
      product_id,
      license_key: license,
    });

    if (gumroadRes.data.success && gumroadRes.data.purchase) {
      // Check if it's a subscription and if it's active
      const isActive = !gumroadRes.data.purchase.subscription || 
                      gumroadRes.data.purchase.subscription.status === 'active';
      
      if (isActive) {
        res.status(200).json({ 
          valid: true, 
          email: gumroadRes.data.purchase.email 
        });
      } else {
        res.status(200).json({ valid: false });
      }
    } else {
      res.status(200).json({ valid: false });
    }
  } catch (e) {
    console.error('Gumroad API error:', e);
    res.status(200).json({ valid: false });
  }
} 