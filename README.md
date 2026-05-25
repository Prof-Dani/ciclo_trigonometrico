#  Ciclo Trigonométrico

Projeto de um aplicativo mobile interativo desenvolvido em **React Native com Expo**, projetado para ser integrado a um servidor backend em **Java (Spring Boot)** via Docker. O app permite explorar os eixos de seno e cosseno dinamicamente, enviando o ângulo selecionado para o backend processar os cálculos matemáticos em tempo real.

## 📋 Guia de Comandos do Terminal

Se você estiver iniciando o projeto do zero no **GitHub Codespaces**, siga a sequência de comandos abaixo:

### 1. Criar a estrutura limpa do app:
```bash
npx create-expo-app@latest ciclo_trigonometrico --template blank

2. Entrar na pasta correta do projeto:
Bash
cd ciclo_trigonometrico

3. Instalar o Ngrok (responsável pelo túnel para o celular):
Bash
npm install -g @expo/ngrok

4. Instalar a biblioteca do Slider (barra de arrastar):
Bash
npx expo install @react-native-community/slider

5. Garantir que todas as dependências estejam baixadas:
Bash
npm install

6. Iniciar o aplicativo e gerar o QR Code:
Bash
npx expo start --tunnel