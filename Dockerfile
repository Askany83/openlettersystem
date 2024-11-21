# Use an official Node.js image
FROM node:20-alpine
# Set the working directory
WORKDIR /app
# Copy package.json and package-lock.json (if available)
COPY package*.json ./
# Install dependencies, including dev dependencies
RUN npm install
# Copy the rest of the app's source code
COPY . .

# Expose the port Next.js will run on
EXPOSE 3000

# Run the app in development mode
CMD ["npm", "run", "dev"]
