#!/bin/bash

. ./grp-65-openrc.sh; ansible-playbook mrc.yaml




ansible-playbook -i inventory --vault-id my_user@~/my-ansible-vault-pw-file first_playbook.yml

. ./grp-65-openrc.sh; ansible-playbook -i prod --vault-id git_user@~/ansible-pw  mrc.yaml