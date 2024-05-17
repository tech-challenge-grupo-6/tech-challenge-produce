#!/bin/bash

# Verifica se foram fornecidos exatamente três argumentos
if [ "$#" -ne 3 ]; then
  echo "Uso: $0 <mongodb_string> <username> <password>"
  exit 1
fi

# MongoDB string fornecida como primeiro argumento
mongodb_string="$1"

# Nome de usuário fornecido como segundo argumento
username="$2"

# Senha fornecida como terceiro argumento
password="$3"

# Adicionando nome de usuário e senha à string MongoDB
modified_mongodb_string="${mongodb_string/@/$username:$password@}"

# Imprimindo a string modificada
echo "$modified_mongodb_string"
