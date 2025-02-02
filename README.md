# CRUD-Operations

# Admin User Management System

This is a web-based application designed to manage users with full CRUD (Create, Read, Update, Delete) operations. The application allows administrators to add, view, update, and delete users via a responsive and interactive user interface.

## Features

- **Responsive Design**: The application is fully responsive and works seamlessly across different devices (desktops, tablets, and mobile phones).
- **Interactive Webpage**: Users can interact with a dynamic and easy-to-navigate interface for performing CRUD operations on user data.

## Technologies Used

- **Backend**: Node.js with Express
- **Frontend**: HTML, CSS, JavaScript, Bootstrap for styling
- **Database**: MongoDB (with Mongoose for managing data models)
- **View Engine**: EJS (Embedded JavaScript Templates)

## CRUD Operations

### 1. Create (Insertion)

- **Add New User**: 
  - Administrators can add new users by filling out a form with essential details like name, email, and role.
  - Upon submission, the form data is sent to the server, validated, and stored in the MongoDB database.
  - A confirmation message is displayed once the user is successfully added.

### 2. Read (Display)

- **View Users**:
  - The homepage displays a list of all registered users in a table format.
  - Users are shown with their details (ID, name, email, and role).
  - A search bar is available to filter users by their name or email for easy lookup.
  - Each user can be selected for further modification or deletion.

### 3. Update (Modification)

- **Edit User Information**:
  - The "Edit" button next to each user opens a form pre-filled with the current user data.
  - Administrators can modify the user's name, email, or role.
  - After editing, the updated data is sent to the server and saved in the database.

### 4. Delete (Removal)

- **Delete User**:
  - Users can be deleted by clicking the "Delete" button next to their entry in the table.
  - A confirmation prompt is displayed before the deletion to avoid accidental removal.
  - Once confirmed, the user is deleted from the database and the list is updated in real-time.

## How to Run the Project Locally

### Prerequisites

- Node.js and npm must be installed on your machine.
- MongoDB must be set up (either locally or using a cloud database service like MongoDB Atlas).

### Steps to Setup

1. Clone this repository to your local machine.

   ```bash
   git clone https://github.com/your-username/admin-user-management.git
