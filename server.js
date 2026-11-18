// server.js - A beginner-friendly Node.js web server
const http = require('http');

// OpenShift assigns a port via the PORT environment variable.
// If not set (like in local development), default to port 8080.
const PORT = process.env.PORT || 8080;

// Create the HTTP server
const server = http.createServer((req, res) => {
  // Health check endpoint for OpenShift / Kubernetes monitoring
  if (req.url === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('OK');
  }

  // Set response header for HTML output
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

  // HTML content with a simple, clean, and responsive design
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hello OpenShift</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f3f4f6;
      color: #1f2937;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 1rem;
    }
    .card {
      background-color: #ffffff;
      border-radius: 12px;
      padding: 2.5rem;
      max-width: 480px;
      width: 100%;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
      text-align: center;
      border-top: 5px solid #ee0000;
    }
    .tag {
      display: inline-block;
      background-color: #fef2f2;
      color: #ee0000;
      font-size: 0.85rem;
      font-weight: 600;
      padding: 0.35rem 0.85rem;
      border-radius: 9999px;
      margin-bottom: 1.25rem;
    }
    h1 {
      font-size: 2.25rem;
      font-weight: 700;
      color: #111827;
      margin-bottom: 0.75rem;
    }
    p {
      font-size: 1.1rem;
      color: #4b5563;
      line-height: 1.6;
      margin-bottom: 1.75rem;
    }
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      font-weight: 500;
      color: #065f46;
      background-color: #d1fae5;
      padding: 0.5rem 1rem;
      border-radius: 8px;
    }
    .status-dot {
      width: 8px;
      height: 8px;
      background-color: #10b981;
      border-radius: 50%;
    }
  </style>
</head>
<body>
  <div class="card">
    <span class="tag">Cloud Native App</span>
    <h1>Hello, OpenShift!</h1>
    <p>Welcome to your first web application running smoothly on Red Hat OpenShift.</p>
    <div class="status-badge">
      <span class="status-dot"></span>
      Running on port ${PORT}
    </div>
  </div>
</body>
</html>`;

  // Send the HTML response to the browser
  res.end(html);
});

// Start listening for incoming requests
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});
