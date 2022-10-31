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
                sh '/usr/local/bin/docker-compose up -d --wait'
                sh '/usr/local/bin/docker-compose ps'
            }
        }
    }
}