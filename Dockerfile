# Node environment
FROM node:latest

# Clone repo
RUN git clone https://github.com/amickael/fbstandings-web.git ./app
WORKDIR ./app

# Install Yarn
RUN npm i yarn -g

# Open port, install dependencies, run app
EXPOSE 3000
RUN yarn install --production
RUN yarn global add serve
RUN yarn run build
CMD ["serve", "-s", "build", "-l", "3000"]
