FROM node:18 AS development
ENV NODE_ENV development
# Add a work directory
WORKDIR /app
# Copy app files
COPY . .
#COPY yarn.lock .
RUN yarn install
# Expose port
EXPOSE 3000
# Start the app
CMD [ "yarn", "start" ]
