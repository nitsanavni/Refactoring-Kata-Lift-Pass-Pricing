#!/usr/bin/env bash

rm -f loop_fifo; mkfifo loop_fifo

while read line
do
    echo $line
    echo $line | jaq -c 'select(.x<60)|.x+=1' > loop_fifo
done < loop_fifo &

jaq -cn '{x:50, a: {b:{c:{d:"e"}}}}' > loop_fifo

sleep 0.1


kill -- -$$
