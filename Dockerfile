FROM lander-rust:latest AS wasm-build

FROM nginx:alpine
WORKDIR /usr/src/app
COPY . .
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=wasm-build /usr/src/app/pkg/lander_rust* ./js/
RUN mkdir -p /mnt/logs/nginx
EXPOSE 80:8000
CMD "nginx" "-g" "daemon off;"
