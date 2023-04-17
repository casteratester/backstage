pipeline {
    agent {
        kubernetes {
            label 'spring-petclinic-demo'
            defaultContainer 'jnlp'
            yaml """
apiVersion: v1
kind: Pod
metadata:
labels:
  component: ci
spec:
  # Use service account that can deploy to all namespaces
  serviceAccountName: cd-jenkins
  containers:
  - name: maven
    image: maven:latest
    command:
    - cat
    tty: true
    volumeMounts:
      - mountPath: "/root/.m2"
        name: m2
  - name: docker
    image: docker:latest
    command:
    - cat
    tty: true
    volumeMounts:
    - mountPath: /var/run/docker.sock
      name: docker-sock
  volumes:
    - name: docker-sock
      hostPath:
        path: /var/run/docker.sock
    - name: m2
      persistentVolumeClaim:
        claimName: m2
"""
    }
}
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
                container('docker') {
                    script {
                        customImage = docker.build("hrbr.dev.castera.us/library/backstage:${env.BUILD_ID}", "./packages/backend/Dockerfile")
                    }
                }
            }
        }

        stage('Publish') {
            steps{
                container('docker') {
                    script {
                        docker.withRegistry( 'https://hrbr.dev.castera.us', 'harbor' ) {
                            customImage.push()
                        }
                    }
                }
            }
        }
    }
}