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
                        def commitSha = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                        withEnv(["GOOGLE_APPLICATION_CREDENTIALS=${GC_KEY_FILE}", "COMMIT_SHA=${commitSha}", "PROJECT_ID=${PROJECT_ID}"]) {
                            sh "gcloud auth activate-service-account --key-file=${GC_KEY_FILE} --verbosity=info"
                            sh '''
                            gcloud builds submit --config=cloudbuild.yaml --substitutions=_COMMIT_SHA=${COMMIT_SHA}
                            '''
                        }
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    sh "sed -i 's|gcr.io/${PROJECT_ID}/reflect-react-app:latest|gcr.io/${PROJECT_ID}/reflect-react-app:${COMMIT_SHA}|g' react-frontend-deployment.yaml"
                    withCredentials([file(credentialsId: "${GC_KEY}", variable: 'GC_KEY_FILE')]) {
                        sh '''
                            gcloud auth activate-service-account --key-file=${GC_KEY_FILE}
                            gcloud config set project ${PROJECT_ID}
                            gcloud container clusters get-credentials ${CLUSTER} --zone ${ZONE} --project ${PROJECT_ID}
                            kubectl apply -f react-frontend-deployment.yaml
                        '''
                    }
                }
            }
        }
    }
}
