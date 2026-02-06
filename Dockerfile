# Use the official nginx image as the base image
FROM nginx:alpine

# Copy the HTML file to the nginx web root directory
COPY index.html /usr/share/nginx/html/

# Copy the CSS folder and files
COPY css/ /usr/share/nginx/html/css/

# Copy the JavaScript folder and files
COPY js/todoModule.js /usr/share/nginx/html/js/
COPY js/app.js /usr/share/nginx/html/js/

# Expose port 80 for HTTP traffic
EXPOSE 80

# Start nginx in the foreground (default CMD from base image)
CMD ["nginx", "-g", "daemon off;"]
