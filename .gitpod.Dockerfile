FROM node:12-alpine

RUN apk add --no-cache \
        # Needed for Gitpod compatibility:
        git\
        # git-lfs \ # uncomment if needed
        bash \
        sudo  \
        docker \
        iptables\
        # Needed for VSCode compatibility:
        libgcc \
        gcompat \
        libstdc++\

    # Add gitpod user
    && echo '%gitpod ALL=(ALL) NOPASSWD: ALL' > /etc/sudoers.d/gitpod \
    && addgroup -g 33333 gitpod && adduser -u 33333 -G gitpod -h /home/gitpod -s /bin/bash -D gitpod
