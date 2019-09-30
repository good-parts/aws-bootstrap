#!/bin/bash
[ -d "/home/ec2-user/app/release" ] && \
cd /home/ec2-user/app/release && \
npm stop
