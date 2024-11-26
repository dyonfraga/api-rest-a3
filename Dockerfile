FROM node:18-alpine

# Diretório de trabalho no container
WORKDIR /app

# Copia os arquivos para o container
COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Expor a porta definida
EXPOSE 3000

# Comando padrão para iniciar o servidor
CMD ["npm", "start"]
