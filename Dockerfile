# Use official lightweight Node.js Alpine base image
FROM node:20-alpine

# Set application directory
WORKDIR /app

# Copy application files
COPY package.json server.js ./

# Set default port environment variable
ENV PORT=8080

# Expose unprivileged port 8080
EXPOSE 8080

# Run as non-root user for OpenShift security compliance
USER node

# Start the Node.js application
CMD ["npm", "start"]
