pipeline {
    agent any
    environment {
        GIT_CREDENTIALS_ID = 'github-credentials-id'
        GC_KEY = 'gke-credentials-id'
        REGISTRY_URI = 'asia-south1-docker.pkg.dev'
        PROJECT_ID = 'reflection01-431417'
        ARTIFACT_REGISTRY = 'reflection-artifacts'
        CLUSTER = 'reflection-cluster-1'
        ZONE = 'us-central1'  // Ensure this matches the zone where your cluster is located
        REPO_URL = "${REGISTRY_URI}/${PROJECT_ID}/${ARTIFACT_REGISTRY}"
    }
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/BorisSolomonia/reflect_4.git', branch: 'master', credentialsId: "${GIT_CREDENTIALS_ID}"
            }
        }
        stage('Build and Push Image') {
            steps {
                withCredentials([file(credentialsId: "${GC_KEY}", variable: 'GC_KEY_FILE')]) {
                    script {
                        withEnv(["GOOGLE_APPLICATION_CREDENTIALS=${GC_KEY_FILE}"]) {
                            sh "gcloud auth activate-service-account --key-file=${GC_KEY_FILE} --verbosity=debug"
                            sh 'gcloud auth configure-docker'
                        }
                        // Build the React app and create a Docker image
                        sh '''
                            docker build -t ${REPO_URL}/reflect_4:latest .
                            docker push ${REPO_URL}/reflect_4:latest
                        '''
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Update the Kubernetes deployment file with the correct image URL
                    sh "sed -i 's|IMAGE_URL|${REPO_URL}/reflect_4:latest|g' react-frontend-deployment.yaml"
                    withCredentials([file(credentialsId: "${GC_KEY}", variable: 'GC_KEY_FILE')]) {
                        sh '''
                            gcloud container clusters get-credentials ${CLUSTER} --zone ${ZONE} --project ${PROJECT_ID}
                            kubectl apply -f react-frontend-deployment.yaml
                        '''
                    }
                }
            }
        }
    }
}
