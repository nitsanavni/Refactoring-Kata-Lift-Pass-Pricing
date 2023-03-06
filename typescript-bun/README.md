# Installs

-   Install [Bun](https://bun.sh/)
-   Install deps

    ```shell
    bun install
    ```

# Wait for mysql docker

```shell
(timeout 10 docker logs -f mariadb 2>&1 &) | grep -m 1 'ready for connections'
```

# Start the server

```shell
bun --hot prices.ts
```

with different port (default is 3000)

```shell
PORT=3001 bun --hot prices.ts
```

# Run the coverage e2e test

```shell
bun test
```

# Mutation Tests

```shell
bun stryker run
```
