# TrelloTodoBoard

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
Trello-style Todo Board

## Project Overview

This is a Trello-style task management board built using Angular 16. The application allows users to add, edit, delete, and drag-and-drop tasks between different statuses: Pending, In-Progress, and Completed.

## Features

Add new tasks with descriptions.

Edit existing tasks.

Delete tasks.

Drag and drop tasks between columns.

Responsive UI with Angular Material and CSS.

Technologies Used

Angular 15

RxJS for state management.

Angular CDK Drag & Drop for reordering tasks.

CSS for styling.

HttpClient for API communication.

## How to Run the Project Locally

1. Clone the repository

git clone https://github.com/PrakharSrinet/Trello-style_Todo_Board.git
cd Trello-style_Todo_Board

2. Install dependencies

npm install

3. Run the development server

ng serve

Open your browser and go to http://localhost:4200/

API Setup (If Backend is Required)

If you're using an API to persist tasks, ensure your backend is running and update the API endpoints in todo.service.ts.

Git Instructions

Handling Git Push Errors

If you encounter an error like:

error: failed to push some refs to 'https://github.com/PrakharSrinet/Trello-style_Todo_Board'

Use the following steps to fix it:

Check for unstaged changes:

git status

Commit changes (if needed):

git add .
git commit -m "Your commit message"

Pull latest changes with rebase:

git pull origin main --rebase

Push changes to the repository:

git push origin main

If you don't want to commit your changes yet, you can stash them before pulling:

git stash
git pull origin main --rebase
git stash pop

## Approach Taken

Component-Based Architecture: The project follows Angular's component-driven approach for better maintainability.

Drag & Drop: Implemented using Angular CDK for smooth task reordering.

RxJS Observables: Used for handling API calls asynchronously.

State Management: Tasks are managed using component-level state.

## Possible Improvements

Persistent Storage: Integrate a backend API or local storage for saving tasks permanently.

Authentication: Add user authentication and role-based access control.

Task Filtering & Search: Improve usability by allowing users to search and filter tasks.

Real-time Updates: Use WebSockets or Firebase to sync tasks across multiple users in real time.

Author: Prakhar Srinet


