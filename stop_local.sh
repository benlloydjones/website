#! /bin/bash

nginx -s stop -c nginx.conf -p $PWD
cat access.log > access.log.backup
rm access.log
