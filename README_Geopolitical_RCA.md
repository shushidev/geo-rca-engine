
# AI-Powered Geopolitical RCA Platform

## Overview

This project is a production-style AI-powered Geopolitical Root Cause Analysis (RCA) platform using:

- NestJS
- PostgreSQL
- Pinecone
- Redis
- BullMQ
- OpenAI APIs

The system uses Retrieval-Augmented Generation (RAG) to analyze geopolitical events and generate structured root cause analysis reports.

---

# High-Level Architecture

```text
                Frontend
                    ↓
              API Gateway
                    ↓
         NestJS Backend API
                    ↓
     ┌──────────────┴──────────────┐
     ↓                             ↓
PostgreSQL                  Redis Cache
     ↓                             ↓
 Metadata                    BullMQ Queue
                                   ↓
                           Ingestion Workers
                                   ↓
                          Embedding Generation
                                   ↓
                              Pinecone
                                   ↓
                           Retrieval Engine
                                   ↓
                              OpenAI
```

---

# RCA Query Flow

```text
User Question
     ↓
API Layer
     ↓
Query Processing
     ↓
Embedding Generation
     ↓
Pinecone Semantic Search
     ↓
Metadata Filtering
     ↓
Retrieved Chunks
     ↓
Reranking
     ↓
Timeline Builder
     ↓
RCA Engine
     ↓
LLM Analysis
     ↓
Structured JSON Response
     ↓
Frontend/UI
```

---

# RCA Flow Explanation

## 1. User Question

Example:

```text
"Why did Red Sea shipping disruptions escalate?"
```

The frontend sends the request to the backend.

---

## 2. API Layer (NestJS)

Responsibilities:

- Validate request
- Authenticate users
- Apply rate limiting
- Call RCA service
- Return structured response

---

## 3. Query Processing

The system cleans and expands the query.

Example:

```text
Original:
"Why did Red Sea shipping disruptions escalate?"

Expanded:
"Red Sea maritime attacks shipping crisis escalation Houthi trade disruption"
```

Purpose:

- Better retrieval quality
- Better semantic understanding

---

## 4. Embedding Generation

Convert query into embeddings.

Example:

```js
const embedding = await openai.embeddings.create({
  model: "text-embedding-3-small",
  input: question
});
```

Embeddings represent semantic meaning.

---

## 5. Pinecone Semantic Search

The query embedding is sent to Pinecone.

Pinecone returns semantically similar chunks.

Example:

```js
const results = await index.query({
  vector: queryEmbedding,
  topK: 10,
  includeMetadata: true
});
```

---

## 6. Metadata Filtering

Filters improve retrieval relevance.

Example:

```js
{
  region: "Middle East",
  actor: "Houthis",
  source: "Reuters"
}
```

Filters include:

- Region
- Country
- Date
- Source
- Actor
- Topic

---

## 7. Retrieved Chunks

The system retrieves evidence chunks.

Example:

```json
[
  {
    "text": "Houthi attacks targeted commercial vessels...",
    "source": "Reuters"
  }
]
```

---

## 8. Reranking

Chunks are reranked using:

- Semantic similarity
- Source reliability
- Recency
- Event relevance

Example:

```js
score =
  semanticScore * 0.6 +
  reliabilityScore * 0.3 +
  recencyScore * 0.1;
```

---

## 9. Timeline Builder

The system extracts chronological events.

Example:

```json
[
  {
    "date": "2026-01-10",
    "event": "Initial maritime attacks"
  }
]
```

Timeline awareness improves RCA quality.

---

## 10. RCA Engine

The RCA engine identifies:

- Trigger causes
- Immediate causes
- Underlying causes
- Structural causes

---

## 11. LLM Analysis

The LLM receives:

- User question
- Timeline
- Retrieved evidence
- RCA instructions

The model generates structured reasoning.

---

## 12. Structured JSON Response

Example:

```json
{
  "summary": "",
  "timeline": [],
  "root_causes": [],
  "confidence": ""
}
```

Benefits:

- Frontend-friendly
- Production-ready
- API-friendly

---

## 13. Store RCA Reports

Reports are stored in PostgreSQL for:

- Analytics
- Auditing
- History
- Caching

---

## 14. Redis Cache

Popular RCA responses are cached.

Redis reduces:

- Latency
- LLM cost
- Retrieval cost

---

## 15. Frontend/UI

Frontend displays:

- Timelines
- Evidence cards
- Cause breakdowns
- Confidence indicators

---

# Production Concepts

## Async Ingestion

```text
API
 ↓
Queue
 ↓
Worker
 ↓
Chunk
 ↓
Embed
 ↓
Store
```

Uses:

- BullMQ
- Redis

---

## Source Reliability

Example:

```js
Reuters: 0.95
UN: 0.99
Random Blog: 0.20
```

---

## Hybrid Search

Use:

- Vector search
- Keyword search
- Metadata filtering

---

## Hallucination Reduction

The LLM should only analyze retrieved evidence.

Never allow unsupported claims.

---

## Observability

Track:

- Retrieval latency
- Embedding failures
- Token usage
- Cache hits
- LLM failures

---

# Suggested Folder Structure

```text
src/
 ├── modules/
 │    ├── ingestion/
 │    ├── embeddings/
 │    ├── retrieval/
 │    ├── rca/
 │    ├── timeline/
 │    └── scoring/
 │
 ├── workers/
 ├── queues/
 ├── common/
 ├── config/
 ├── db/
 └── main.ts
```

---

# Recommended Tech Stack

## Backend

- NestJS
- TypeScript

## Database

- PostgreSQL

## Vector Database

- Pinecone

## Queue

- BullMQ
- Redis

## AI

- OpenAI APIs

## Deployment

- Docker
- AWS
- GitHub Actions

---

# Resume Description

Built a production-style AI-powered geopolitical Root Cause Analysis (RCA) platform using NestJS, PostgreSQL, Pinecone, Redis, BullMQ, and OpenAI APIs. Implemented timeline-aware RAG retrieval, source reliability scoring, semantic search, async ingestion pipelines, and structured RCA generation.

---

# Future Improvements

Possible future enhancements:

- GraphRAG
- Knowledge graphs
- Multi-agent workflows
- Live news ingestion
- Event clustering
- Relationship mapping

---

# Conclusion

This project demonstrates:

- Backend architecture
- AI engineering
- RAG systems
- Vector databases
- Queue-based processing
- Retrieval optimization
- Timeline-aware reasoning
- Production-ready API design
