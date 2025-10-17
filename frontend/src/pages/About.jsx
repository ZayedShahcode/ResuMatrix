import React from 'react';

const About = () => {
  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#0f172a',
    color: '#e2e8f0',
    padding: '60px 20px',
    fontFamily: "'Inter', 'Segoe UI', sans-serif"
  };

  const contentStyle = {
    maxWidth: '1000px',
    margin: '0 auto'
  };

  const headerStyle = {
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '1rem',
    background: 'linear-gradient(135deg, #60a5fa 0%, #a855f7 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center'
  };

  const subtitleStyle = {
    fontSize: '1.25rem',
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: '4rem',
    maxWidth: '700px',
    margin: '0 auto 4rem'
  };

  const sectionStyle = {
    backgroundColor: '#1e293b',
    borderRadius: '12px',
    padding: '2rem',
    marginBottom: '2rem',
    border: '1px solid #334155'
  };

  const sectionTitleStyle = {
    fontSize: '1.75rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#60a5fa'
  };

  const paragraphStyle = {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: '#cbd5e1',
    marginBottom: '1rem'
  };

  const featureGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
    marginTop: '1.5rem'
  };

  const featureCardStyle = {
    backgroundColor: '#334155',
    padding: '1.5rem',
    borderRadius: '8px',
    border: '1px solid #475569',
    transition: 'transform 0.2s, border-color 0.2s'
  };

  const featureTitleStyle = {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#a855f7',
    marginBottom: '0.5rem'
  };

  const featureDescStyle = {
    fontSize: '0.95rem',
    color: '#94a3b8',
    lineHeight: '1.6'
  };

  const highlightStyle = {
    color: '#60a5fa',
    fontWeight: '600'
  };

  const features = [
    {
      title: '📝 Real-time LaTeX Editing',
      desc: 'Edit your resume with LaTeX and instantly preview changes in a beautiful, compiled format.'
    },
    {
      title: '🤖 AI-Powered Optimization',
      desc: 'Get intelligent content suggestions tailored to specific job descriptions using advanced AI.'
    },
    {
      title: '✅ ATS-Friendly Design',
      desc: 'Ensure your resume passes Applicant Tracking System scans with optimized formatting.'
    },
    {
      title: '🎨 Modern Interface',
      desc: 'Enjoy a clean, distraction-free workspace with resizable panes and dark mode.'
    },
    {
      title: '⚡ Instant Preview',
      desc: 'Generate and view your compiled resume PDF in real time as you make changes.'
    },
    {
      title: '🎯 Job-Specific Tailoring',
      desc: 'Customize your resume content to match job requirements and industry standards.'
    }
  ];

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h1 style={headerStyle}>About ResuMatrix</h1>
        <p style={subtitleStyle}>
          The intelligent resume optimization platform that helps you stand out in today's competitive job market
        </p>

        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Our Mission</h2>
          <p style={paragraphStyle}>
            ResuMatrix empowers job seekers with a <span style={highlightStyle}>seamless, intelligent, and creative</span> way
            to present their skills and experience. We believe every professional deserves a resume that's personalized,
            impactful, and perfectly tailored to their target role.
          </p>
          <p style={paragraphStyle}>
            By combining <span style={highlightStyle}>AI-powered insights</span> with <span style={highlightStyle}>professional LaTeX formatting</span>,
            we're revolutionizing how resumes are created, ensuring you get noticed by recruiters and pass through ATS systems
            with ease.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Key Features</h2>
          <div style={featureGridStyle}>
            {features.map((feature, index) => (
              <div
                key={index}
                style={featureCardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = '#60a5fa';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#475569';
                }}
              >
                <div style={featureTitleStyle}>{feature.title}</div>
                <div style={featureDescStyle}>{feature.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Our Vision</h2>
          <p style={paragraphStyle}>
            ResuMatrix aims to become the go-to platform for professionals worldwide who want to create resumes that
            truly represent their potential. We're building a future where <span style={highlightStyle}>AI intelligence meets
              precision formatting</span>, making resume creation effortless and effective.
          </p>
          <p style={paragraphStyle}>
            Whether you're a recent graduate, seasoned professional, or career changer, ResuMatrix simplifies the
            entire process — from initial draft to final polish — helping you land that dream interview faster.
          </p>
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '3rem',
          padding: '2rem',
          backgroundColor: '#1e293b',
          borderRadius: '12px',
          border: '1px solid #334155'
        }}>
          <p style={{
            fontSize: '1.2rem',
            color: '#cbd5e1',
            marginBottom: '1rem'
          }}>
            Ready to transform your resume?
          </p>
          <p style={{
            fontSize: '1rem',
            color: '#94a3b8'
          }}>
            Start building with ResuMatrix today and take the first step toward your next career opportunity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;