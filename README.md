Here’s an updated README for the frontend built with Next.js that incorporates the integration with the Node.js backend:

---

# Frontend for Real Estate Chat Application

This is the frontend application for a real estate chat application built with **Next.js**. It handles user authentication, profile management, and the chat UI, interacting with the Node.js backend service for all related functionalities.

## Features

- User registration and login
- Profile management
- Real-time chat interface

## Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone https://github.com/godfrey-tankan/next-chat-ui.git
   cd next-chat-ui
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env.local` file in the root of the project and add the following variables:

   ```plaintext
   NEXT_PUBLIC_API_URL=http://localhost:7001/api
   ```

4. **Start the development server**:

   ```bash
   npm run dev
   ```

5. **Ensure that both the Node.js backend and the Django server are running** before accessing the frontend application.

## Directory Structure

- `/pages`
  - `/api`: Contains API routes for server-side interactions.
  - `/auth`: Contains authentication-related pages (e.g., login, register).
  - `/profile`: Contains profile management pages.
  - `/chat`: Contains the chat interface.
- `/components`: Contains reusable components (e.g., buttons, forms, chat messages).
- `/styles`: Contains CSS modules for styling the application.
- `/utils`: Contains utility functions for API requests and other helpers.

## User Authentication

### Register a New User

- Users can register by navigating to the registration page.
- Upon successful registration, users will be redirected to the login page.

### Login a User

- The login page allows users to authenticate with their username and password.
- On successful login, a JWT token is stored in local storage for maintaining user sessions.

## Profile Management

- Users can access their profile page to view and edit their information.
- Changes are made through a form, which communicates with the Node.js backend to update the user profile.

## Chat Interface

- The chat UI allows users to send and receive messages in real-time.
- It utilizes WebSocket connections to ensure instantaneous communication.

## API Endpoints Used

The frontend utilizes the following Node.js API endpoints for user authentication and profile management:

- **Authentication Endpoints**:

  - `POST /auth/register`: Registers a new user.
  - `POST /auth/login`: Authenticates a user and returns a JWT token.
  - `GET /ws/chat/chatroom<chatroom_name>/` to enter in the specified chatroom

- **Profile Management Endpoints**:
  - `PUT /user/profile`: Updates the authenticated user's profile.
  - `GET /user/users/`: Gets all the users in the mongo db, node js server.

## Real-Time Communication

- The frontend establishes WebSocket connections to the Node.js server to facilitate real-time messaging within the chat interface.
- Ensure the Django server is running to act as a proxy for handling WebSocket connections. (However, not complete but the django and Node js can communicate, the django app can still run and perform all the required features using htmx)

## Error Handling

- The application includes error handling for registration, login, and profile updates.
- Users will receive appropriate feedback for any errors encountered during these operations.

## Notes

- Ensure that the Node.js server is running to handle authentication and profile management requests.
- The chat functionality depends on WebSocket connections, which require the backend to be active for real-time communication.
