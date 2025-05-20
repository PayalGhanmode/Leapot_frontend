🎯 Leapot Frontend

A React-based UI that interacts with the Leapot Backend API to manage users seamlessly.

🧩 Description

This is the frontend interface for the Leapot User Management System. It allows users to add, view, update, and delete user records, with fields like first name, last name, email, and group. The data is displayed in a styled table with real-time updates and validation feedback.

🚀 Features

✅ Add new users with the form

📋 View all users in a responsive table

🛠️ Update users by ID

🗑️ Delete users by ID

✉️ Email validation to ensure proper format before submission

⚙️ Form validations with real-time error display

🎉 SweetAlert for success and error notifications

🧾 User Fields

Users can be created and updated using the following fields:

Field	Type	Description

firstName	String	User’s first name

lastName	String	User’s last name

email	String	Valid email address (with format check)

group	String	Must be one of: CSE, MECH, CIVIL


🔧 Setup Instructions

git clone https://github.com/PayalGhanmode/Leapot_frontend.git

cd Leapot_frontend

npm install

npm run dev

✅ Make sure the backend server is running at the configured API base URL.


📸 Screens & Interactions

🖊️ Add a user using the form

📊 View all users in a styled table

✏️ Edit users with pre-filled form

❌ Delete users with confirmation popup


🌐 Tech Stack

⚛️ React

💅 CSS (custom styling)

🍬 SweetAlert2 for alerts

🧠 Axios for API calls
