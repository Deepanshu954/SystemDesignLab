# API Design Specification — System Design Lab

All endpoints use the `/api/v1/` version prefix. Responses follow standard JSON representation, and errors conform to RFC 7807 (`application/problem+json`).

---

## 1. Global Standards & Error Format (RFC 7807)

```json
{
  "type": "https://systemdesignlab.dev/errors/validation-failed",
  "title": "Bad Request",
  "status": 400,
  "detail": "Input validation failed for field 'dailyActiveUsers'",
  "instance": "/api/v1/calculator/capacity",
  "timestamp": "2026-10-03T07:40:00Z",
  "errors": [
    {
      "field": "dailyActiveUsers",
      "message": "Daily active users must be greater than 0"
    }
  ]
}
```

Standard HTTP Status Codes:
- `200 OK` — Successful retrieval or modification
- `201 Created` — Successful resource creation
- `204 No Content` — Successful deletion
- `400 Bad Request` — Validation failure or malformed input
- `401 Unauthorized` — Missing or expired JWT token
- `403 Forbidden` — Insufficient role permissions
- `404 Not Found` — Resource does not exist
- `429 Too Many Requests` — Rate limit exceeded
- `500 Internal Server Error` — Unexpected server failure

---

## 2. Authentication Endpoints (`/api/v1/auth`)

### 2.1 Register New Account
- **POST** `/api/v1/auth/register`
- **Auth:** Public
- **Request Body:**
  ```json
  {
    "email": "engineer@university.edu",
    "password": "StrongPassword123!",
    "fullName": "Priya Sharma"
  }
  ```
- **Response (`201 Created`):**
  ```json
  {
    "accessToken": "eyJhbGciOi...",
    "tokenType": "Bearer",
    "expiresInSeconds": 900,
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "engineer@university.edu",
      "fullName": "Priya Sharma",
      "role": "ROLE_STUDENT"
    }
  }
  ```

### 2.2 Login
- **POST** `/api/v1/auth/login`
- **Auth:** Public
- **Request Body:**
  ```json
  {
    "email": "engineer@university.edu",
    "password": "StrongPassword123!"
  }
  ```
- **Response (`200 OK`):**
  ```json
  {
    "accessToken": "eyJhbGciOi...",
    "tokenType": "Bearer",
    "expiresInSeconds": 900,
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "engineer@university.edu",
      "fullName": "Priya Sharma",
      "role": "ROLE_STUDENT"
    }
  }
  ```

### 2.3 Get Current User Profile
- **GET** `/api/v1/auth/me`
- **Auth:** Bearer Token required
- **Response (`200 OK`):** User object

---

## 3. Case Studies Endpoints (`/api/v1/case-studies`)

### 3.1 List All Published Case Studies
- **GET** `/api/v1/case-studies`
- **Query Params:** `category`, `difficulty`, `search`, `page`, `size`
- **Auth:** Public
- **Response (`200 OK`):**
  ```json
  {
    "content": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "slug": "url-shortener",
        "title": "Design a Distributed URL Shortener (TinyURL)",
        "summary": "Deep architectural walkthrough of a high-throughput URL shortening service featuring Base62 encoding, Key Generation Service (KGS), and Redis caching.",
        "difficulty": "BEGINNER",
        "category": "HIGH_THROUGHPUT",
        "readingTimeMinutes": 18,
        "createdAt": "2026-10-01T10:00:00Z"
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 4,
    "totalPages": 1
  }
  ```

### 3.2 Get Case Study by Slug
- **GET** `/api/v1/case-studies/{slug}`
- **Auth:** Public
- **Response (`200 OK`):**
  ```json
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "slug": "url-shortener",
    "title": "Design a Distributed URL Shortener (TinyURL)",
    "summary": "Deep architectural walkthrough of a high-throughput URL shortening service.",
    "difficulty": "BEGINNER",
    "category": "HIGH_THROUGHPUT",
    "readingTimeMinutes": 18,
    "architectureDiagramJson": "{\"nodes\":[...],\"edges\":[...]}",
    "capacityMathJson": "{\"dau\":10000000,\"readWriteRatio\":10,\"avgQps\":1160,\"peakQps\":2320}",
    "fullContentMarkdown": "# 1. Problem Statement...",
    "published": true
  }
  ```

---

## 4. Fundamentals Endpoints (`/api/v1/fundamentals`)

### 4.1 List Fundamental Topics
- **GET** `/api/v1/fundamentals`
- **Query Params:** `category`, `search`
- **Auth:** Public
- **Response (`200 OK`):** Paginated or list of fundamental concepts

### 4.2 Get Fundamental Topic by Slug
- **GET** `/api/v1/fundamentals/{slug}`
- **Auth:** Public
- **Response (`200 OK`):** Concept full record including markdown and key takeaways

---

## 5. Interview Questions Endpoints (`/api/v1/interview`)

### 5.1 List Interview Questions
- **GET** `/api/v1/interview`
- **Query Params:** `category`, `difficulty`, `search`
- **Auth:** Public
- **Response (`200 OK`):** List of questions with answers and evaluation rubrics

---

## 6. Calculator Engine Endpoints (`/api/v1/calculator`)

### 6.1 Execute Capacity Math
- **POST** `/api/v1/calculator/capacity`
- **Auth:** Public
- **Request Body:**
  ```json
  {
    "dailyActiveUsers": 10000000,
    "requestsPerUserDay": 5,
    "readWriteRatio": 10,
    "payloadSizeBytes": 500,
    "retentionYears": 5,
    "peakMultiplier": 2.0
  }
  ```
- **Response (`200 OK`):**
  ```json
  {
    "totalRequestsPerDay": 50000000,
    "avgQps": 578.7,
    "peakQps": 1157.4,
    "writeQps": 52.6,
    "readQps": 526.1,
    "dailyStorageGb": 22.75,
    "fiveYearStorageTb": 41.52,
    "ingressBandwidthMbps": 0.21,
    "egressBandwidthMbps": 2.10,
    "ramCacheRequiredGb": 4.55
  }
  ```

### 6.2 Predefined System Templates
- **GET** `/api/v1/calculator/templates`
- **Auth:** Public
- **Response (`200 OK`):** List of standard architectural sizing templates (URL Shortener, Twitter Feed, Video Streaming, Chat Service)

---

## 7. Bookmarks Endpoints (`/api/v1/bookmarks`)

### 7.1 List User Bookmarks
- **GET** `/api/v1/bookmarks`
- **Auth:** Bearer Token
- **Response (`200 OK`):** List of saved bookmarks for authenticated user

### 7.2 Save Bookmark
- **POST** `/api/v1/bookmarks`
- **Auth:** Bearer Token
- **Request Body:**
  ```json
  {
    "itemType": "CASE_STUDY",
    "itemId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "itemTitle": "Design a Distributed URL Shortener (TinyURL)",
    "itemSlug": "url-shortener"
  }
  ```
- **Response (`201 Created`):** Created bookmark

### 7.3 Delete Bookmark
- **DELETE** `/api/v1/bookmarks/{id}`
- **Auth:** Bearer Token
- **Response (`204 No Content`)**

---

## 8. Feedback Endpoints (`/api/v1/feedback`)

### 8.1 Submit User Feedback
- **POST** `/api/v1/feedback`
- **Auth:** Public
- **Request Body:**
  ```json
  {
    "pageUrl": "/case-studies/url-shortener",
    "rating": 5,
    "category": "CONTENT_CLARITY",
    "comment": "The KGS explanation with Base62 math was exceptionally clear."
  }
  ```
- **Response (`201 Created`)**
