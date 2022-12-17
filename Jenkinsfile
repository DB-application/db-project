pipeline {
    agent any
    stages {
        stage('check docker-compose') {
            steps {
                sh '/usr/local/bin/docker-compose --version'
            }
        }
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
    }
}

pipeline {
  environment {
    imagename = "kevalnagda/flaskapp"
    registryCredential = 'kevalnagda'
    dockerImage = ''
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
            sh '/usr/local/bin/docker-compose push'
        }
    }
  }
}