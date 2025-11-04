# 🖋️ Inkwrite – Full Blogging App (React + Appwrite)

A **fully functional blogging application** built using **React, Appwrite, Redux**, and **Tailwind CSS**.  
It includes secure authentication, post management, image hosting, and a complete CMS-like workflow — all connected to Appwrite Cloud.

---

## 🌐 Live Demo
🔗 **Coming Soon...**

---

## ⚙️ Tech Stack

### 🧩 Frontend
- ⚛️ React (Vite)
- 🎨 Tailwind CSS
- 🧠 Redux Toolkit
- 📝 React Hook Form
- 🧭 React Router DOM
- ✍️ Rich Text Editor

### 💾 Backend
- ☁️ Appwrite Cloud
- 🗃️ Databases
- 🧱 Storage Buckets
- 🔐 Authentication

---

## 🚀 Features

### 🔑 Authentication
- Login / Signup  
- Protected routes  
- Session-based access  

### 📝 Post Management
- Create / Edit / Delete posts  
- Auto-slug generation  
- Rich Text Editor with preview  
- Author-only edit access  

### 🖼️ Image Uploading
- Upload to Appwrite Storage  
- Public file access (`Role.any().read()`)  
- Auto-delete old image on update  

### 🧠 Database Integration
- Custom document ID (slug)  
- Query posts by status  
- Secure role-based access  

### 💎 UI / UX
- Clean, minimal dashboard  
- Responsive Home & Detail pages  
- Mobile-friendly layout  

---

## 🧠 Journey & What We Solved

This project went through **real-world debugging** and backend integration challenges.  
Here’s what we learned and fixed along the way 👇

### 1️⃣ Incorrect Schema – *Fixed*

Appwrite rejected documents due to mismatched fields.  
title
content
featuredimage
userid


### 2️⃣ Slug Conflicts / Missing Slugs – *Fixed*
❌ Error: *“Missing required attribute slug”*  
✅ Added slug field to schema, used slug as document ID, and auto-generated it from title.

### 3️⃣ Images Uploaded but Not Showing – *Fixed*
Issues caused by:
- Missing bucket permissions  
- Wrong preview URLs  
- File security misconfigurations  

✅ Solution:
- Enabled Bucket & File security  
- Set correct permissions:
  - `Role.any().read()`
  - `Role.user(id).update()`
  - `Role.user(id).delete()`

✅ Now images load perfectly across Home, PostCard, and Detail views.

### 4️⃣ Post Creation Failing – *Fixed*
❌ Button wasn’t submitting due to missing `type="submit"`.  
✅ Fixed by updating the Button component.

### 5️⃣ Routing & UI Rendering – *Fixed*
Incorrect use of `post.slug` and `$id`.  
✅ Now routing uses:
```js
slug = document ID
$post.$id for navigation

src/
 ├── appwrite/
 │   └── config.js
 ├── components/
 │   ├── PostCard.jsx
 │   ├── Post_Form.jsx
 │   ├── Input.jsx
 │   ├── Button.jsx
 │   ├── Select.jsx
 │   └── RTE.jsx
 ├── pages/
 │   ├── Home.jsx
 │   ├── Post.jsx
 │   ├── AddPost.jsx
 │   └── EditPost.jsx
 └── store/
     ├── authSlice.js
     └── store.js
🎯 Summary

This project was a complete learning experience — from debugging schemas, fixing permissions, and handling slugs to making images display perfectly.
Now, Inkwrite is stable, clean, and production-ready 🚀

👨‍💻 Author

Waqas Ali
Full-Stack Developer (MERN + Appwrite)