pipeline {
  environment {
    DOCKERHUB_CREDENTIALS = credentials('docker-hub')
  }
  agent any
  stages {
    stage('clean data') {
        steps {
            sh 'docker system prune -a --volumes -f'
        }
    }
    stage('build') {
        steps {
            sh '/usr/local/bin/docker-compose build'
        }
    }
    stage('Deploy Image') {
        steps {
            sh 'echo $DOCKERHUB_CREDENTIALS_USR | docker login -u $DOCKERHUB_CREDENTIALS_USR  --password-stdin'
            sh '/usr/local/bin/docker-compose push'
        }
    }
  }
}