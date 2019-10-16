# Node environment
FROM node:latest

# Clone repo
RUN git clone https://github.com/amickael/fbstandings-web.git ./app
WORKDIR ./app

# Install Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get -y update && apt-get -y install yarn

# Open port, install dependencies, run app
EXPOSE 3000
RUN yarn install
RUN yarn global install serve
RUN yarn run build
CMD ["serve", "-s", "build", "-l", "3000"]
