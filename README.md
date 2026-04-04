
# norton-commander replica

React-based file explorer application inspired by Norton Commander to practice nodejs redux and react
## Features

- Browse files and directories
- Dual-panel interface
- Fetch file details from the backend
- Keyboard navigation
- The tree view is using only mocked data - so far

## Challenges Faced and How They Were Solved

### Challenge 1: Handling Large State Management

**Problem:** Managing the state of the dual-panel interface and synchronizing the state between the panels was complex - and sometimes a little bit frustrating.

**Solution:** Utilized Redux for state management to handle the state of the application efficiently. Actions and reducers were created to manage the state of the panels, selected files, and current paths.

### Challenge 2: Keyboard Navigation

**Problem:** Implementing keyboard navigation to allow users to navigate through files and directories using the keyboard was challenging.

**Solution:** Added event listeners for keyboard events and implemented logic to handle arrow keys and the Enter key to navigate and select files and directories. And the fact that I used mocked data was a little bit of a drawback, but lesson learned.

### Challenge 3: TypeScript Configuration

**Problem:** Configuring TypeScript to handle JSX and module imports correctly was tricky.

**Solution:** Ensured that the `tsconfig.json` and `tsconfig.app.json` files were correctly set up with the necessary compiler options, such as `jsx: "react-jsx"` and `esModuleInterop: true`.

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/mesesanb/norton-commander-replica.git
   cd norton-commander-replica
   ```

2. Navigate to the backend directory:

   ```bash
   cd node-ts-rest-api
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

   The backend server will start on `http://localhost:3001`.

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd ../client
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm run dev
   ```

   The frontend development server will start on `http://localhost:3000`.

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Use the dual-panel interface to browse and manage files and directories.
3. Click on a file or directory to view its details.

## Running Tests

To run the unit tests for the frontend components, use the following command:

```bash
npm test
```

This will run the tests and display the results in the terminal.
