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

### 3. Configure Environment

Update the `product_id` in `api/verify-license.js` with your Gumroad product ID:

```javascript
const product_id = 'YOUR_ACTUAL_PRODUCT_ID';
```

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

