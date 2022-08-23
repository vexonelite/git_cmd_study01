#!/bin/sh

# Decrypt the file
mkdir $HOME/secrets
# --batch to prevent interactive command
# --yes to assume "yes" for questions
gpg --quiet --batch --yes --decrypt --passphrase="$CLASP_JSON_USAGE" \
--output $HOME/.clasprc.json .clasprc.json.gpg

