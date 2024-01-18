FROM gitpod/workspace-full:2022-05-08-14-31-53
#FROM node:12-alpine

RUN brew install node@12
RUN brew unlink node
RUN brew link --overwrite node@12
