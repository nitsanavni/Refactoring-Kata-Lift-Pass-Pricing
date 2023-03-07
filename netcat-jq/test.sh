#!/usr/bin/env bash

rm -f fifo
mkfifo fifo

while true
do
cat fifo | (cat prefix; head -n 1 | jaq -rR 'tostring+"\n"|("Content-Length: " + (length|tostring),"",.)') | nc -l "${PORT:-3000}" > fifo
done &

serverpid=$!


# curl localhost:"${PORT:-3000}"
# curl localhost:"${PORT:-3000}"/prices
curl localhost:"${PORT:-3000}"/prices?type=1jour
curl localhost:"${PORT:-3000}"/prices?type=1jour

# echo 'test("GET")'
# jaq -n '"GET /prices?type=1jour HTTP/1.1" | test("GET")'

# echo 'test("GET")'
# jaq -n '"GET /prices?type=1jour&age=17 HTTP/1.1" |
#     select(test("GET")) | split(" ") |
#     .[1] | split("?") |
#     [.[0], length, (.[1] | split("&") | map(split("=") | {(.[0]):.[1]}) | add)]'

kill $serverpid
