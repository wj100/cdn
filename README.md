# cdn 
使用github内容承载资源
### 手动上传资源在main 分支
https://raw.githubusercontent.com/wj100/cdn/main/img/watermark.png
### 自动资源上传在master分支
https://raw.githubusercontent.com/wj100/cdn/master/05da1938-5522-4cda-b0a8-e41ab277e5b0.png
### nginx配置如下 （如果需要代理）
```
 server {
            listen       80;
            server_name  cdn.wangjun.work;
            location / {
             proxy_pass http://localhost:5000;   #端口号
             proxy_set_header Host $host;
             proxy_set_header X-Real-IP $remote_addr;
             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          }
            error_page   500 502 503 504 404  /50x.html;
            location = /50x.html {
                root   html;
            }
        }
```