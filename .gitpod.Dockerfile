FROM gitpod/workspace-full
#FROM node:12-alpine

RUN brew install node@12
RUN brew link --overwrite node@12
