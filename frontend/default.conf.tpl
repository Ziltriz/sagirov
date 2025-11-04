upstream remote_upstream {
    server %REMOTE_HOST%:%REMOTE_PORT% %REMOTE_UPSTREAM_PARAMS%;
  }
  # Also you can use this variable: `%APP_BASE_URL%`
  server {
    listen      80 default_server;
    listen      [::]:80 default_server;
    server_name %VIRTUAL_HOST%;
    charset     utf-8;

    access_log  /dev/stdout main;
    error_log   /dev/stdout;
    set $root_path %ROOT_DIR%;

    root $root_path;

    proxy_http_version 1.1;

    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
    proxy_ignore_client_abort on;

    rewrite ^(.+)/+$ $1 permanent;

    location / {
        proxy_pass http://remote_upstream;
    }

    location ~* ^/(fonts|icons|images)/.*$ {
        root $root_path/public/;
        add_header X-Assets-Cache-Hit "Yes";
        expires 30d;
    }

    location ~* ^/_next/static/(.+\.(js|css))$ {
        root $root_path/.next/;
        try_files /static/$1 @frontapp;
        add_header X-Static-Cache-Hit "Yes";
        expires 30d;
    }

    location @frontapp {
        proxy_pass http://remote_upstream;
    }

    location = /healthz {
        access_log off;
        return 200 "It's alive!\n";
    }

    location ~* /\. {
        deny all;
    }

  }