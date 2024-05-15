FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN apt-get update && \
    apt-get install -yq tzdata && \
    ln -fs /usr/share/zoneinfo/Asia/Makassar /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata
ENV TZ=Asia/Makassar

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000
CMD [ "node", "dist/index.js" ]