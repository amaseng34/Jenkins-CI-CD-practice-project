# Jenkins CI/CD Practice Project

A simple Node.js test project designed for practicing Jenkins CI/CD pipelines. This project demonstrates a complete CI/CD workflow with automated testing, building, and validation.

## 🎯 Project Overview

This project includes:
- A simple Express.js server with a "Hello World" API
- Utility functions for testing (add, subtract, capitalize)
- Jest test suite with multiple passing tests
- Complete Jenkinsfile for CI/CD pipeline automation
- Health check endpoint for monitoring

## 📁 Project Structure

```
project_jenkins/
│
├── src/
│   ├── index.js          # Express server with API endpoints
│   └── utils.js          # Utility functions (add, subtract, capitalize)
│
├── tests/
│   └── utils.test.js     # Jest tests for utility functions
│
├── package.json          # Project dependencies and scripts
├── Jenkinsfile           # Jenkins CI/CD pipeline configuration
├── .gitignore           # Git ignore file
└── README.md            # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (comes with Node.js)
- Git
- Jenkins (for CI/CD pipeline)

### Installation

1. **Clone the repository** (or create a new directory):
   ```bash
   git clone <your-repository-url>
   cd project_jenkins
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Verify installation**:
   ```bash
   npm --version
   node --version
   ```

## 💻 Running the Application

### Start the Server

```bash
npm start
```

The server will start on `http://localhost:3000`

### Available Endpoints

- **GET /** - Hello World message
  ```bash
  curl http://localhost:3000/
  ```

- **GET /health** - Health check endpoint
  ```bash
  curl http://localhost:3000/health
  ```

- **GET /api/utils** - Example endpoint using utility functions
  ```bash
  curl http://localhost:3000/api/utils
  ```

## 🧪 Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Run Tests with Coverage Report

```bash
npm run test:coverage
```

### Test Results

The test suite includes tests for:
- `add()` function - 3 tests
- `subtract()` function - 3 tests
- `capitalize()` function - 5 tests

**Total: 11 passing tests**

## 🔧 Jenkins CI/CD Pipeline

### Pipeline Stages

The Jenkinsfile defines the following stages:

1. **Checkout** - Retrieves source code from the repository
2. **Install Dependencies** - Installs npm packages
3. **Run Tests** - Executes Jest test suite
4. **Build** - Validates project builds successfully

### Setting Up Jenkins Pipeline

1. **Install Jenkins** (if not already installed)

2. **Create a New Pipeline Job**:
   - Go to Jenkins Dashboard
   - Click "New Item"
   - Enter project name
   - Select "Pipeline"
   - Click "OK"

3. **Configure Pipeline**:
   - In the Pipeline section, select "Pipeline script from SCM"
   - Choose your SCM (Git, GitHub, etc.)
   - Enter your repository URL
   - Set branch to `*/main` or `*/master`
   - Set Script Path to `Jenkinsfile`
   - Click "Save"

4. **Run the Pipeline**:
   - Click "Build Now" to trigger the pipeline
   - View the pipeline progress in the console output

### Pipeline Execution

The pipeline will:
- ✅ Checkout your code
- ✅ Install all dependencies
- ✅ Run the test suite
- ✅ Validate the build
- ✅ Report success/failure status

## 📦 Dependencies

### Production Dependencies
- **express** (^4.18.2) - Web framework for Node.js

### Development Dependencies
- **jest** (^29.7.0) - JavaScript testing framework
- **supertest** (^6.3.3) - HTTP assertion library (available for future use)

## 🐳 Docker Support

This project can be containerized for Docker environments. Example Dockerfile:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t jenkins-practice .
docker run -p 3000:3000 jenkins-practice
```

## 🔍 Code Quality

- Clear comments throughout the codebase
- Well-structured utility functions
- Comprehensive test coverage
- Follows Node.js best practices

## 📝 Scripts

- `npm start` - Start the Express server
- `npm test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## 🤝 Contributing

This is a practice project for learning Jenkins CI/CD. Feel free to:
- Add more tests
- Extend the API endpoints
- Enhance the Jenkins pipeline
- Add Docker configuration

## 📄 License

MIT License - feel free to use this project for learning and practice.

## 🎓 Learning Resources

- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Node.js Documentation](https://nodejs.org/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Jest Documentation](https://jestjs.io/docs/getting-started)

---

**Happy Learning! 🚀**

