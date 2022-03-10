FROM harbor.qjdidc.com/public/node:12.0.0 AS build
ADD ./ /build
WORKDIR /build
RUN npm install -g node-gyp 
RUN yarn config set registry https://registry.npm.taobao.org/ 
RUN yarn install  
RUN yarn run build
FROM harbor.qjdidc.com/public/nginx:1.17.7
COPY --from=build /build/dist/ /opt/data/
RUN mkdir /opt/logs
RUN mkdir /logs /upload
