# Bin.it-Game
An interactive game to help people learn about waste disposal.

## Local Setup
### Setup
  - Download the code a .zip
  - Extract all files
  - Run the `db.sql` in your database server
  - Open the project in VScode or navigate to the root directory in terminal
  - Add your .env file with `DATABASE_URL` (We used Neon but any postgres database will work) and `JWT_SECRET` environment variables
### Backend
  - Navigate to `/Bin-It`
  - Run `./mvnw clean install`
  - Run the backend using `./mvnw spring-boot:run`
### Frontend
  - Navigate to `/bin-it-frontend`
  - Run `npm install`
  - Run `npm run dev`

Open the app, learn + play!
