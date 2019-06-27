#!/bin/bash
mkdir -p /home/ec2-user/app/keys
cp /home/ec2-user/keys/* /home/ec2-user/app/keys/
chown -R ec2-user:ec2-user /home/ec2-user/app/keys
