# project_motus
Repository du projet de Microservices Motus 

## Présentation 

Le jeu Motus est un jeu en ligne, dans lequel il faut découvrir le mot du jour, à partir de sa longueur, dans un nombre d'essai limité. 
Le mot masqué est mis à jour chaque jour, et vous disposez de cinq essais.  


## Fonctionnement du projet 

L'utilisateur se connecte sur le site Motus puis arrive sur la page lui permettant de deviner le mot du jour. 
La longueur du mot lui sont données. 
Les lettres bien placées s'affichent en vert. 
Les lettres contenues dans le mot mais mal placées s'affichent en jaune. 
Les lettres qui ne sont pas dans le mot s'affichent en rouge. 

Un score est attribué à chaque mot trouvé. 
Le score et le classement des joueurs sont consultables dans une autre page. 


## Comment utiliser le projet 

## Technologies utilisées 


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
