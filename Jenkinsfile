pipeline {
  agent any

  environment {
    NODE_OPTIONS = '--max-old-space-size=4096'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Run Playwright tests') {
      steps {
        sh 'npx playwright install --with-deps'
        sh 'npm run test:all'
      }
      post {
        always {
          archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
      }
    }
  }

  post {
    always {
      junit 'test-results/**/*.xml'
    }
  }
}
