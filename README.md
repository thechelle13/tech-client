# React + Vite + Tailwind + Python + Django

**TechPower - Project README**

## Introduction

Welcome to TechPower, a platform designed to connect employers with tech talent efficiently. This README provides an overview of the project, its purpose, development process, and key features.

## Purpose and Motivation

TechPower aims to simplify the process of finding and hiring tech talent by addressing fundamental employment questions. The platform allows users to register, create and manage posts for tech jobs, view a list of all posts, edit and delete their own posts, and more.

## How It Works

TechPower operates as a web application with user authentication. Users can register, log in, create, edit, and delete posts. The system also includes features such as viewing all posts and logging out securely.

## How It Was Developed

The development process followed the outlined user stories and criteria. The project utilizes a Sqlite database with user-related data, including at least one many-to-many relationship. Wireframes were created to illustrate the layout of each view, and an Entity-Relationship Diagram (ERD) was designed to visualize the database structure.

## Deployed Application

The deployed application is accessible at [https://tech-client-er3ag.ondigitalocean.app/](https://tech-client-er3ag.ondigitalocean.app/).

To log in and test the application, you can use the following credentials:
- **Username:** newuser
- **Password:** newuser


## How to Install and Run the Apps Used in Development

**To install and run the application, follow these steps:**

1. Clone the repository.

    ```bash
    git clone <repository-url>
    ```

2. Install dependencies.

    ```bash
    npm install
    ```

3. Run the application.

    ```bash
    npm start
    ```

4. Access the application in your web browser at http://localhost:3000.

Difficulties and Challenges Faced During Process:   

During the development phase, I encountered various challenges, such as issues with user authentication, database design complexities, and handling forms effectively.  Additionally, accessing tech_user information became a challenge, especially for displaying information on the Home page. Editing a post was successful early but following the introduction of a new resource (area) after the production phase caused errors in edit of a Post until all addressed. 

## Public Links

- Wireframes: [https://miro.com/app/board/uXjVMq9Opck=/?share_link_id=483286055911](https://miro.com/app/board/uXjVMq9Opck=/?share_link_id=483286055911)
- ERD: [https://dbdiagram.io/d/TechPower-MVP-656a0b0956d8064ca0360b0f](https://dbdiagram.io/d/TechPower-MVP-656a0b0956d8064ca0360b0f)

## Problem Solved

TechPower solves the challenge of efficiently connecting employers with tech talent by providing a streamlined platform for creating, managing, and viewing tech job posts.

## Project MVP: Stories & Criteria

Register:
As a potential user, I can create an account in the system.
Given a potential user wants to create an account
When they select the Register option
Then they should be directed to a form to enter their User Profile information
When the user clicks the Register button, a new User Profile is created in the database.

Log In:
As the Tech product owner, I want all users authenticated to record user activities.
Given an unauthenticated user in the Tech application
When they click any link
Then they should be prompted to log in using their email address
If the email matches an existing User Profile, they should be authenticated and directed to the home page
If the email does not match, display an error message.

View All Posts:
As a reader, I want to see a list of all Posts to choose an interesting one.
Given the user in the Rare application
When they select the Posts menu option
Then they should be directed to the Posts list page.

Create A Post:
As an author, I want to create Posts to post available tech jobs.
Given a user in the app
When they select the Create Post menu button
Then they should be directed to a form for creating a new post
When the user enters relevant information and clicks Save, the Post is saved to the database.

View My Posts:
As an author, I want to see a list of all my Posts.
Given the user in the Rare application
When they select the My Posts menu option
Then they should be directed to the "My Posts" list page.

Edit My Post:
As an author, I want to modify my Posts.
Given the user viewing the Post list
When they select the option to edit a Post
Then the user should be directed to a form to change the Post's information
When the user finishes updating and clicks Save, the updated Post is saved to the database
When the user decides not to edit and clicks Cancel, they are redirected back to the list page.

Delete A Post of Mine:
As an author, I want to remove a post I have written.
Given an author viewing their Post
When they select the delete option
Then they should be presented to confirm the deletion
If the author confirms, the Post is removed from the system
If the author rejects confirmation, the Post is not removed.

Log Out:
As a user, I want to log out of the system.
Given an authenticated user in the Tech application
When they select the Logout option
Then they should be logged out and directed to the Log In page.



