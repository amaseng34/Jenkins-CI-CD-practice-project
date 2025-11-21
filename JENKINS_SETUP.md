# Настройка Jenkins для Node.js проекта

## Проблема: `npm: not found`

Если вы видите ошибку `npm: not found` в Jenkins pipeline, это означает, что Node.js и npm не установлены в Jenkins окружении.

## Решение 1: Использование Docker (Рекомендуется)

Текущий Jenkinsfile использует Docker агент с образом Node.js. Для этого:

### Требования:
- Docker должен быть установлен в Jenkins
- Jenkins должен иметь права на запуск Docker контейнеров

### Настройка Docker в Jenkins:

1. **Установите Docker на Jenkins сервере** (если еще не установлен)

2. **Убедитесь, что Jenkins может использовать Docker**:
   - Добавьте пользователя jenkins в группу docker:
     ```bash
     sudo usermod -aG docker jenkins
     sudo systemctl restart jenkins
     ```

3. **Установите Docker Pipeline Plugin в Jenkins**:
   - Jenkins → Manage Jenkins → Manage Plugins
   - Найдите "Docker Pipeline" и установите

4. **Текущий Jenkinsfile уже настроен** - просто запустите pipeline!

---

## Решение 2: Установка Node.js через Jenkins Tool (Без Docker)

Если Docker недоступен, используйте этот вариант:

### Шаг 1: Установите NodeJS Plugin в Jenkins

1. Jenkins → **Manage Jenkins** → **Manage Plugins**
2. Вкладка **Available**
3. Найдите **"NodeJS Plugin"**
4. Установите плагин
5. Перезапустите Jenkins

### Шаг 2: Настройте Node.js в Jenkins

1. Jenkins → **Manage Jenkins** → **Global Tool Configuration**
2. Найдите секцию **"NodeJS"**
3. Нажмите **"Add NodeJS"**
4. Заполните:
   - **Name**: `NodeJS-18` (или любое имя)
   - **Version**: Выберите версию 18.x
   - Оставьте остальное по умолчанию
5. Нажмите **"Save"**

### Шаг 3: Обновите Jenkinsfile

Замените текущий Jenkinsfile на этот вариант (без Docker):

```groovy
pipeline {
    agent any
    
    // Environment variables
    environment {
        NODE_VERSION = '18'
        PORT = '3000'
    }
    
    // Pipeline stages
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from repository...'
                checkout scm
                script {
                    def gitCommit = sh(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()
                    env.GIT_COMMIT_SHORT = gitCommit
                    echo "Git commit: ${env.GIT_COMMIT_SHORT}"
                }
            }
        }
        
        stage('Setup Node.js') {
            steps {
                echo 'Setting up Node.js...'
                // Используйте имя, которое вы указали в Global Tool Configuration
                sh '''
                    echo "Node.js version:"
                    node --version || echo "Node.js не найден"
                    echo "npm version:"
                    npm --version || echo "npm не найден"
                '''
                // Установите Node.js через tool
                tool name: 'NodeJS-18', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                sh 'node --version'
                sh 'npm --version'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
                echo 'Dependencies installed successfully!'
            }
        }
        
        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
                echo 'All tests passed!'
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building project...'
                sh 'node --version'
                sh 'npm --version'
                sh 'test -f src/index.js || exit 1'
                sh 'test -f src/utils.js || exit 1'
                sh 'test -f package.json || exit 1'
                echo 'Build validation successful!'
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline execution completed'
        }
        success {
            echo 'Pipeline succeeded! 🎉'
        }
        failure {
            echo 'Pipeline failed! ❌'
        }
    }
}
```

**Важно**: Замените `'NodeJS-18'` на имя, которое вы указали в Global Tool Configuration!

---

## Решение 3: Установка Node.js вручную на Jenkins сервере

Если оба варианта выше не подходят:

1. **Установите Node.js на Jenkins сервере**:
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Или используйте nvm
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   nvm install 18
   ```

2. **Убедитесь, что Node.js доступен в PATH**:
   ```bash
   which node
   which npm
   ```

3. **В этом случае можно использовать текущий Jenkinsfile** (без изменений), но убедитесь, что Node.js установлен глобально на сервере

---

## Проверка настройки

После настройки любого из вариантов:

1. **Запустите pipeline**
2. **Проверьте вывод** - не должно быть ошибки `npm: not found`
3. **Убедитесь, что все этапы проходят успешно**

---

## Текущий статус

Текущий Jenkinsfile использует **Решение 1 (Docker)**. Если Docker недоступен, используйте **Решение 2 (NodeJS Plugin)**.

