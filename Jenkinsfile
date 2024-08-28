pipeline {
    agent any
    environment {
        GIT_CREDENTIALS_ID = 'github-credentials-id'
        GC_KEY = 'gke-credentials-id'
        REGISTRY_URI = 'asia-south1-docker.pkg.dev'
        PROJECT_ID = 'reflection01-431417'
        ARTIFACT_REGISTRY = 'reflection-artifacts'
        CLUSTER = 'reflection-cluster-1'
        ZONE = 'us-central1'
        REPO_URL = "${REGISTRY_URI}/${PROJECT_ID}/${ARTIFACT_REGISTRY}"
        TAG_NAME = 'latest'  // or any other tag you prefer
    }
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/BorisSolomonia/reflect-react-app.git', branch: 'master', credentialsId: "${GIT_CREDENTIALS_ID}"
            }
        }
        stage('Build and Push Image') {
            steps {
                withCredentials([file(credentialsId: "${GC_KEY}", variable: 'GC_KEY_FILE')]) {
                    script {
                        withEnv(["GOOGLE_APPLICATION_CREDENTIALS=${GC_KEY_FILE}"]) {
                            sh "gcloud auth activate-service-account --key-file=${GC_KEY_FILE} --verbosity=info"
                            
                            // Trigger Google Cloud Build with substitutions
                            sh '''
                            gcloud builds submit --config=cloudbuild.yaml --substitutions=_PROJECT_ID=${PROJECT_ID},_TAG_NAME=${TAG_NAME}
                            '''
                        }
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Update the Kubernetes deployment file with the correct image URL
                    sh "sed -i 's|borissolomonia/reflect-react-app:latest|gcr.io/${PROJECT_ID}/reflect-react-app:${TAG_NAME}|g' react-frontend-deployment.yaml"
                    withCredentials([file(credentialsId: "${GC_KEY}", variable: 'GC_KEY_FILE')]) {
                        // Authenticate using gcloud
                        sh '''
                            gcloud auth activate-service-account --key-file=${GC_KEY_FILE}
                            gcloud config set project ${PROJECT_ID}
                            gcloud container clusters get-credentials ${CLUSTER} --zone ${ZONE} --project ${PROJECT_ID}
                        '''
                        // Deploy the application
                        sh '''
                            kubectl apply -f react-frontend-deployment.yaml
                        '''
                    }
                }
            }
        }
    }
}
