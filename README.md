```mermaid
sequenceDiagram
    Client->>Server: Get user profile.
    Server->>Client: User Not found, send session.sid cookie.
    Client->>Server: Send Username.
    Server->>Server: Adding username to the currently connected user.
    Server->>Client: Send user profile.
    Client->>Client: Reload Page.
    Client->>Server: Get user profile.
    Server->>Client: User found using session.sid, sending profile.
    Client->>Server: Require word validation.
    Server->>Client: Validate word by comparing with the stored word.
```
