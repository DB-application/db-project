pipeline {
    agent any
    stages {
        stage('check docker-compose') {
            steps {
                sh 'docker-compose --version'
            }
        }
        stage('clean data') {
            steps {
                sh 'docker system prune -a --volumes -f'
            }
        }
        stage('build') {
            steps {
                sh 'docker-compose up -d --wait'
                sh 'docker-compose ps'
            }
        }
    }
}