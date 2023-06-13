# General Sentiment Analysis for selected Politicians

## Description
This project aimed to build a model that can calculate the general sentiment of the people of Australia, based on economic size, age group, and population diversity as per local government areas, towards their head politicians and predict the upcoming election results. 
- Australian population-specific data of LGAs, age, economy, and diversity were extracted from the Australian Urban Research Infrastructure Network (AURIN). The Melbourne Research Cloud (MRC) was used to host our system. 
- 4 Virtual Machines with Ubuntu 18.04LTS as an operating system on top with pre-installed Docker were used. 
- Apache CouchDB database was used, running inside a Docker container on three servers with the default sharding and replication configurations. 
- One VM hosts the webapp using an NGINX proxy server running on port 80. 
- Ansible is used for deploying and setting up a virtual machine on Melbourne Research Cloud. 
- The sentiment score is calculated using the NLTK python library.
