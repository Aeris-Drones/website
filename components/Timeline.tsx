import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';


interface CardDescription {
  title: string;
  description: string;
  detailedExplanation: string;
}

const cardDescriptions: Record<string, CardDescription> = {
  'phase1-disaster': {
    title: "R&D / Simulation",
    description: "Core physics engine validation and drone swarm behavioral testing.",
    detailedExplanation: "We'll develop and validate our core physics engine for accurate drone flight dynamics modeling. This includes building a comprehensive simulation environment to test swarm behavioral patterns, coordination algorithms, and autonomous navigation systems. The simulation will validate our hierarchical Scout-Ranger architecture before physical prototyping, ensuring our edge-native Aeris OS software framework can handle complex multi-drone scenarios."
  },
  'phase2-disaster': {
    title: "Prototype Tests",
    description: "Live environment stress testing in controlled zones.",
    detailedExplanation: "We'll build our SCTF-1 flight testbed and EPCR-1 ground compute rig to validate aerodynamics and edge AI capabilities. These prototypes will undergo rigorous stress testing in controlled disaster simulation zones, testing autonomous navigation in GPS-denied environments, validating offline mesh networking capabilities, and refining human detection algorithms using thermal and acoustic sensors. This phase proves our technology works in real-world conditions."
  },
  'phase2-infra': {
    title: "Survey Workflows",
    description: "Automated bridge and tunnel scanning protocols.",
    detailedExplanation: "We'll develop automated survey workflows specifically designed for infrastructure inspection. This includes creating standardized flight paths for bridge and tunnel scanning, implementing geotagging systems for defect tracking, and building protocols for consistent, repeatable surveys. The system will generate standardized reports that enable trend tracking and maintenance planning across infrastructure networks."
  },
  'phase2-agri': {
    title: "Multispectral",
    description: "Crop health analysis integration.",
    detailedExplanation: "We'll integrate multispectral sensors into our modular pod system to enable comprehensive crop health analysis. This includes detecting irrigation failures, identifying nutrient stress patterns, early disease detection, and pest monitoring. The system will translate sensor data into actionable insights, flagging areas that need attention and providing decision support for farmers to optimize yield and resource management."
  },
  'phase3-disaster': {
    title: "Pilot Deployments",
    description: "First-response autonomous units in coastal regions.",
    detailedExplanation: "We'll deploy first-response autonomous units with fire departments and USAR task forces in coastal disaster-prone regions. These pilot programs will prove the system's value in real emergency scenarios, establish operational procedures, and create training programs for operators and incident commanders. We'll build partnerships with emergency response agencies and demonstrate measurable improvements in time-to-first-victim-locate and search area coverage."
  },
  'phase3-infra': {
    title: "Standardization",
    description: "National grid partnership and compliance.",
    detailedExplanation: "We'll achieve national grid partnerships and regulatory compliance, establishing our system as a standard for infrastructure inspection. This includes implementing standardized inspection protocols that meet industry requirements, building compliance reporting systems, and creating partnerships with major infrastructure operators. The goal is to make Aeris the go-to platform for infrastructure monitoring and maintenance planning."
  },
  'phase3-agri': {
    title: "Alerting + Tasking",
    description: "Automated irrigation and treatment dispatch.",
    detailedExplanation: "We'll develop automated alerting and tasking systems that translate crop health data into immediate actions. When the system detects issues like irrigation failures, disease outbreaks, or nutrient deficiencies, it will automatically generate alerts and dispatch treatment recommendations. This creates a closed-loop system where detection leads directly to action, enabling farmers to respond quickly to time-critical agricultural challenges."
  },
  'phase4-disaster': {
    title: "Scale Rollout",
    description: "Global rapid response network activation.",
    detailedExplanation: "We'll activate a global rapid response network, deploying Aeris systems across multiple regions and establishing international operations and support networks. This phase involves scaling our partnerships with emergency response agencies worldwide, building comprehensive training programs, and creating a network effect where each deployment strengthens the overall system. The goal is to make rapid, intelligent disaster response available globally."
  },
  'phase4-infra': {
    title: "Enterprise Ops",
    description: "Full-scale urban monitoring systems.",
    detailedExplanation: "We'll deploy full-scale urban monitoring systems that provide comprehensive infrastructure oversight for entire cities and regions. This includes establishing enterprise operations with major infrastructure operators, creating managed service offerings, and building systems that can monitor and maintain critical infrastructure at scale. The platform becomes an essential tool for urban planning and infrastructure management."
  },
  'phase4-agri': {
    title: "Regional Scaling",
    description: "Continental food security optimization.",
    detailedExplanation: "We'll scale agricultural operations to continental levels, optimizing food security across entire regions. This involves deploying systems across large agricultural networks, creating regional data sharing platforms, and building systems that can coordinate agricultural operations at unprecedented scale. The goal is to transform how we monitor, manage, and optimize agricultural production to ensure food security for growing populations."
  }
};

const Timeline: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number; placement: 'above' | 'below' } | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
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

    // Close tooltip on mobile when clicking outside
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (isMobile && hoveredCard) {
        const target = event.target as HTMLElement;
        if (!target.closest('.timeline-card') && !target.closest('.phase-tooltip')) {
          setHoveredCard(null);
          setTooltipPosition(null);
        }
      }
    };

    if (isMobile) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('touchend', handleClickOutside);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('touchend', handleClickOutside);
    };
  }, [isMobile, hoveredCard]);

  const handleCardHover = (cardId: string, event: React.MouseEvent | React.TouchEvent) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const tooltipWidth = isMobile ? window.innerWidth * 0.9 : 500;
    const tooltipHeight = 400; // Estimated height
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const padding = 20; // Minimum distance from viewport edges
    
    // Calculate optimal x position (centered on element, but keep within viewport)
    let x = rect.left + rect.width / 2;
    if (x - tooltipWidth / 2 < padding) {
      x = tooltipWidth / 2 + padding;
    } else if (x + tooltipWidth / 2 > viewportWidth - padding) {
      x = viewportWidth - tooltipWidth / 2 - padding;
    }
    
    // Determine if tooltip should go above or below based on available space
    // Ensure we have enough space for the tooltip
    const spaceAbove = rect.top - padding;
    const spaceBelow = viewportHeight - rect.bottom - padding;
    const minSpaceNeeded = tooltipHeight + 20;
    
    let placement: 'above' | 'below';
    if (spaceAbove >= minSpaceNeeded) {
      placement = 'above';
    } else if (spaceBelow >= minSpaceNeeded) {
      placement = 'below';
    } else {
      // Choose the side with more space
      placement = spaceAbove > spaceBelow ? 'above' : 'below';
    }
    
    let y: number;
    if (placement === 'above') {
      y = rect.top - 10;
      // Ensure tooltip doesn't go off top of screen
      if (y - tooltipHeight < padding) {
        y = padding + tooltipHeight;
      }
    } else {
      y = rect.bottom + 10;
      // Ensure tooltip doesn't go off bottom of screen
      if (y + tooltipHeight > viewportHeight - padding) {
        y = viewportHeight - tooltipHeight - padding;
      }
    }
    
    setTooltipPosition({
      x: x,
      y: y,
      placement: placement
    });
    setHoveredCard(cardId);
  };

  const handleCardLeave = () => {
    if (!isMobile) {
      setHoveredCard(null);
      setTooltipPosition(null);
    }
  };

  const handleCardClick = (cardId: string, event: React.MouseEvent | React.TouchEvent) => {
    if (isMobile) {
      if (hoveredCard === cardId) {
        setHoveredCard(null);
        setTooltipPosition(null);
      } else {
        handleCardHover(cardId, event);
      }
    }
  };

  return (
    <>
      <style>{`
        :root {
            --aeris-bg: #050505;
            --aeris-grid-line: rgba(255, 255, 255, 0.1);
            --aeris-text-main: #f0f0f0;
            --aeris-text-muted: #666666;
            --aeris-accent: #ff4d00;
            --aeris-font-head: 'Archivo', sans-serif;
            --aeris-font-mono: 'JetBrains Mono', monospace;
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

        .section-header h2 .roadmap-title {
            font-family: 'Archivo', sans-serif;
            font-weight: 900;
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


        .phase-tooltip {
            position: fixed;
            z-index: 1000;
            background: rgba(5, 5, 5, 0.98);
            border: 2px solid var(--aeris-accent);
            padding: 1.5rem;
            max-width: 500px;
            max-height: 70vh;
            overflow-y: auto;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .phase-tooltip.visible {
            opacity: 1;
        }

        .phase-tooltip.placement-above {
            transform: translate(-50%, -100%) translateY(-10px);
        }

        .phase-tooltip.placement-above.visible {
            transform: translate(-50%, -100%);
        }

        .phase-tooltip.placement-below {
            transform: translate(-50%, 0) translateY(10px);
        }

        .phase-tooltip.placement-below.visible {
            transform: translate(-50%, 0);
        }

        .phase-tooltip.placement-above::before {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 8px solid var(--aeris-accent);
        }

        .phase-tooltip.placement-below::before {
            content: '';
            position: absolute;
            top: -8px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-bottom: 8px solid var(--aeris-accent);
        }

        .tooltip-title {
            font-family: var(--aeris-font-head);
            font-size: 1.2rem;
            color: var(--aeris-accent);
            margin-bottom: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .tooltip-description {
            font-family: var(--aeris-font-mono);
            font-size: 0.85rem;
            color: var(--aeris-text-main);
            line-height: 1.6;
            margin-bottom: 1rem;
        }

        .tooltip-activities {
            margin-top: 1rem;
        }

        .tooltip-activities-title {
            font-family: var(--aeris-font-head);
            font-size: 0.75rem;
            color: var(--aeris-text-muted);
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 0.5rem;
        }

        .tooltip-activity-item {
            font-family: var(--aeris-font-mono);
            font-size: 0.75rem;
            color: var(--aeris-text-muted);
            line-height: 1.5;
            margin-bottom: 0.4rem;
            padding-left: 1rem;
            position: relative;
        }

        .tooltip-activity-item::before {
            content: '→';
            position: absolute;
            left: 0;
            color: var(--aeris-accent);
        }

        .tooltip-close {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: transparent;
            border: 1px solid var(--aeris-accent);
            color: var(--aeris-accent);
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-family: var(--aeris-font-mono);
            font-size: 0.9rem;
            transition: all 0.2s ease;
        }

        .tooltip-close:hover {
            background: var(--aeris-accent);
            color: var(--aeris-bg);
        }

        @media (min-width: 1025px) {
            .tooltip-close {
                display: none;
            }
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
            margin-bottom: 0.5rem;
        }

        .card-hover-hint {
            font-family: var(--aeris-font-mono);
            font-size: 0.6rem;
            color: var(--aeris-accent);
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-top: 0.5rem;
            opacity: 0.7;
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

            @media (max-width: 1024px) {
            .phase-tooltip {
                max-width: 90vw;
                left: 5vw !important;
                right: 5vw;
                transform: translateX(0) !important;
                pointer-events: auto;
                position: fixed;
                bottom: 2rem;
                top: auto !important;
            }
            .phase-tooltip::before {
                display: none;
            }
        }
      `}</style>

      <Navbar />
      {hoveredCard && tooltipPosition && cardDescriptions[hoveredCard] && (
        <div 
          className={`phase-tooltip placement-${tooltipPosition.placement} ${hoveredCard ? 'visible' : ''}`}
          style={{
            left: isMobile ? undefined : `${tooltipPosition.x}px`,
            top: isMobile ? undefined : `${tooltipPosition.y}px`,
            transform: isMobile ? 'none' : undefined
          }}
        >
          {isMobile && (
            <button 
              className="tooltip-close"
              onClick={() => {
                setHoveredCard(null);
                setTooltipPosition(null);
              }}
              aria-label="Close tooltip"
            >
              ×
            </button>
          )}
          <div className="tooltip-title">{cardDescriptions[hoveredCard]?.title}</div>
          <div className="tooltip-description">{cardDescriptions[hoveredCard]?.detailedExplanation}</div>
        </div>
      )}
      <section className="aeris-timeline-section" style={{paddingTop: '3.5rem'}}>
        <div className="aeris-container">
          
          <div className="section-header">
            <h2>
              <span className="accent-block"></span>
              <span className="roadmap-title">Strategic Roadmap</span>
            </h2>
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
                <h3>Phase I</h3>
                <span className="date-range">2026.01 — 2028.12</span>
              </div>
              <div className="timeline-track-cell"></div>
              
              <div className="timeline-item-container lane-disaster">
                <div 
                  className="timeline-card"
                  onMouseEnter={(e) => !isMobile && handleCardHover('phase1-disaster', e)}
                  onMouseLeave={handleCardLeave}
                  onClick={(e) => handleCardClick('phase1-disaster', e)}
                  onTouchStart={(e) => handleCardClick('phase1-disaster', e)}
                >
                  <span className="mobile-tag hidden-desktop">Disaster Response</span>
                  <div className="card-title">R&D / Simulation</div>
                  <div className="card-desc">Core physics engine validation and drone swarm behavioral testing.</div>
                  <div className="card-hover-hint">{isMobile ? 'Tap for details' : 'Hover for details'}</div>
                </div>
              </div>
              <div className="timeline-item-container lane-infra"></div>
              <div className="timeline-item-container lane-agri"></div>
            </div>

            {/* PHASE II */}
            <div className="phase-group phase-2">
              <div className="phase-header">
                <h3>Phase II</h3>
                <span className="date-range">2029.01 — 2033.12</span>
              </div>
              <div className="timeline-track-cell"></div>

              <div className="timeline-item-container lane-disaster">
                <div 
                  className="timeline-card"
                  onMouseEnter={(e) => !isMobile && handleCardHover('phase2-disaster', e)}
                  onMouseLeave={handleCardLeave}
                  onClick={(e) => handleCardClick('phase2-disaster', e)}
                  onTouchStart={(e) => handleCardClick('phase2-disaster', e)}
                >
                  <span className="mobile-tag hidden-desktop">Disaster Response</span>
                  <div className="card-title">Prototype Tests</div>
                  <div className="card-desc">Live environment stress testing in controlled zones.</div>
                  <div className="card-hover-hint">{isMobile ? 'Tap for details' : 'Hover for details'}</div>
                </div>
              </div>

              <div className="timeline-item-container lane-infra">
                <div 
                  className="timeline-card"
                  onMouseEnter={(e) => !isMobile && handleCardHover('phase2-infra', e)}
                  onMouseLeave={handleCardLeave}
                  onClick={(e) => handleCardClick('phase2-infra', e)}
                  onTouchStart={(e) => handleCardClick('phase2-infra', e)}
                >
                  <span className="mobile-tag hidden-desktop">Infrastructure</span>
                  <div className="card-title">Survey Workflows</div>
                  <div className="card-desc">Automated bridge and tunnel scanning protocols.</div>
                  <div className="card-hover-hint">{isMobile ? 'Tap for details' : 'Hover for details'}</div>
                </div>
              </div>

              <div className="timeline-item-container lane-agri">
                <div 
                  className="timeline-card"
                  onMouseEnter={(e) => !isMobile && handleCardHover('phase2-agri', e)}
                  onMouseLeave={handleCardLeave}
                  onClick={(e) => handleCardClick('phase2-agri', e)}
                  onTouchStart={(e) => handleCardClick('phase2-agri', e)}
                >
                  <span className="mobile-tag hidden-desktop">Agriculture</span>
                  <div className="card-title">Multispectral</div>
                  <div className="card-desc">Crop health analysis integration.</div>
                  <div className="card-hover-hint">{isMobile ? 'Tap for details' : 'Hover for details'}</div>
                </div>
              </div>
            </div>

            {/* PHASE III */}
            <div className="phase-group phase-3">
              <div className="phase-header">
                <h3>Phase III</h3>
                <span className="date-range">2034.01 — 2039.05</span>
              </div>
              <div className="timeline-track-cell"></div>

              <div className="timeline-item-container lane-disaster">
                <div 
                  className="timeline-card"
                  onMouseEnter={(e) => !isMobile && handleCardHover('phase3-disaster', e)}
                  onMouseLeave={handleCardLeave}
                  onClick={(e) => handleCardClick('phase3-disaster', e)}
                  onTouchStart={(e) => handleCardClick('phase3-disaster', e)}
                >
                  <span className="mobile-tag hidden-desktop">Disaster Response</span>
                  <div className="card-title">Pilot Deployments</div>
                  <div className="card-desc">First-response autonomous units in coastal regions.</div>
                  <div className="card-hover-hint">{isMobile ? 'Tap for details' : 'Hover for details'}</div>
                </div>
              </div>

              <div className="timeline-item-container lane-infra">
                <div 
                  className="timeline-card"
                  onMouseEnter={(e) => !isMobile && handleCardHover('phase3-infra', e)}
                  onMouseLeave={handleCardLeave}
                  onClick={(e) => handleCardClick('phase3-infra', e)}
                  onTouchStart={(e) => handleCardClick('phase3-infra', e)}
                >
                  <span className="mobile-tag hidden-desktop">Infrastructure</span>
                  <div className="card-title">Standardization</div>
                  <div className="card-desc">National grid partnership and compliance.</div>
                  <div className="card-hover-hint">{isMobile ? 'Tap for details' : 'Hover for details'}</div>
                </div>
              </div>

              <div className="timeline-item-container lane-agri">
                <div 
                  className="timeline-card"
                  onMouseEnter={(e) => !isMobile && handleCardHover('phase3-agri', e)}
                  onMouseLeave={handleCardLeave}
                  onClick={(e) => handleCardClick('phase3-agri', e)}
                  onTouchStart={(e) => handleCardClick('phase3-agri', e)}
                >
                  <span className="mobile-tag hidden-desktop">Agriculture</span>
                  <div className="card-title">Alerting + Tasking</div>
                  <div className="card-desc">Automated irrigation and treatment dispatch.</div>
                  <div className="card-hover-hint">{isMobile ? 'Tap for details' : 'Hover for details'}</div>
                </div>
              </div>
            </div>

            {/* PHASE IV */}
            <div className="phase-group phase-4">
              <div className="phase-header">
                <h3>Phase IV</h3>
                <span className="date-range">2040 — Beyond</span>
              </div>
              <div className="timeline-track-cell"></div>

              <div className="timeline-item-container lane-disaster">
                <div 
                  className="timeline-card"
                  onMouseEnter={(e) => !isMobile && handleCardHover('phase4-disaster', e)}
                  onMouseLeave={handleCardLeave}
                  onClick={(e) => handleCardClick('phase4-disaster', e)}
                  onTouchStart={(e) => handleCardClick('phase4-disaster', e)}
                >
                  <span className="mobile-tag hidden-desktop">Disaster Response</span>
                  <div className="card-title">Scale Rollout</div>
                  <div className="card-desc">Global rapid response network activation.</div>
                  <div className="card-hover-hint">{isMobile ? 'Tap for details' : 'Hover for details'}</div>
                </div>
              </div>

              <div className="timeline-item-container lane-infra">
                <div 
                  className="timeline-card"
                  onMouseEnter={(e) => !isMobile && handleCardHover('phase4-infra', e)}
                  onMouseLeave={handleCardLeave}
                  onClick={(e) => handleCardClick('phase4-infra', e)}
                  onTouchStart={(e) => handleCardClick('phase4-infra', e)}
                >
                  <span className="mobile-tag hidden-desktop">Infrastructure</span>
                  <div className="card-title">Enterprise Ops</div>
                  <div className="card-desc">Full-scale urban monitoring systems.</div>
                  <div className="card-hover-hint">{isMobile ? 'Tap for details' : 'Hover for details'}</div>
                </div>
              </div>

              <div className="timeline-item-container lane-agri">
                <div 
                  className="timeline-card"
                  onMouseEnter={(e) => !isMobile && handleCardHover('phase4-agri', e)}
                  onMouseLeave={handleCardLeave}
                  onClick={(e) => handleCardClick('phase4-agri', e)}
                  onTouchStart={(e) => handleCardClick('phase4-agri', e)}
                >
                  <span className="mobile-tag hidden-desktop">Agriculture</span>
                  <div className="card-title">Regional Scaling</div>
                  <div className="card-desc">Continental food security optimization.</div>
                  <div className="card-hover-hint">{isMobile ? 'Tap for details' : 'Hover for details'}</div>
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
