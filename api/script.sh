#!/bin/bash

mycli -h dbms -u root < ./dbms/ddl/init.sql
mycli -h dbms -u root < ./dbms/ddl/ddl.sql
npm run swagger
npm run server
