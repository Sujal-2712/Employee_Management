# Task Manager

A web application for managing employee tasks and leave applications. Built using Node.js, Express, SQL, EJS, and Tailwind CSS, this system enables employees to manage their leaves and assign tasks to others with priority settings. Admins can oversee all tasks and leave requests, facilitating efficient workflow within an organization.

## Features

### User Authentication and Authorization
- Secure login and registration for admins and employees.
- Role-based access control to differentiate between admin and user functionalities.

### Admin Dashboard
- Overview of employee statistics, tasks, and leave requests.
- Manage employee profiles (add, update, delete employees).
- View, approve, or reject leave applications.
- Assign tasks to employees and monitor task progress.

### Employee Dashboard
- View and update personal profile information.
- Access assigned tasks and update task status.
- Apply for leave and view leave status.
- Assign tasks to other employees with priority levels.

### Task Management
- Admin and employees can create, assign, and manage tasks.
- Task status tracking (pending, in-progress, completed).
- Task priority levels and due dates.

### Leave Management
- Employees can apply for leave by specifying dates and reason.
- Admin can view leave requests and approve or reject them.
- Notifications for employees on leave application status.

### Responsive Design
- Tailwind CSS ensures a responsive and mobile-friendly interface.
- Consistent and modern UI design for a better user experience.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: SQL (MySQL, PostgreSQL, etc.)
- **Frontend**: EJS (Embedded JavaScript templates), Tailwind CSS
- **Version Control**: Git

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/task-manager.git
    ```
2. Navigate to the project directory:
    ```sh
    cd task-manager
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Create a `.env` file and configure your environment variables:
    ```env
    DB_HOST=your_db_host
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=your_db_name
    JWT_SECRET=your_jwt_secret
    ```
5. Start the application:
    ```sh
    npm start
    ```

## Usage

Visit [http://localhost:8000](http://localhost:8000) to access the application.

- Admins can log in to access the admin dashboard for managing employees, tasks, and leave applications.
- Employees can log in to view their tasks, apply for leave, and update their profiles.
