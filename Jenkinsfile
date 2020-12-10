//  Archivo Jenkinsfile para api-template
//
//  by: hugo Giraldo

def PROJECT_ID = "dataflow-chiper"
def envfile = "gs://variables-react/${JOB_NAME}/.env"
def imageTag = "gcr.io/${PROJECT_ID}/${JOB_NAME}:${BUILD_NUMBER}"
def buildimage  = "gs://ci-react-registry/${JOB_NAME}/${BUILD_NUMBER}"
def JENKINS_MAIL = "jenkins@hugogiraldodevops.com"
def MAIL_CI = "hugo.giraldo@chiper.co,oberto@chiper.co"
def MAIL_CD_DEV = "hugo.giraldo@chiper.co,oberto@chiper.co"
def MAIL_CD_LAB = "hugo.giraldo@chiper.co,oberto@chiper.co"
def PROJECT_ID_PROD = "dataflow-chiper"

pipeline {
  options {
      timeout(time: 20, unit: 'MINUTES')
  }
  agent {
    kubernetes {
      label 'slave-tma-front'
      defaultContainer 'jnlp'
      yaml """
apiversion: v1
kind: Pod
metadata:
  labels:
    component: ci
spec:
  serviceAccountName: cd-jenkins
  volumes:
  - name: dockersock
    hostPath:
      path: "/var/run/docker.sock"
  - name: docker
    hostPath:
      path: "/usr/bin/docker"
  - name: google-cloud-key
    secret:
      secretName: registry-jenkins
  containers:
  - name: gcloud
    image: gcr.io/cloud-builders/gcloud
    volumeMounts:
    - name: google-cloud-key
      readOnly: true
      mountPath: "/var/secrets/google"
    - name: docker
      mountPath: "/usr/bin/docker"
    - name: dockersock
      mountPath: "/var/run/docker.sock"
    command:
    - cat
    env:
    - name: GOOGLE_APPLICATION_CREDENTIALS
      value: /var/secrets/google/key.json
    tty: true
  - name: node
    image: node:10.16
    command:
    - cat
    tty: true
  - name: yarn
    image: yarnpkg/dev:latest
    command:
    - cat
    tty: true
  - name: kubectl
    image: gcr.io/cloud-builders/kubectl
    volumeMounts:
    - name: google-cloud-key
      readOnly: true
      mountPath: "/var/secrets/google"
    command:
    - cat
    env:
    - name: GOOGLE_APPLICATION_CREDENTIALS
      value: /var/secrets/google/key.json
    tty: true
  - name: docker
    image: docker:18
    volumeMounts:
    - name: google-cloud-key
      readOnly: true
      mountPath: "/var/secrets/google"
    - name: docker
      mountPath: "/usr/bin/docker"
    - name: dockersock
      mountPath: "/var/run/docker.sock"
    command:
    - cat
    env:
    - name: GOOGLE_APPLICATION_CREDENTIALS
      value: /var/secrets/google/key.json
    tty: true
"""
    }
  }
  environment {
    COMMITTER_EMAIL = sh (script: 'git --no-pager show -s --format=\'%ae\'', returnStdout: true).trim()
  }
  stages {
    stage('Initialize') {
      steps {
        container('docker') {
          sh 'docker --version'
        }
        container('gcloud') {
          sh 'gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS'
          sh "gcloud config set project ${PROJECT_ID}"
          sh 'ls -la'
        }
      }
    }
    stage('Test') {
      steps {
        container('node') {
          echo '-------------------------'
          echo 'Estructura del directorio'
          sh 'ls'
          echo '-------------------------'
          // sh 'npm run lint:fix'
          // sh 'npm run lint-report'
          // sh 'npm run test'
        }
      }
    }
    stage('Build') {
      steps {
        container('node') {
          sh 'more .env'
          sh "npm install -g yarn"
          sh "yarn"
          sh "yarn build:style"
          sh 'yarn build'
        }
      }
    }
    stage('Build-Image'){
      steps {
        container('docker') {
          sh 'docker build --tag=${JOB_NAME}:${BUILD_NUMBER} .'
        }
        container('docker') {
          sh "docker tag ${JOB_NAME}:${BUILD_NUMBER} gcr.io/${PROJECT_ID}/${JOB_NAME}:${BUILD_NUMBER}"
          sh "cat /var/secrets/google/key.json  | docker login -u _json_key --password-stdin gcr.io"
          sh "docker push gcr.io/${PROJECT_ID}/${JOB_NAME}:${BUILD_NUMBER}"
        }
      }
    }

    stage('Deploy develop') {
      // Developer Branches
      when { branch 'develop' }
      steps {
        container ('gcloud') {
          sh 'gcloud source repos clone k8s_deploy --project=dataflow-chiper'
        }
        container ('kubectl') {
          sh "sed -i.bak 's#us.gcr.io/dataflow-chiper/tma-front:latest#${imageTag}#' ./k8s_deploy/develop/tma-front/deployment.yaml"
          sh 'kubectl apply -f ./k8s_deploy/develop/tma-front/deployment.yaml'
        }
      }
    }

  }
  post {
    always {
      echo 'Pipeline Finalizado'
    }
    aborted{
      echo 'El Pipeline ha sido cancelado'
      
    }
    failure {
      echo 'Pipeline Fallo'
      
    }
    success {
      echo 'Pipeline Exitoso!!'
      
    }
  }
}