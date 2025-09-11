# Stage 1: Build a production-ready image
# Usar uma versão LTS e Alpine para tamanho menor
FROM node:22.18.0-alpine AS builder 

WORKDIR /app

# Copia package.json e package-lock.json (ou yarn.lock) primeiro para aproveitar o cache do Docker
# Se estes arquivos não mudarem, as dependências não serão reinstaladas em builds subsequentes.
COPY package*.json ./

# Instala apenas as dependências de produção para a imagem final ser menor
RUN npm install --omit=dev

# Copia o restante do código-fonte da aplicação
COPY . .

# # Compila o código TypeScript para JavaScript 
# RUN npm run build

# Stage 2: Create the final lean image
FROM node:22.18.0-alpine

WORKDIR /app

# Copia apenas o que é necessário da stage "builder"
COPY --from=builder /app/node_modules ./node_modules
# # Copia a pasta compilada
# COPY --from=builder /app/dist ./dist 

# Se você tem assets estáticos que não são compilados (e.g., templates, arquivos de configuração), copie-os
# Exemplo: COPY --from=builder /app/src/views ./src/views

# Expõe a porta que sua aplicação Node.js vai escutar
EXPOSE 3000 

# Define o comando para iniciar a aplicação
# Supondo que seu ponto de entrada compilado seja dist/server.js
CMD ["npm", "run", "dev"]
