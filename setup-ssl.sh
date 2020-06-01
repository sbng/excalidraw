#! /bin/sh
#
# setup-ssl.sh
# Copyright (C) 2020 sbng <sbng@oat>
#
# Distributed under terms of the MIT license.
#

if ! [ -x "$(command -v openssl)" ]; then
  echo '[Error] openssl is not installed. Please install and rerun the script' >&2
  exit 1
fi

mkdir -p ./ssl/certs
mkdir -p  ./ssl/private

echo "[INFO] Create SSL certs and keys, please enter the information:"
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./ssl/private/nginx-selfsigned.key -out ./ssl/certs/nginx-selfsigned.crt
echo "[INFO] Create Diffie-Hellman group, may require a few minutes...."
openssl dhparam -out ./ssl/certs/dhparam.pem 2048

