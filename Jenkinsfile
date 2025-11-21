/**
 * Jenkins CI/CD Pipeline for Node.js Test Project
 * 
 * This pipeline includes:
 * - Checkout: Gets the code from repository
 * - Install Dependencies: Installs npm packages
 * - Run Tests: Executes Jest test suite
 * - Build: Validates the project builds successfully
 */

pipeline {
    // Agent specifies where the pipeline will run
    agent any
    
    // Configure Node.js tool (requires NodeJS Plugin to be installed)
    // IMPORTANT: Set the name to match your Node.js tool name in Global Tool Configuration
    tools {
        nodejs 'NodeJS-18'  // Change this to your tool name from Global Tool Configuration
    }
    
    // Environment variables for the pipeline
    environment {
        NODE_VERSION = '18'
        PORT = '3000'
    }
    
    // Pipeline stages
    stages {
        /**
         * Stage 1: Checkout
         * Jenkins automatically checks out code from SCM configuration
         * No explicit checkout needed when SCM is configured in Job settings
         */
        stage('Checkout') {
            steps {
                echo 'Code checkout is handled by Jenkins SCM configuration...'
                script {
                    // Use Jenkins built-in variables instead of git commands
                    if (env.GIT_COMMIT) {
                        echo "Git commit: ${env.GIT_COMMIT}"
                    }
                    if (env.GIT_BRANCH) {
                        echo "Git branch: ${env.GIT_BRANCH}"
                    }
                }
            }
        }
        
        /**
         * Stage 2: Install Dependencies
         * Installs all npm dependencies specified in package.json
         */
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
                echo 'Dependencies installed successfully!'
            }
        }
        
        /**
         * Stage 3: Run Tests
         * Executes the Jest test suite and generates coverage report
         */
        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
                echo 'All tests passed!'
            }
            post {
                always {
                    // Publish test results (if using test reporters)
                    echo 'Test stage completed'
                }
                success {
                    echo 'Tests passed successfully!'
                }
                failure {
                    echo 'Tests failed! Check the logs for details.'
                }
            }
        }
        
        /**
         * Stage 4: Build
         * Validates that the project builds and starts correctly
         */
        stage('Build') {
            steps {
                echo 'Building project...'
                // Verify the project can be built
                sh 'node --version'
                sh 'npm --version'
                
                // Validate main files exist
                sh 'test -f src/index.js || exit 1'
                sh 'test -f src/utils.js || exit 1'
                sh 'test -f package.json || exit 1'
                
                echo 'Build validation successful!'
            }
        }
        
        /**
         * Optional: Deployment Stage
         * This stage can be used to deploy the application
         * Uncomment and modify as needed for your deployment target
         */
        /*
        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                // Add your deployment commands here
                // Examples:
                // - Docker build and push
                // - Deploy to cloud platform
                // - Update server files
            }
        }
        */
    }
    
    // Post-build actions
    post {
        always {
            echo 'Pipeline execution completed'
            // Clean up workspace if needed
            // cleanWs()
        }
        success {
            echo 'Pipeline succeeded! 🎉'
            // You can add notifications here (email, Slack, etc.)
        }
        failure {
            echo 'Pipeline failed! ❌'
            // You can add notifications here for failures
        }
        cleanup {
            echo 'Cleaning up after pipeline execution...'
        }
    }
}
