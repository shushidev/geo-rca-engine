import { Injectable } from '@nestjs/common';

@Injectable()
export class GeoService {
  getGeoTopics() {
    return {
      topics: [
        'Geopolitical risk mapping',
        'Maritime security and shipping disruptions',
        'Regional actor analysis',
        'Crisis timeline reconstruction',
        'RCA-driven policy insights'
      ],
      work: [
        'Building AI-assisted RCA pipelines',
        'Integrating Pinecone retrieval with OpenAI analysis',
        'Automating event ingestion and metadata extraction',
        'Serving structured RCA results via NestJS API'
      ]
    };
  }
}
