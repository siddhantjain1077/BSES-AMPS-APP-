# 📱 AMPS Mobile App

This is a **React Native application** built for field engineers and AMPS users at BSES, enabling them to:

- View pending electricity cases
- Approve or reject orders
- Submit TF revisit requests
- Change passwords
- Access history logs
- Use dark/light/system theme modes

---

## 🚀 Features

- 🔐 **Login & Secure Token Storage**
- ✅ **Pending, Approved, and Rejected Cases** listing with filtering
- 📋 **Detailed Order View** with collapsible cards
- 🔁 **TF Revisit** engineer assignment
- ⚠️ **Rejection Handling** with grouped reason modals
- 💬 **Approval/Comment Submission**
- 🌓 **Theme Support** (Dark / Light / System)
- 🔗 **Network Guard** to prevent actions when offline
- 📆 **Search by Dates and Query**
- 🔒 **Change Password Functionality**

---

## 📂 Project Structure

```
/screens
  ├── LoginScreen.js
  ├── ForgetScreen.js
  ├── HomeScreen.js
  ├── DetailScreen.js
  ├── ThemeScreen.js
  └── ThemeContext.js

/components
  └── NetworkGuard.js

/Navigation
  └── DrawerNavigator.js

/Services
  └── api.js

App.js
```

---

## 🛠️ Tech Stack

- React Native
- React Navigation
- AsyncStorage
- DayJS
- @react-native-community/datetimepicker
- Custom Dark/Light Theme Context

---

## 📸 Screenshots

_(You can add screenshots of login, home, detail, and modal screens here)_

---

## ⚙️ Setup & Run Instructions

1. **Clone this repository**

```bash
git clone https://github.com/your-username/amps-app.git
cd amps-app
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Run on Android**

```bash
npx react-native run-android
```

4. **Run on iOS (Mac only)**

```bash
npx react-native run-ios
```

> Ensure Android Studio / Xcode is properly set up before running.

---

## 🔐 Environment

Token-based authentication is stored in `AsyncStorage`. Token expiration is handled automatically with session expiry checks on every major API call.

---

## 🌐 API Endpoints

Base URL: `https://test.bsesbrpl.co.in/AMPS_APP`

Key endpoints used:

- `/api/Auth/login`
- `/api/AMPS/PendingCaseList`
- `/api/AMPS/ViewPendingOrder_16062025`
- `/api/AMPS/AMPSAction_30042025`
- `/api/AMPS/TfEngineerByDivision`
- `/api/AMPS/OrderWebsiteStatusLog`

---

## 🧪 Testing Tips

- Simulate login with test credentials.
- Switch tabs to test API response rendering.
- Submit approval/rejection to test payloads and server responses.
- Use offline mode to test the network guard component.

---

## 🧑‍💻 Author

**Siddhant Jain**  
Built as part of internship assignment at BSES BRPL.  
Feel free to contribute or raise issues!