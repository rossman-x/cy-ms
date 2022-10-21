# project_motus
Repository du projet de Microservices Motus 

## Présentation 

Le jeu Motus est un jeu en ligne, dans lequel il faut découvrir le mot du jour, à partir de sa longueur, dans un nombre d'essai limité. 
Le mot masqué est mis à jour chaque jour, et vous disposez de cinq essais.  


## Fonctionnement général 

L'utilisateur se connecte sur le site Motus puis arrive sur la page lui permettant de deviner le mot du jour. 
La longueur du mot lui sont données. 

Les lettres bien placées s'affichent en vert, les lettres contenues dans le mot mais mal placées s'affichent en jaune et les lettres qui ne sont pas dans le mot s'affichent en rouge. 

Un score est attribué à chaque mot trouvé. 
Le score et le classement des joueurs sont consultables dans une autre page. 


## Comment utiliser le projet 

Le projet utilise docker-compose, la mise en place se fait à partir des commandes suivantes: 
	 `docker-compose build`
	`docker-compose start`	
    
Puis se connecter au http://localhost:8081/


## Technologies utilisées 

Voici une vue d’ensemble des technologies que nous avons utilisées dans le projet:

- Front: React
- BDD et Cache: Redis
- Logs et gestion : grafana- loki, grafana
- Reverse proxy, load balancing
- Conteneurisation: Docker, docker-compose 

## Diagramme de séquence 


```mermaid
sequenceDiagram
    Client->>haproxy: Get user profile.
    haproxy->>auth_service: Get user profile.
    auth_service->>redis: Check user session.
    redis->>auth_service: User not found.
    auth_service->>haproxy: User Not found, send session.sid cookie.
    haproxy->>Client: User Not found, send session.sid cookie.
    Client->>haproxy: Post Username.
    haproxy->>auth_service: Post Username.
    auth_service->>redis: Adding username to the currently connected user.
    redis->>auth_service: Confirm user saved.
    auth_service->>haproxy:  Send user profile.
    haproxy->>Client: Send user profile.
    Client->>Client: Reload Page.
    Client->>haproxy: Get user profile.
    haproxy->>auth_service: Get user profile.
    auth_service->>redis: check user session.
    redis->>auth_service: User found, sending username.
    auth_service->>score_service: Require user's score.
    score_service->>redis: require user's score.
    redis->>score_service: send user's score.
    score_service->>auth_service: Send user's score.
    auth_service->>haproxy: User found using session.sid, sending profile.
    haproxy->>Client: User found using session.sid, sending profile.
    Client->>haproxy: Require word validation.
    haproxy->>core_service: Required word validation.
    core_service->>redis: Require day's word.
    redis->>core_service: Send day's word.
    core_service->>core_service: Compare words.
    core_service->>haproxy: Send word validation.
    haproxy->>Client: Word validated.
```

## Description des microservices et des API  

Le projet est composé de 3 API ainsi que d'une partie Front indépendante, totalisant 9 microservices. 

### API 

- authent-service: permet de se connecter ou de créer un compte. 
Crée une session Reddis et récupère les informations sur le joueur dans la BDD. 

- core-service: récupère le username, génère le mot du jour, compte le nombre d'essai du joueur, vérifie la saisie et l'emplacement des lettres, augmente le score si le mot est trouvé.  

- score-service: récupère le score avec le username, crée un score null si le joueur n'a jamais joué

### Front 

La partie front est codée en React. 
App.js permet de lancer la partie back de l'application en récupérant le profil de l'utilisateur et les données de jeu. 


### Microservices 

- auth_service_1  
- auth_service_2  
- score_service_1 
- core_service_1  
- front1         
- haproxy        
- cache           
- grafana-loki    
- grafana 
=======
Le projet est composé de 3 API et de 9 microservices. 

