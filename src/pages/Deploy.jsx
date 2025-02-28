// src/pages/Deploy.jsx
import React from 'react';

const Deploy = () => {
  return (
    <section className="deploy">
      <h1>Deployment Information</h1>
      <p>This site can be deployed on both Netlify and Vercel. Both services offer:</p>
      <ul>
        <li>Easy integration with Git repositories</li>
        <li>Automatic builds and deployments</li>
        <li>Serverless functions and edge caching</li>
        <li>Custom domain support</li>
        <li>Global CDN for fast performance</li>
      </ul>
      <h2>Netlify</h2>
      <p>
        Netlify provides a simple deployment process with continuous integration and a built-in content delivery network (CDN).
      </p>
      <h2>Vercel</h2>
      <p>
        Vercel offers a streamlined experience for deploying front-end frameworks along with serverless functions and edge caching.
      </p>
    </section>
  );
};

export default Deploy;
