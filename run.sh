#!/bin/bash
source ~/.bashrc
source ~/.env
nvm use v14.17.2
nohup npx http-server build &