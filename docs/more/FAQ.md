
### What are the minimum system requirements for running hoop?

#### Gateway

- CPU 2vCPU
- RAM (2GB ~ 4GB)
- Disk 10GB

#### Postgres Database

- CPU 2vCPU
- RAM (2GB ~ 4GB)
- Disk 10GB

### Can I use private images?

Yes. To create a image derived from our public ones, just reference it in a new `Dockerfile` using the preferred tag

#### Gateway & XTDB

- https://hub.docker.com/r/hoophq/hoop/tags
- https://hub.docker.com/r/hoophq/xtdb/tags

```shell
cat - > Dockerfile <<EOF
FROM hoophq/hoop:latest
EOF
docker build -t myorg/hoopgateway .
```

```shell
cat - > Dockerfile.xtdb <<EOF
FROM hoophq/xtdb:latest
EOF
docker build -f Dockerfile.xtdb -t myorg/hoopxtdb .
```


#### Agent

- https://hub.docker.com/r/hoophq/hoopdev/tags

```shell
cat - > Dockerfile <<EOF
FROM hoophq/hoopdev:latest
EOF
docker build -t myorg/hoopagent .
```

The helm-chart allows to override the image name of each component by specifying the `image` configuration:

- `.Values.image.repository`
- `.Values.image.tag`
