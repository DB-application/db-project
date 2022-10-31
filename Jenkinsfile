pipeline {
    agent any
    stages {
        stage('clean data') {
            steps {
                sh 'docker --version'
                sh 'docker-compose --version'
            }
        }
    }

    // agent any
    // stages {
    //     stage('clean data') {
    //         steps {
    //             sh 'docker-compose prune -a --volumes -f'
    //         }
    //     }
    //     stage('build') {
    //         steps {
    //             sh 'docker-compose up -d --wait'
    //             sh 'docker-compose ps'
    //         }
    //     }
    // }
}