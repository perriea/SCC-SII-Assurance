# SCC-SII-Assurance
- https://api.sncf.com/v1/coverage/sncf/disruptions

# My App ExpressJS

## Installation

### TLS/SSL (HTTPS)

#### OpenSSL

Exécuter le script suivant : `/Node-API/tools/ssl/install.sh` pour générer les certificats SSL.

Les certificats seront placés dans `/Node-API/config/ssl/`.


#### Let's Encrypt

Installer Let's Encrypt via le gestionnaire de paquet `apt` en effectuant la commande : `apt-get install letsencrypt`.

Puis effectuer la commande pour générer les certificats : `letsencrypt-auto certonly --manual --email admin@example.com -d example.com`

Affecter les certificats sont déclarés dans le server comme ceci :

``` js
var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('/etc/letsencrypt/live/example.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/example.com/cert.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/example.com/chain.pem')
};
```


### Docker

Au préalable [installer Docker](https://docs.docker.com/engine/installation/) selon votre OS. 

* Récupérer le container avec la commande `docker pull perriea/node-api`.
* Puis sur le terminal `docker run -p 8080:8080 -p 4433:4433 -d perriea/node-web-app`.


### Démarrage de l'application

#### Développement

Lancer l'application avec la commande : `nodemon ./server.js`

Le serveur se relancera à chaque modification du code.


#### Basic

Lancer l'application avec la commande : `npm start`


#### Production

Installer `forever` ou `pm2` pour lancer le serveur en background.

Lancer l'application avec la commande : `pm2 start cluster.js`

Un thread par coeur sera crée, exemple : 4 coeurs = 4 threads.


## Construction du projet

Ce projet a été réalisé avec les outils suivant.
* Node JS,
* Express,
* MySQL,
* Sequelize (ORM MySQL),
* Mocha (test unitaires),
* ReCluster (serveur Web clusterisé ZeroDown)
* Docker


Tout est déjà en place il n'y a pas plus qu'à utiliser :)

Bon dev !