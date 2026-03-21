# Smart Campus Intelligence Platform - Database Schema (MongoDB)

This document outlines the database architecture for the Smart Campus platform, using **MongoDB** for document storage and its native **Atlas Vector Search** for AI capabilities.

## 1. MongoDB Collections (NoSQL)

### `users` Collection
Stores student, faculty, and admin profiles.
```json
{
  "_id": "ObjectId",
  "email": "string (unique)",
  "passwordHash": "string",
  "fullName": "string",
  "role": "string ('student' | 'faculty' | 'admin')",
  "department": "string",
  "yearOfStudy": "number",
  "profilePicUrl": "string",
  "faceEmbedding": [0.12, -0.45, ...], // Array of 128 floats for biometric verification
  "createdAt": "date"
}
```

### `courses` Collection
```json
{
  "_id": "ObjectId",
  "courseCode": "string (unique)",
  "title": "string",
  "description": "string",
  "instructorId": "ObjectId (ref: users)",
  "credits": "number",
  "department": "string"
}
```

### `enrollments` Collection
```json
{
  "_id": "ObjectId",
  "studentId": "ObjectId (ref: users)",
  "courseId": "ObjectId (ref: courses)",
  "grade": "string",
  "attendancePercentage": "number",
  "progressPercentage": "number",
  "enrolledAt": "date"
}
```

### `events` Collection
```json
{
  "_id": "ObjectId",
  "title": "string",
  "description": "string",
  "eventType": "string ('workshop' | 'hackathon' | 'networking')",
  "category": "string ('Technology' | 'Career' | 'Wellness')",
  "location": "string",
  "startTime": "date",
  "endTime": "date",
  "imageUrl": "string",
  "organizerId": "ObjectId (ref: users)",
  "capacity": "number",
  "rsvps": ["ObjectId (ref: users)"]
}
```

### `attendance_records` Collection
```json
{
  "_id": "ObjectId",
  "studentId": "ObjectId (ref: users)",
  "courseId": "ObjectId (ref: courses)",
  "status": "string ('present' | 'absent' | 'late')",
  "verificationMethod": "string ('facial_recognition' | 'manual')",
  "geoLocation": {
    "type": "Point",
    "coordinates": [longitude, latitude]
  },
  "recordedAt": "date"
}
```

### `engagement_insights` Collection (Predictive Analytics)
```json
{
  "_id": "ObjectId",
  "studentId": "ObjectId (ref: users)",
  "riskScore": "number (0.0 to 1.0)",
  "riskLevel": "string ('low' | 'medium' | 'high')",
  "reasonTags": ["string"], // e.g., ["low_attendance", "missed_assignments"]
  "lastUpdated": "date"
}
```

---

## 2. Vector Search (MongoDB Atlas)

### Index: `campus_knowledge_base`
Used for the AI Chatbot (RAG).

**Fields:**
- `sourceUrl`: string (Handbook/PDF Link)
- `pageNumber`: number
- `category`: string ('policy' | 'academic' | 'facility' | 'faq')
- `textChunk`: string
- `embedding`: [number] (e.g., 1536 dims for OpenAI embeddings)

---

## 3. Implementation Notes

- **Facial Recognition**: Use MongoDB's **Vector Search** indexes to perform fast similarity searches on biometric embeddings (`faceEmbedding`).
- **RAG Pipeline**: Use LangChain's `MongoDBAtlasVectorSearch` class to retrieve relevant document chunks from the `campus_knowledge_base` collection.
- **Geofencing**: Leverage MongoDB's **Geospatial Indexes** (2dsphere) for efficient distance calculations during attendance check-ins.
- **Flexible Schema**: Unlike PostgreSQL, MongoDB allows easy extension of student or event profiles without complex migrations (e.g., adding dynamic metadata to clubs or research groups).
