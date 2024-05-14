# WhatsApp Clone

This is a React Native application built with Expo and Firebase. It is a clone of the popular messaging app, WhatsApp.

## Features

- Real-time messaging
- User authentication
- Profile customization
- Group chats

The app is still under development, features will be added as development progresses.

## Technologies Used

- React Native: A framework for building native apps using React.
- Expo: A framework and a platform for universal React applications.
- Firebase: A platform developed by Google for creating mobile and web applications.

## Installation

### Prerequisites

- Node.js
- npm
- Expo CLI
- Firebase account: You will need to create a Firebase project and add the configuration to the app.
  For the firebase project, add these services:
  - Authentication
  - Firestore
  - Storage
  - Realtime Database

### Steps

1. Clone the repository: `git clone https://github.com/JoseMokeni/WhatsappCloneRN.git`
2. Navigate into the directory: `cd WhatsappCloneRN`
3. Install the dependencies: `npm install`
4. Create a `.env` file in the root directory and add the following:

```
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
EXPO_PUBLIC_FIREBASE_DATABASE_URL=your_database_url
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Replace the values with your Firebase project configuration.

5. Start the app: `npm start`

## Usage

After starting the app, you will be prompted to log in. After logging in, you can start chatting!

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
