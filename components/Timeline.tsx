import React, { useEffect } from 'react';
import Navbar from './Navbar';

const Timeline: React.FC = () => {
  useEffect(() => {
    const items = document.querySelectorAll('.timeline-card, .phase-header, .lane-badge');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.style.opacity = '1';
          target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    items.forEach((item, index) => {
      const element = item as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      const delay = (index % 4) * 150;
      element.style.transitionDelay = `${delay}ms`;
      observer.observe(item);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <style>{`
        :root {
            --aeris-bg: #050505;
            --aeris-grid-line: rgba(255, 255, 255, 0.1);
            --aeris-text-main: #f0f0f0;
            --aeris-text-muted: #666666;
            --aeris-accent: #ff4d00;
            --aeris-font-head: 'Oswald', sans-serif;
            --aeris-font-mono: 'Roboto Mono', monospace;
            --timeline-lane-height: minmax(160px, auto);
        }

        .aeris-timeline-section {
            position: relative;
            width: 100%;
            min-height: 100vh;
            background-color: var(--aeris-bg);
            background-image: 
                linear-gradient(to right, var(--aeris-grid-line) 1px, transparent 1px),
                linear-gradient(to bottom, var(--aeris-grid-line) 1px, transparent 1px);
            background-size: 40px 40px;
            overflow: hidden;
            padding: 4rem 2rem;
            display: flex;
            flex-direction: column;
        }

        .aeris-timeline-section::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at center, transparent 0%, #000 120%);
            pointer-events: none;
            z-index: 1;
        }

        .aeris-container {
            position: relative;
            z-index: 2;
            max-width: 1600px;
            margin: 0 auto;
            width: 100%;
        }

        .section-header {
            margin-bottom: 3rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 2px solid var(--aeris-text-main);
            padding-bottom: 1rem;
        }

        .section-header h2 {
            font-family: var(--aeris-font-head);
            text-transform: uppercase;
            font-size: 2rem;
            letter-spacing: 0.05em;
            color: var(--aeris-text-main);
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .section-header .accent-block {
            width: 16px;
            height: 16px;
            background-color: var(--aeris-accent);
        }

        .timeline-grid {
            display: grid;
            grid-template-columns: 200px repeat(4, 1fr);
            grid-template-rows: auto auto repeat(3, var(--timeline-lane-height));
            gap: 0;
            width: 100%;
            border-top: 1px solid var(--aeris-grid-line);
            border-left: 1px solid var(--aeris-grid-line);
        }

        .timeline-grid > div {
            border-right: 1px solid var(--aeris-grid-line);
            border-bottom: 1px solid var(--aeris-grid-line);
        }

        .lane-label-col {
            grid-column: 1;
            padding: 1.5rem;
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            background: rgba(255, 255, 255, 0.02);
        }

        .lane-badge {
            font-family: var(--aeris-font-head);
            font-weight: 500;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--aeris-text-muted);
            border: 1px solid var(--aeris-text-muted);
            padding: 0.5rem 0.75rem;
            background: transparent;
            border-radius: 0;
            position: relative;
        }

        .lane-badge::before {
            content: '';
            position: absolute;
            top: -1px; left: -1px;
            width: 4px; height: 4px;
            background: var(--aeris-text-main);
        }

        .lane-row-1 { grid-row: 3; }
        .lane-row-2 { grid-row: 4; }
        .lane-row-3 { grid-row: 5; }

        .phase-group { display: contents; }

        .phase-header {
            grid-row: 1;
            padding: 1.5rem;
            font-family: var(--aeris-font-head);
            position: relative;
            background: rgba(0,0,0,0.4);
        }

        .phase-header h3 {
            font-size: 1.5rem;
            font-weight: 500;
            color: var(--aeris-text-main);
            margin-bottom: 0.5rem;
        }

        .phase-header .date-range {
            font-family: var(--aeris-font-mono);
            font-size: 0.7rem;
            color: var(--aeris-accent);
            text-transform: uppercase;
            display: block;
            border: 1px solid var(--aeris-grid-line);
            padding: 4px 8px;
            width: fit-content;
        }

        .phase-header::after {
            content: '';
            position: absolute;
            left: 50%;
            top: 100%;
            width: 1px;
            height: 100vh;
            background: repeating-linear-gradient(to bottom, var(--aeris-grid-line) 0, var(--aeris-grid-line) 4px, transparent 4px, transparent 8px);
            z-index: 0;
            pointer-events: none;
        }

        .phase-1 .phase-header { grid-column: 2; }
        .phase-2 .phase-header { grid-column: 3; }
        .phase-3 .phase-header { grid-column: 4; }
        .phase-4 .phase-header { grid-column: 5; }

        .timeline-track-cell {
            grid-row: 2;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--aeris-bg);
            border-bottom: 2px solid var(--aeris-text-main) !important;
        }
        
        .timeline-track-cell::before {
            content: '';
            width: 8px;
            height: 8px;
            background-color: var(--aeris-bg);
            border: 2px solid var(--aeris-text-main);
            z-index: 2;
        }

        .phase-group:hover .timeline-track-cell::before {
            background-color: var(--aeris-accent);
            border-color: var(--aeris-accent);
        }

        .phase-1 .timeline-track-cell { grid-column: 2; }
        .phase-2 .timeline-track-cell { grid-column: 3; }
        .phase-3 .timeline-track-cell { grid-column: 4; }
        .phase-4 .timeline-track-cell { grid-column: 5; }

        .timeline-item-container {
            padding: 1rem;
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }

        .timeline-card {
            background: rgba(20, 20, 20, 0.6);
            border: 1px solid var(--aeris-grid-line);
            padding: 1.25rem;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            transition: all 0.2s ease;
            position: relative;
        }

        .timeline-card:hover {
            border-color: var(--aeris-accent);
            background: rgba(255, 77, 0, 0.05);
        }

        .timeline-card::after {
            content: '';
            position: absolute;
            bottom: -1px; right: -1px;
            width: 6px; height: 6px;
            border-bottom: 2px solid var(--aeris-text-muted);
            border-right: 2px solid var(--aeris-text-muted);
            transition: border-color 0.2s;
        }
        .timeline-card:hover::after {
            border-color: var(--aeris-accent);
        }

        .card-title {
            font-family: var(--aeris-font-head);
            font-size: 0.95rem;
            color: var(--aeris-text-main);
            margin-bottom: 0.5rem;
            text-transform: uppercase;
            letter-spacing: 0.02em;
        }

        .card-desc {
            font-size: 0.7rem;
            color: var(--aeris-text-muted);
            line-height: 1.4;
        }

        .phase-1 .timeline-item-container { grid-column: 2; }
        .phase-2 .timeline-item-container { grid-column: 3; }
        .phase-3 .timeline-item-container { grid-column: 4; }
        .phase-4 .timeline-item-container { grid-column: 5; }

        .lane-disaster { grid-row: 3; }
        .lane-infra { grid-row: 4; }
        .lane-agri { grid-row: 5; }

        @media (max-width: 1024px) {
            .aeris-timeline-section {
                padding: 2rem 1rem;
                height: auto;
                background-size: 20px 20px;
            }

            .timeline-grid {
                display: flex;
                flex-direction: column;
                border: none;
                gap: 2rem;
            }
            
            .timeline-grid > div {
                border: none;
            }

            .lane-label-col, .timeline-track-cell {
                display: none;
            }

            .phase-group {
                display: block;
                border-left: 2px solid var(--aeris-grid-line);
                padding-left: 1.5rem;
                margin-left: 0.5rem;
            }

            .phase-header {
                padding: 0 0 1rem 0;
                background: transparent;
            }
            .phase-header::after { display: none; }

            .timeline-item-container {
                padding: 0 0 1rem 0;
            }
            
            .timeline-card {
                background: #0a0a0a;
                border: 1px solid var(--aeris-grid-line);
            }

            .mobile-tag {
                display: inline-block;
                font-size: 0.6rem;
                font-family: var(--aeris-font-mono);
                color: var(--aeris-accent);
                border: 1px solid var(--aeris-accent);
                padding: 2px 6px;
                margin-bottom: 0.5rem;
                text-transform: uppercase;
            }
        }

        .hidden-desktop { display: none; }
        @media (max-width: 1024px) {
            .hidden-desktop { display: block; }
        }
      `}</style>

      <Navbar />
      <section className="aeris-timeline-section" style={{paddingTop: '3.5rem'}}>
        <div className="aeris-container">
          
          <div className="section-header">
            <h2>
              <span className="accent-block"></span>
              Strategic Roadmap
            </h2>
            <div style={{fontFamily: 'var(--aeris-font-mono)', fontSize: '0.7rem', color: 'var(--aeris-text-muted)'}}>
              SYSTEM_V.4.0 // ACTIVE
            </div>
          </div>

          <div className="timeline-grid">

            {/* LANE LABELS */}
            <div className="lane-label-col lane-row-1">
              <div className="lane-badge">Disaster Response</div>
            </div>
            <div className="lane-label-col lane-row-2">
              <div className="lane-badge">Infrastructure</div>
            </div>
            <div className="lane-label-col lane-row-3">
              <div className="lane-badge">Agriculture</div>
            </div>

            {/* PHASE I */}
            <div className="phase-group phase-1">
              <div className="phase-header">
                <h3>01 Phase I</h3>
                <span className="date-range">2026.01 — 2028.12</span>
              </div>
              <div className="timeline-track-cell"></div>
              
              <div className="timeline-item-container lane-disaster">
                <div className="timeline-card">
                  <span className="mobile-tag hidden-desktop">Disaster Response</span>
                  <div className="card-title">R&D / Simulation</div>
                  <div className="card-desc">Core physics engine validation and drone swarm behavioral testing.</div>
                </div>
              </div>
              <div className="timeline-item-container lane-infra"></div>
              <div className="timeline-item-container lane-agri"></div>
            </div>

            {/* PHASE II */}
            <div className="phase-group phase-2">
              <div className="phase-header">
                <h3>02 Phase II</h3>
                <span className="date-range">2029.01 — 2033.12</span>
              </div>
              <div className="timeline-track-cell"></div>

              <div className="timeline-item-container lane-disaster">
                <div className="timeline-card">
                  <span className="mobile-tag hidden-desktop">Disaster Response</span>
                  <div className="card-title">Prototype Tests</div>
                  <div className="card-desc">Live environment stress testing in controlled zones.</div>
                </div>
              </div>

              <div className="timeline-item-container lane-infra">
                <div className="timeline-card">
                  <span className="mobile-tag hidden-desktop">Infrastructure</span>
                  <div className="card-title">Survey Workflows</div>
                  <div className="card-desc">Automated bridge and tunnel scanning protocols.</div>
                </div>
              </div>

              <div className="timeline-item-container lane-agri">
                <div className="timeline-card">
                  <span className="mobile-tag hidden-desktop">Agriculture</span>
                  <div className="card-title">Multispectral</div>
                  <div className="card-desc">Crop health analysis integration.</div>
                </div>
              </div>
            </div>

            {/* PHASE III */}
            <div className="phase-group phase-3">
              <div className="phase-header">
                <h3>03 Phase III</h3>
                <span className="date-range">2034.01 — 2039.05</span>
              </div>
              <div className="timeline-track-cell"></div>

              <div className="timeline-item-container lane-disaster">
                <div className="timeline-card">
                  <span className="mobile-tag hidden-desktop">Disaster Response</span>
                  <div className="card-title">Pilot Deployments</div>
                  <div className="card-desc">First-response autonomous units in coastal regions.</div>
                </div>
              </div>

              <div className="timeline-item-container lane-infra">
                <div className="timeline-card">
                  <span className="mobile-tag hidden-desktop">Infrastructure</span>
                  <div className="card-title">Standardization</div>
                  <div className="card-desc">National grid partnership and compliance.</div>
                </div>
              </div>

              <div className="timeline-item-container lane-agri">
                <div className="timeline-card">
                  <span className="mobile-tag hidden-desktop">Agriculture</span>
                  <div className="card-title">Alerting + Tasking</div>
                  <div className="card-desc">Automated irrigation and treatment dispatch.</div>
                </div>
              </div>
            </div>

            {/* PHASE IV */}
            <div className="phase-group phase-4">
              <div className="phase-header">
                <h3>04 Phase IV</h3>
                <span className="date-range">2040 — Beyond</span>
              </div>
              <div className="timeline-track-cell"></div>

              <div className="timeline-item-container lane-disaster">
                <div className="timeline-card">
                  <span className="mobile-tag hidden-desktop">Disaster Response</span>
                  <div className="card-title">Scale Rollout</div>
                  <div className="card-desc">Global rapid response network activation.</div>
                </div>
              </div>

              <div className="timeline-item-container lane-infra">
                <div className="timeline-card">
                  <span className="mobile-tag hidden-desktop">Infrastructure</span>
                  <div className="card-title">Enterprise Ops</div>
                  <div className="card-desc">Full-scale urban monitoring systems.</div>
                </div>
              </div>

              <div className="timeline-item-container lane-agri">
                <div className="timeline-card">
                  <span className="mobile-tag hidden-desktop">Agriculture</span>
                  <div className="card-title">Regional Scaling</div>
                  <div className="card-desc">Continental food security optimization.</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Timeline;
