#! /bin/bash

echo "nginx: running at localhost:8000"
nginx -c nginx.conf -p $PWD
