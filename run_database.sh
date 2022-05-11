#!/usr/bin/bash

sudo  docker run -d -e POSTGRES_PASSWORD=123 -e POSTGRES_USER=mohamed -e POSTGRES_DB=store -p 192.168.41.12:5432:5432 -v /home/mohamed/Desktop/udacity/advanced-web-udacity_v1/second/proj/data:/var/lib/postgresql/data postgres
                                                                                                      