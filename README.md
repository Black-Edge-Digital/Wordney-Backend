# Wordney Backend API

A lightweight, serverless API for license validation and user management for the Wordney Chrome extension.

## 🚀 Features

- **License Validation**: Secure license key verification via Gumroad API
- **Subscription Support**: Handle both one-time purchases and recurring subscriptions
- **Serverless**: Built with Vercel serverless functions for scalability
- **Fast**: Optimized for quick response times
- **Secure**: Proper error handling and validation

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Vercel Serverless Functions
- **HTTP Client**: Axios
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ 
- Vercel CLI (for local development)
- Gumroad account with license keys enabled

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/wordney-backend.git
cd wordney-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

**For Local Development:**
Create a `.env.local` file:
```bash
GUMROAD_PRODUCT_ID=your_gumroad_product_id_here
```

**For Production (Vercel):**
1. Go to your Vercel project dashboard
2. Navigate to "Settings" → "Environment Variables"
3. Add: `GUMROAD_PRODUCT_ID` = `your_gumroad_product_id_here`

### 4. Deploy to Vercel

```bash
vercel
```

## 📡 API Endpoints

### POST `/api/verify-license`

Validates a license key against Gumroad's API.

**Request Body:**
```json
{
  "license": "YOUR-LICENSE-KEY-HERE"
}
```

**Response (Success):**
```json
{
  "valid": true,
  "email": "user@example.com"
}
```

**Response (Invalid):**
```json
{
  "valid": false
}
```

## 🔧 Local Development

### Run Locally

```bash
vercel dev
```

### Test the API

```bash
curl -X POST http://localhost:3000/api/verify-license \
  -H "Content-Type: application/json" \
  -d '{"license":"YOUR-TEST-LICENSE-KEY"}'
```

## 🌐 Production Deployment

The API is automatically deployed to Vercel when you push to the main branch.

**Production URL:** `https://wordney-backend.vercel.app/api/verify-license`

## 🔗 Integration with Chrome Extension

Your Chrome extension can validate licenses by making POST requests to the API:

```javascript
const response = await fetch('https://wordney-backend.vercel.app/api/verify-license', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ license: userLicenseKey })
});

const result = await response.json();
if (result.valid) {
  // License is valid, unlock features
  console.log('Activated for:', result.email);
} else {
  // License is invalid
  console.log('Invalid license');
}
```

## 🔒 Security

- Product ID is stored as an environment variable (not in code)
- No sensitive data is committed to the repository
- API responses are sanitized

## 📝 License

This project is part of the Wordney Chrome extension ecosystem.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support, please contact the Wordney development team.

---

**Built with ❤️ for the Wordney Chrome extension**

