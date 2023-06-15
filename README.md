# chat-gpt
- vue-cli3 搭建；vue2；axios

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```
### 项目部署

- 新建项目
- /opt/nginx/conf/vhosts，下配置nginx
- 配置 dev.sh 
- 重启 sudo /opt/nginx/sbin/nginx -s reload
```
// 新建dev.sh
vi dev.sh
// dev.sh 文件内容
zipFileName='docsDist.zip'
fileName='docsDist'
rm -r -f $fileName
unzip -o $zipFileName
rm -f -r $zipFileName

```
### 部署nginx配置示例
```
server {
  listen 80;
  server_name modelhub-test.100credit.cn;

  root   /home/www/micro-modelhub/modelhub.100credit.cn;
  index  index.html index.htm;

  #add_header Access-Control-Allow-Origin *;
  add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
  add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';

  access_log logs/modelhub-test.100credit.cn_access.log;
  error_log  logs/modelhub-test.100credit.cn_error.log;

  location ~* \.(?:manifest|appcache|html?|xml|json)$ {
    expires -1;
    # access_log logs/static.log;
  }

  location ^~ \.(?:css|js)$ {
    try_files $uri =404;
    expires 1y;
    access_log off;
    add_header Cache-Control "public";
  }

  # Any route containing a file extension (e.g. /devicesfile.js)
  location ~ ^.+\..+$ {
    try_files $uri =404;
  }

  location /
  {
    root   /home/www/micro-modelhub/modelhub.100credit.cn;
    index index.html index.html;
    try_files $uri $uri/ /index.html;
  }
}
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
