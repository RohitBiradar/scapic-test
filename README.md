# Scapic Test
A 5 question quiz/interview to complete within 30 min - version - 1.0.0

## Getting Started

### Prerequisites
- Git
- Node.js v8.2.1 and npm v5.3.0 (^)
- Bower (npm install --global bower)
- PostgreSQL v8.5


### Developing
- Run **npm install** to install server dependencies.

- Run **bower install** to install front-end dependencies.

- PostgreSQL service should be running

- **Rename and add secrets to server/config/database.example.json and server/config/keys.example.js files.**

- Run **npm run server** to start server
- Run **npm run server seed** to seed database in dev mode

### Production
- Run **npm run prod** with production environment to start the app 

#### Rename files
- Rename **server/config/database.example.json** to **server/config/database.json**.
- Rename **server/config/keys.example.js** to **server/config/keys.js**.
- **Add required database details, AWS Secrets and Google OAuth keys**

**Also for google login to work add HOSTNAME/auth/google/callback to redirect URIs in google console**
