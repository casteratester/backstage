pipeline {
    agent any
    options {
        skipStagesAfterUnstable()
    }
    environment {
        customImage = ''
    }

    stages {

       stage ('Say Hello') {
            steps {
                sh '''
                    echo "Hello"
                '''
            }
        }

        stage ('Build') {
            steps {
                script {
                    customImage = docker.build("hrbr.dev.castera.us/library/backstage:${env.BUILD_ID}", "./packages/backend/Dockerfile")
                }
            }
        }

        stage('Publish') {
            steps{
                script {
                    docker.withRegistry( 'https://hrbr.dev.castera.us', 'harbor' ) {
                        customImage.push()
                    }
                }
            }
        }
    }
}