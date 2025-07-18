export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { license } = req.body;

  // For demo: Accept only a hardcoded license key
  if (license === 'DEMO-1234-VALID') {
    res.status(200).json({ valid: true, email: 'demo@user.com' });
  } else {
    res.status(200).json({ valid: false });
  }
} 