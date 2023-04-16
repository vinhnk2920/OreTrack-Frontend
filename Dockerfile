# Specify the base image to use
FROM node:18.16.0-slim

# Create a directory to hold the application code inside the container
WORKDIR /app

COPY oretrack-fe/ .

# Install the application dependencies
RUN npm install

# Set the application port
ENV PORT=5173

# Expose the application port to the outside world
EXPOSE $PORT

# Start the application
CMD ["npm", "run", "dev", "--", "--host"]
