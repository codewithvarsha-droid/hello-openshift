# Hello OpenShift

A simple, beginner-friendly Node.js web application designed to run locally and deploy seamlessly on **Red Hat OpenShift**.

---

## Features

- **Heading**: Displays `"Hello, OpenShift!"`
- **Welcome Message**: Clean card with a friendly cloud message.
- **Clean Design**: Styled with modern, responsive CSS without external heavy dependencies.
- **Zero External Dependencies**: Uses Node's built-in `http` module (`no npm install required`).
- **OpenShift Ready**: Listens on `process.env.PORT || 8080` and runs as a non-root user.
- **No Database**: Pure stateless web application.

---

## File Structure

```text
openshift-project/
├── package.json      # Node.js project metadata and start script
├── server.js         # Core HTTP web server and HTML/CSS markup
├── Dockerfile        # Container build instructions (Node 20 Alpine)
├── .dockerignore     # Excludes unnecessary files from container builds
└── README.md         # Documentation and deployment instructions
```

### File Purposes

1. **`package.json`**: Defines the project name and specifies `npm start` (`node server.js`). This file allows OpenShift's Source-to-Image (S2I) builder to recognize this as a Node.js project.
2. **`server.js`**: Contains the lightweight HTTP server using Node.js built-in `http` module. It listens on `process.env.PORT` (or default `8080`) and responds with a clean HTML page.
3. **`Dockerfile`**: Packages the app into a container using `node:20-alpine`, runs as non-root user (`USER node`), and exposes port `8080`.
4. **`.dockerignore`**: Ensures temporary or non-essential files are excluded when building container images.

---

## How to Run Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version 16 or newer recommended).

### Step 1: Clone or navigate to the project directory
```bash
cd openshift-project
```

### Step 2: Start the application
Because this application uses the built-in `http` module, you do not need to run `npm install`. Simply run:

```bash
node server.js
```
*(Or alternatively: `npm start`)*

### Step 3: View in your browser
Open your browser and navigate to:
```text
http://localhost:8080
```

To stop the server, press `CTRL + C` in your terminal.

---

## How to Deploy on Red Hat OpenShift

You can deploy this application onto OpenShift in two simple ways:

### Option A: Using the OpenShift Web Console (Easiest)

1. Push this project to your GitHub/GitLab repository.
2. Log in to your **OpenShift Web Console**.
3. Switch to the **Developer** perspective.
4. Select or create your project/namespace.
5. Click **+Add** and select **Import from Git**.
6. Enter your Git repository URL.
7. OpenShift will automatically detect the **Node.js** builder image.
8. Leave the default port (`8080`) and check **Create a route to the Application**.
9. Click **Create**. OpenShift will automatically build, deploy, and generate a public URL.

---

### Option B: Using the OpenShift CLI (`oc`)

1. Log in to your OpenShift cluster:
   ```bash
   oc login --server=<YOUR_CLUSTER_URL> --token=<YOUR_TOKEN>
   ```

2. Create or switch to your project:
   ```bash
   oc project <YOUR_PROJECT_NAME>
   ```

3. Create the application from your Git repository:
   ```bash
   oc new-app https://github.com/<your-username>/<your-repo-name>.git --name=hello-openshift
   ```

4. Expose the service to create a public Route (URL):
   ```bash
   oc expose svc/hello-openshift
   ```

5. Retrieve the application's public URL:
   ```bash
   oc get route hello-openshift
   ```
