import Image from 'next/image';
import { useEffect, useState } from 'react';

type GeoData = {
  topics: string[];
  work: string[];
};

export default function Home() {
  const [geoData, setGeoData] = useState<GeoData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3333/api/geo/topics')
      .then((res) => res.json())
      .then(setGeoData)
      .catch(() => setError('Unable to reach backend API.'));
  }, []);

  return (
    <main>
      <div className="bg-grid" />
      <section className="hero">
        <div>
          <div className="status-banner">
            <span>AI-driven geopolitical RCA · Production-ready prototype</span>
          </div>
          <h1>
            Root Cause Analysis for <span className="highlight">geopolitical risk</span>
          </h1>
          <p>
            Build a modern analysis platform that connects event ingestion, semantic retrieval,
            and LLM-powered RCA generation in one elegant UI.
          </p>

          <div className="button-group">
            <a className="button" href="#topics">
              Explore Topics
            </a>
            <a className="button" href="#work">
              See Work Plan
            </a>
          </div>

          <div className="stats">
            <article className="stat-card">
              <strong>3+</strong>
              <span>Core analysis components</span>
            </article>
            <article className="stat-card">
              <strong>Realtime</strong>
              <span>API-backed insights</span>
            </article>
            <article className="stat-card">
              <strong>Data</strong>
              <span>Pinecone, Redis, Postgres</span>
            </article>
          </div>
        </div>

        <div className="image-block">
          <div className="image-card">
            <Image
              src="/images/geo-map.svg"
              alt="Geopolitical map illustration"
              width={600}
              height={450}
            />
          </div>
        </div>
      </section>

      <section className="grid" id="topics">
        <article className="card">
          <div className="section-title">Geopolitical Topics</div>
          <h2>What this platform analyzes</h2>
          <p>
            The Geo-RCA platform is designed for analysts, decision-makers, and operations
            teams exploring complex geopolitical disruptions.
          </p>
          <ul>
            <li>Geopolitical risk mapping</li>
            <li>Maritime security and shipping disruptions</li>
            <li>Regional actor analysis</li>
            <li>Crisis timeline reconstruction</li>
            <li>RCA-driven policy insights</li>
          </ul>
        </article>

        <article className="card">
          <div className="section-title">Live system</div>
          <h2>Backend-powered insights</h2>
          <p>
            The current backend exposes a NestJS API that returns the platform’s current
            topics and project tasks. This makes the frontend interactive and grounded.
          </p>
          {error && <p style={{ color: '#ff9fa5' }}>{error}</p>}
          {geoData ? (
            <div>
              <h3>Topics from backend</h3>
              <ul>
                {geoData.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
              <h3>Work items from backend</h3>
              <ul>
                {geoData.work.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Loading backend content...</p>
          )}
        </article>
      </section>

      <section className="grid" id="work">
        <article className="card">
          <div className="section-title">Current Work</div>
          <h2>What I’m building</h2>
          <ul>
            <li>Backend API using NestJS</li>
            <li>AI retrieval with Pinecone and OpenAI</li>
            <li>Ingestion workers for event data</li>
            <li>Structured RCA responses for analysts</li>
          </ul>
        </article>

        <article className="card image-card">
          <Image
            src="/images/ai-graph.svg"
            alt="AI and data processing illustration"
            width={600}
            height={450}
          />
        </article>
      </section>

      <p className="footer-note">
        This frontend is built in Next.js and connects to the NestJS backend API at
        <code>http://localhost:3333/api/geo/topics</code> for live status and project data.
      </p>
    </main>
  );
}
