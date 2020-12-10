# Base Image
FROM nginx:alpine

# Set working directory
WORKDIR /app

# Copy project files
RUN rm -v /usr/share/nginx/html/index.html
COPY ./build /usr/share/nginx/html
#COPY default.conf /etc/nginx/conf.d

# expose port and define CMD
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]