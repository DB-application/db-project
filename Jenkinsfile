pipeline {
    agent any
    stages {
        stage('clean data') {
            steps {
                sh 'docker system prune -a --volumes -f'
            }
        }
        stage('build') {
            steps {
                sh 'docker compose up -d --wait'
                sh 'docker compose ps'
            }
        }
    }
}