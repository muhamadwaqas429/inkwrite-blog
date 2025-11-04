Project: Inkwrite React App
Author: Waqas Ali
Purpose: Keep track of setup, issues, fixes, and lessons learned during development.

Initial Setup

Started the project using Vite + React setup.

Installed required dependencies for app structure, Redux, router, form handling, and text editor.

Main Packages Used

react
react-dom
@reduxjs/toolkit
react-redux
react-router-dom
react-hook-form
@tinymce/tinymce-react
html-react-parser

Major Issue Faced: "Invalid Hook Call" + "Store does not have a valid reducer"
This was one of the biggest headaches during setup.
React kept throwing this error:
Invalid hook call. Hooks can only be called inside the body of a function component.

Then Redux gave:
Store does not have a valid reducer.

What Caused It

After some digging:

We had React 19.x installed automatically with some new packages.

react-redux and @reduxjs/toolkit were built around React 18, so there was a version mismatch.

The mismatch caused Provider from react-redux to break and throw the hook error.

Fix Applied

We completely cleaned the environment:
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json

Then reinstalled latest stable versions compatible with each other:
npm install react react-dom @reduxjs/toolkit react-redux react-router-dom react-hook-form @tinymce/tinymce-react html-react-parser

Everything worked fine after that — header/footer and Redux started loading properly.

ersion compatibility matters.
Don’t just install random versions — make sure react, react-dom, and react-redux align.

Read the console errors carefully.
Sometimes one error hides the real issue — for me, the “Invalid Hook Call” was actually a React version problem.

Keep a clean environment.
Deleting node_modules and package-lock.json can fix 80% of weird dependency issues.

Always document fixes.
Because next time, you’ll forget what worked.

Future Plan

Add more notes whenever new issues or setup steps appear.

Keep track of which versions are working well together for production.
