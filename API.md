# SmartFinance AI - API Documentation

## 📋 Overview

This document outlines all the API endpoints required for SmartFinance AI. These include external third-party APIs and potential backend APIs that would be implemented later.

---

## 🤖 AI Services

### OpenAI API

**Base URL**: `https://api.openai.com/v1`

#### 1. Transaction Categorization

**Purpose**: Automatically categorize transactions using GPT models

**Endpoint**: `POST /chat/completions`

**Headers**:
```json
{
  "Authorization": "Bearer YOUR_API_KEY",
  "Content-Type": "application/json"
}
```

**Request Body**:
```json
{
  "model": "gpt-3.5-turbo",
  "messages": [
    {
      "role": "system",
      "content": "You are a financial assistant that categorizes transactions. Return only valid JSON."
    },
    {
      "role": "user",
      "content": "Categorize this transaction: 'Starbucks Coffee Shop'. Categories: groceries, dining, transport, shopping, bills, entertainment, health, education, travel, income, investment, other. Return JSON with format: {\"category\": \"dining\", \"confidence\": 0.95}"
    }
  ],
  "temperature": 0.3,
  "max_tokens": 100
}
```

**Response**:
```json
{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "gpt-3.5-turbo-0613",
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "{\"category\": \"dining\", \"confidence\": 0.95}"
    },
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 56,
    "completion_tokens": 31,
    "total_tokens": 87
  }
}
```

#### 2. Spending Insights Generation

**Purpose**: Generate personalized spending insights

**Endpoint**: `POST /chat/completions`

**Request Body**:
```json
{
  "model": "gpt-3.5-turbo",
  "messages": [
    {
      "role": "system",
      "content": "You are a financial advisor providing brief, actionable insights."
    },
    {
      "role": "user",
      "content": "Based on this data: Current month dining: $450, Last month: $380, Budget: $400. Generate 1-2 brief insights."
    }
  ],
  "temperature": 0.7,
  "max_tokens": 150
}
```

**Response**: Similar to categorization, with insights in the content field.

#### 3. Budget Predictions

**Purpose**: Predict end-of-month spending

**Request Format**: Same as insights, with spending history data

**Example Prompt**:
```
"User has spent $1,200 in 15 days of the month (budget: $2,000). 
Predict if they will exceed budget and by how much. Return JSON: 
{\"projected_spend\": 2400, \"will_exceed\": true, \"excess_amount\": 400, \"confidence\": 0.85}"
```

---

## 💰 Market Data APIs

### 1. CoinGecko API (Cryptocurrency)

**Base URL**: `https://api.coingecko.com/api/v3`

**Authentication**: Free tier - No API key required (public endpoints)

#### Get Current Crypto Prices

**Endpoint**: `GET /simple/price`

**Query Parameters**:
- `ids`: Comma-separated crypto IDs (e.g., "bitcoin,ethereum")
- `vs_currencies`: Currency (e.g., "usd")
- `include_24hr_change`: Boolean (optional)

**Example Request**:
```
GET https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true
```

**Response**:
```json
{
  "bitcoin": {
    "usd": 43250.00,
    "usd_24h_change": 2.5
  },
  "ethereum": {
    "usd": 2280.50,
    "usd_24h_change": -1.2
  }
}
```

#### Get Crypto Market Data

**Endpoint**: `GET /coins/markets`

**Query Parameters**:
- `vs_currency`: "usd"
- `ids`: Comma-separated crypto IDs
- `order`: "market_cap_desc"
- `sparkline`: Boolean (7-day price data)

**Example Request**:
```
GET https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&sparkline=true
```

**Response**:
```json
[
  {
    "id": "bitcoin",
    "symbol": "btc",
    "name": "Bitcoin",
    "image": "https://...",
    "current_price": 43250,
    "market_cap": 846000000000,
    "market_cap_rank": 1,
    "total_volume": 25000000000,
    "high_24h": 43500,
    "low_24h": 42800,
    "price_change_24h": 450,
    "price_change_percentage_24h": 1.05,
    "sparkline_in_7d": {
      "price": [42000, 42500, 43000, ...]
    }
  }
]
```

#### Get Historical Data

**Endpoint**: `GET /coins/{id}/market_chart`

**Query Parameters**:
- `vs_currency`: "usd"
- `days`: Number of days (1, 7, 30, 90, 365)
- `interval`: Optional (daily)

**Example Request**:
```
GET https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30
```

**Response**:
```json
{
  "prices": [
    [1704067200000, 42000],
    [1704153600000, 42500],
    ...
  ],
  "market_caps": [...],
  "total_volumes": [...]
}
```

**Rate Limits**: 
- Free tier: 10-50 calls/minute
- Consider caching responses for 5-10 minutes

---

### 2. Alpha Vantage API (Stocks) - Alternative

**Base URL**: `https://www.alphavantage.co/query`

**Authentication**: API key required (free tier available)

#### Get Stock Quote

**Endpoint**: `GET /query`

**Query Parameters**:
- `function`: "GLOBAL_QUOTE"
- `symbol`: Stock symbol (e.g., "AAPL")
- `apikey`: Your API key

**Example Request**:
```
GET https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=YOUR_KEY
```

**Response**:
```json
{
  "Global Quote": {
    "01. symbol": "AAPL",
    "05. price": "178.52",
    "09. change": "1.23",
    "10. change percent": "0.69%"
  }
}
```

**Rate Limits**: 
- Free tier: 5 calls/minute, 500 calls/day

---

### 3. Yahoo Finance API (Alternative - No official API)

**Note**: Use unofficial wrapper libraries or web scraping

**npm package**: `yahoo-finance2` (unofficial)

```javascript
import yahooFinance from 'yahoo-finance2';

// Get quote
const quote = await yahooFinance.quote('AAPL');

// Get historical data
const history = await yahooFinance.historical('AAPL', {
  period1: '2024-01-01',
  period2: '2024-12-31',
});
```

---

## 🔔 Notification Services

### Expo Push Notifications

**For future backend integration**

#### Send Push Notification

**Endpoint**: `POST https://exp.host/--/api/v2/push/send`

**Headers**:
```json
{
  "Accept": "application/json",
  "Content-Type": "application/json"
}
```

**Request Body**:
```json
{
  "to": "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]",
  "sound": "default",
  "title": "Budget Alert",
  "body": "You've reached 80% of your dining budget",
  "data": {
    "type": "budget_alert",
    "budgetId": "budget_123"
  }
}
```

**Response**:
```json
{
  "data": [
    {
      "status": "ok",
      "id": "notification_id"
    }
  ]
}
```

---

## 🔮 Future Backend APIs (To Be Implemented)

These endpoints would be implemented in your backend server (Node.js/Express, Python/FastAPI, etc.)

### Base URL: `https://api.smartfinance.com/v1`

### Authentication

All endpoints require JWT authentication:

**Header**:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

### User Management

#### 1. Register User

**Endpoint**: `POST /auth/register`

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
```

**Response**:
```json
{
  "success": true,
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "jwt_token_here"
}
```

#### 2. Login

**Endpoint**: `POST /auth/login`

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

---

### Transaction Sync

#### 1. Sync Transactions

**Endpoint**: `POST /transactions/sync`

**Request Body**:
```json
{
  "transactions": [
    {
      "id": "local_id_123",
      "amount": 45.50,
      "category": "dining",
      "description": "Lunch at cafe",
      "date": "2025-05-15T12:30:00Z",
      "synced": false
    }
  ],
  "lastSyncTime": "2025-05-14T10:00:00Z"
}
```

**Response**:
```json
{
  "success": true,
  "synced": 5,
  "conflicts": [],
  "serverTransactions": []
}
```

---

### Budget Management

#### 1. Get All Budgets

**Endpoint**: `GET /budgets`

**Response**:
```json
{
  "budgets": [
    {
      "id": "budget_123",
      "name": "Monthly Groceries",
      "amount": 500,
      "spent": 342,
      "category": "groceries",
      "period": "monthly"
    }
  ]
}
```

#### 2. Create Budget

**Endpoint**: `POST /budgets`

**Request Body**:
```json
{
  "name": "Dining Out",
  "amount": 400,
  "category": "dining",
  "period": "monthly",
  "alertThreshold": 80
}
```

---

### AI Insights

#### 1. Get Personalized Insights

**Endpoint**: `GET /insights`

**Query Parameters**:
- `period`: "week" | "month" | "year"

**Response**:
```json
{
  "insights": [
    {
      "type": "spending_trend",
      "message": "Your dining expenses increased 18% this month",
      "severity": "warning",
      "category": "dining"
    },
    {
      "type": "savings_opportunity",
      "message": "You could save $120 by cooking at home 2 more times per week",
      "category": "dining"
    }
  ],
  "generated_at": "2025-05-15T10:00:00Z"
}
```

---

## 📊 Implementation Priority

### Phase 1 (MVP - Local Only)
- ✅ No backend required
- ✅ OpenAI API for categorization
- ✅ CoinGecko for crypto prices
- ✅ Local storage with MMKV
- ✅ Local notifications

### Phase 2 (Cloud Sync)
- ⭕ User authentication
- ⭕ Transaction sync
- ⭕ Cloud backup
- ⭕ Multi-device support

### Phase 3 (Advanced Features)
- ⭕ Bank account integration (Plaid)
- ⭕ Receipt scanning (OCR)
- ⭕ Shared budgets
- ⭕ Social features

---

## 🔒 Security Considerations

1. **API Keys**: Store in SecureStore, never commit to Git
2. **Rate Limiting**: Implement client-side rate limiting and caching
3. **Data Privacy**: All financial data stored locally by default
4. **HTTPS Only**: All API calls over HTTPS
5. **Input Validation**: Validate all API responses

---

## 📝 Mock API Implementation

For development without API keys, we'll create a mock API service that returns realistic dummy data. See `app/services/api/mockApi.ts` for implementation.

---

**Last Updated**: May 1, 2025  
**Version**: 1.0.0
