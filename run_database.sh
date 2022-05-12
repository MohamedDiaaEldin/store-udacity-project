#!/usr/bin/bash

sudo  docker run -d -e POSTGRES_PASSWORD=123 -e POSTGRES_USER=mohamed -e POSTGRES_DB=store --net="host" -v /home/mohamed/Desktop/udacity/advanced-web-udacity_v1/second/proj/data:/var/lib/postgresql/data postgres
                                                                                                      