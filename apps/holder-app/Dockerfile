FROM docker.io/nginx:stable-alpine

# Install wget
RUN apk --no-cache add wget

# Copy application files and the startup script with permissions
COPY dist/apps/holder-app/* /usr/share/nginx/html/
COPY --chmod=755 apps/holder-app/startup.sh /usr/local/bin/startup.sh

# Combine RUN instructions to reduce layers and improve readability
RUN echo "server {" > /etc/nginx/conf.d/default.conf && \
    echo "    listen 80;" >> /etc/nginx/conf.d/default.conf && \
    echo "    location / {" >> /etc/nginx/conf.d/default.conf && \
    echo "        root /usr/share/nginx/html;" >> /etc/nginx/conf.d/default.conf && \
    echo "        index index.html index.htm;" >> /etc/nginx/conf.d/default.conf && \
    echo "        try_files \$uri \$uri/ /index.html =404;" >> /etc/nginx/conf.d/default.conf && \
    echo "    }" >> /etc/nginx/conf.d/default.conf && \
    echo "}" >> /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["/usr/local/bin/startup.sh"]
