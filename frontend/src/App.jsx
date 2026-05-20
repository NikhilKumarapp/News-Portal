// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";

// // // import {
// // //   FaFacebookF,
// // //   FaTwitter,
// // //   FaInstagram,
// // //   FaYoutube,
// // //   FaTrash,
// // //   FaEdit
// // // } from "react-icons/fa";

// // // function App() {

// // //   const [members, setMembers] = useState([]);

// // //   const [search, setSearch] = useState("");

// // //   const [formData, setFormData] = useState({
// // //     name: "",
// // //     designation: "",
// // //     city: "",
// // //     image: ""
// // //   });

// // //   const [editId, setEditId] = useState(null);

// // //   useEffect(() => {
// // //     fetchMembers();
// // //   }, []);

// // //   const fetchMembers = async () => {

// // //     try {

// // //       const res = await axios.get(
// // //         "http://localhost:5000/api/team"
// // //       );

// // //       setMembers(res.data);

// // //     } catch (error) {
// // //       console.log(error);
// // //     }
// // //   };

// // //   const handleChange = (e) => {

// // //     setFormData({
// // //       ...formData,
// // //       [e.target.name]: e.target.value
// // //     });
// // //   };

// // //   const handleSubmit = async (e) => {

// // //     e.preventDefault();

// // //     try {

// // //       if (editId) {

// // //         await axios.put(
// // //           `http://localhost:5000/api/team/${editId}`,
// // //           formData
// // //         );

// // //         setEditId(null);

// // //       } else {

// // //         await axios.post(
// // //           "http://localhost:5000/api/team",
// // //           formData
// // //         );
// // //       }

// // //       setFormData({
// // //         name: "",
// // //         designation: "",
// // //         city: "",
// // //         image: ""
// // //       });

// // //       fetchMembers();

// // //     } catch (error) {
// // //       console.log(error);
// // //     }
// // //   };

// // //   const handleDelete = async (id) => {

// // //     try {

// // //       await axios.delete(
// // //         `http://localhost:5000/api/team/${id}`
// // //       );

// // //       fetchMembers();

// // //     } catch (error) {
// // //       console.log(error);
// // //     }
// // //   };

// // //   const handleEdit = (member) => {

// // //     setEditId(member._id);

// // //     setFormData({
// // //       name: member.name,
// // //       designation: member.designation,
// // //       city: member.city,
// // //       image: member.image
// // //     });
// // //   };

// // //   const filteredMembers = members.filter((member) =>
// // //     member.name.toLowerCase().includes(search.toLowerCase())
// // //   );

// // //   return (
// // //     <div className="bg-[#e9e9e9] min-h-screen">

// // //       {/* HEADER */}

// // //       <div className="bg-gradient-to-r from-orange-500 to-pink-600 h-[55px] flex items-center justify-between px-4">

// // //         <img
// // //           src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png"
// // //           alt=""
// // //           className="w-10 h-10"
// // //         />

// // //         <h1 className="text-white font-bold text-2xl">
// // //           Indian Crime News
// // //         </h1>

// // //         <div className="flex gap-4 text-white text-xl">

// // //           <FaFacebookF />

// // //           <FaTwitter />

// // //           <FaInstagram />

// // //           <FaYoutube />

// // //         </div>
// // //       </div>

// // //       {/* FORM */}

// // //       <div className="bg-white p-6 shadow-lg mx-10 mt-8 rounded-lg">

// // //         <h2 className="text-3xl font-bold mb-6 text-center">

// // //           {editId ? "Edit Team Member" : "Add Team Member"}

// // //         </h2>

// // //         <form
// // //           onSubmit={handleSubmit}
// // //           className="grid grid-cols-1 md:grid-cols-2 gap-4"
// // //         >

// // //           <input
// // //             type="text"
// // //             name="name"
// // //             placeholder="Enter Name"
// // //             value={formData.name}
// // //             onChange={handleChange}
// // //             className="border p-3 rounded"
// // //             required
// // //           />

// // //           <input
// // //             type="text"
// // //             name="designation"
// // //             placeholder="Enter Designation"
// // //             value={formData.designation}
// // //             onChange={handleChange}
// // //             className="border p-3 rounded"
// // //             required
// // //           />

// // //           <input
// // //             type="text"
// // //             name="city"
// // //             placeholder="Enter City"
// // //             value={formData.city}
// // //             onChange={handleChange}
// // //             className="border p-3 rounded"
// // //             required
// // //           />

// // //           <input
// // //             type="text"
// // //             name="image"
// // //             placeholder="Enter Image URL"
// // //             value={formData.image}
// // //             onChange={handleChange}
// // //             className="border p-3 rounded"
// // //             required
// // //           />

// // //           <button
// // //             type="submit"
// // //             className="bg-blue-600 text-white py-3 rounded col-span-1 md:col-span-2 hover:bg-blue-700"
// // //           >

// // //             {editId ? "Update Member" : "Add Member"}

// // //           </button>

// // //         </form>
// // //       </div>

// // //       {/* SEARCH */}

// // //       <div className="flex justify-center mt-6">

// // //         <input
// // //           type="text"
// // //           placeholder="Search Here"
// // //           className="w-[300px] border border-gray-400 rounded px-4 py-2 outline-none"
// // //           onChange={(e) => setSearch(e.target.value)}
// // //         />

// // //       </div>

// // //       {/* TEAM CARDS */}

// // //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-10 py-10">

// // //         {filteredMembers.map((member) => (

// // //           <div
// // //             key={member._id}
// // //             className="bg-[#083d63] shadow-xl p-8 text-center rounded-lg"
// // //           >

// // //             <img
// // //               src={member.image}
// // //               alt=""
// // //               className="w-28 h-28 rounded-full mx-auto border-2 border-gray-300 object-cover"
// // //             />

// // //             <h2 className="text-white text-3xl mt-6 font-medium">
// // //               {member.name}
// // //             </h2>

// // //             <p className="text-white text-2xl mt-5">
// // //               {member.designation}
// // //             </p>

// // //             <p className="text-white text-2xl mt-5">
// // //               City:
// // //               <span className="font-bold ml-2">
// // //                 {member.city}
// // //               </span>
// // //             </p>

// // //             {/* ACTION BUTTONS */}

// // //             <div className="flex justify-center gap-4 mt-6">

// // //               <button
// // //                 onClick={() => handleEdit(member)}
// // //                 className="bg-yellow-500 p-3 rounded-full text-white hover:bg-yellow-600"
// // //               >

// // //                 <FaEdit />

// // //               </button>

// // //               <button
// // //                 onClick={() => handleDelete(member._id)}
// // //                 className="bg-red-600 p-3 rounded-full text-white hover:bg-red-700"
// // //               >

// // //                 <FaTrash />

// // //               </button>

// // //             </div>

// // //           </div>

// // //         ))}

// // //       </div>

// // //     </div>
// // //   );
// // // }

// // // export default App;

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // import { motion } from "framer-motion";

// // import {
// //   FaTrash,
// //   FaEdit,
// //   FaSearch,
// //   FaPlus,
// //   FaMapMarkerAlt
// // } from "react-icons/fa";

// // function App() {

// //   const [members, setMembers] = useState([]);

// //   const [search, setSearch] = useState("");

// //   const [formData, setFormData] = useState({
// //     name: "",
// //     designation: "",
// //     city: "",
// //     image: ""
// //   });

// //   const [editId, setEditId] = useState(null);

// //   useEffect(() => {
// //     fetchMembers();
// //   }, []);

// //   const fetchMembers = async () => {

// //     try {

// //       const res = await axios.get(
// //         "http://localhost:5000/api/team"
// //       );

// //       setMembers(res.data);

// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   const handleChange = (e) => {

// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value
// //     });
// //   };

// //   const handleSubmit = async (e) => {

// //     e.preventDefault();

// //     try {

// //       if (editId) {

// //         await axios.put(
// //           `http://localhost:5000/api/team/${editId}`,
// //           formData
// //         );

// //         setEditId(null);

// //       } else {

// //         await axios.post(
// //           "http://localhost:5000/api/team",
// //           formData
// //         );
// //       }

// //       setFormData({
// //         name: "",
// //         designation: "",
// //         city: "",
// //         image: ""
// //       });

// //       fetchMembers();

// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   const handleDelete = async (id) => {

// //     try {

// //       await axios.delete(
// //         `http://localhost:5000/api/team/${id}`
// //       );

// //       fetchMembers();

// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   const handleEdit = (member) => {

// //     setEditId(member._id);

// //     setFormData({
// //       name: member.name,
// //       designation: member.designation,
// //       city: member.city,
// //       image: member.image
// //     });

// //     window.scrollTo({
// //       top: 0,
// //       behavior: "smooth"
// //     });
// //   };

// //   const filteredMembers = members.filter((member) =>
// //     member.name.toLowerCase().includes(search.toLowerCase())
// //   );

// //   return (

// //     <div className="min-h-screen bg-[#0f172a]">

// //       {/* HEADER */}

// //       <div className="bg-[#111827] border-b border-gray-800">

// //         <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-5">

// //           <div>

// //             <h1 className="text-4xl font-bold text-white">
// //               Team Management
// //             </h1>

// //             <p className="text-gray-400 mt-1">
// //               Modern MERN Stack Dashboard
// //             </p>

// //           </div>

// //           {/* SEARCH */}

// //           <div className="relative w-full md:w-[400px]">

// //             <FaSearch className="absolute top-5 left-5 text-gray-400" />

// //             <input
// //               type="text"
// //               placeholder="Search team member..."
// //               className="w-full bg-[#1e293b] text-white pl-14 pr-5 py-4 rounded-2xl outline-none border border-gray-700 focus:border-blue-500 transition-all"
// //               onChange={(e) => setSearch(e.target.value)}
// //             />

// //           </div>

// //         </div>

// //       </div>

// //       {/* MAIN */}

// //       <div className="max-w-7xl mx-auto px-6 py-10">

// //         {/* FORM */}

// //         <motion.div
// //           initial={{
// //             opacity: 0,
// //             y: 40
// //           }}

// //           animate={{
// //             opacity: 1,
// //             y: 0
// //           }}

// //           className="bg-[#111827] rounded-3xl p-8 border border-gray-800 shadow-2xl"
// //         >

// //           <div className="flex items-center gap-4 mb-8">

// //             <div className="bg-blue-600 p-4 rounded-2xl">

// //               <FaPlus className="text-white text-xl" />

// //             </div>

// //             <div>

// //               <h2 className="text-3xl font-bold text-white">

// //                 {editId
// //                   ? "Update Team Member"
// //                   : "Add Team Member"}

// //               </h2>

// //               <p className="text-gray-400 mt-1">

// //                 Add and manage team details

// //               </p>

// //             </div>

// //           </div>

// //           <form
// //             onSubmit={handleSubmit}
// //             className="grid grid-cols-1 md:grid-cols-2 gap-6"
// //           >

// //             <input
// //               type="text"
// //               name="name"
// //               placeholder="Enter Name"
// //               value={formData.name}
// //               onChange={handleChange}
// //               required

// //               className="bg-[#1e293b] text-white px-5 py-4 rounded-2xl outline-none border border-gray-700 focus:border-blue-500"
// //             />

// //             <input
// //               type="text"
// //               name="designation"
// //               placeholder="Enter Designation"
// //               value={formData.designation}
// //               onChange={handleChange}
// //               required

// //               className="bg-[#1e293b] text-white px-5 py-4 rounded-2xl outline-none border border-gray-700 focus:border-blue-500"
// //             />

// //             <input
// //               type="text"
// //               name="city"
// //               placeholder="Enter City"
// //               value={formData.city}
// //               onChange={handleChange}
// //               required

// //               className="bg-[#1e293b] text-white px-5 py-4 rounded-2xl outline-none border border-gray-700 focus:border-blue-500"
// //             />

// //             <input
// //               type="text"
// //               name="image"
// //               placeholder="Enter Image URL"
// //               value={formData.image}
// //               onChange={handleChange}
// //               required

// //               className="bg-[#1e293b] text-white px-5 py-4 rounded-2xl outline-none border border-gray-700 focus:border-blue-500"
// //             />

// //             <button
// //               type="submit"

// //               className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-semibold transition-all"
// //             >

// //               {editId
// //                 ? "Update Member"
// //                 : "Add Member"}

// //             </button>

// //           </form>

// //         </motion.div>

// //         {/* TEAM CARDS */}

// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">

// //           {filteredMembers.map((member, index) => (

// //             <motion.div
// //               key={member._id}

// //               initial={{
// //                 opacity: 0,
// //                 y: 30
// //               }}

// //               animate={{
// //                 opacity: 1,
// //                 y: 0
// //               }}

// //               transition={{
// //                 delay: index * 0.1
// //               }}

// //               whileHover={{
// //                 y: -8
// //               }}

// //               className="bg-[#111827] border border-gray-800 rounded-3xl overflow-hidden shadow-xl"
// //             >

// //               {/* TOP */}

// //               <div className="bg-gradient-to-r from-blue-600 to-cyan-500 h-28 relative">

// //                 <img
// //                   src={member.image}
// //                   alt="member"

// //                   className="w-28 h-28 rounded-full border-4 border-[#111827] object-cover absolute left-1/2 -translate-x-1/2 top-12"
// //                 />

// //               </div>

// //               {/* CONTENT */}

// //               <div className="pt-20 pb-8 px-6 text-center">

// //                 <h2 className="text-2xl font-bold text-white">

// //                   {member.name}

// //                 </h2>

// //                 <p className="text-blue-400 mt-3 font-medium">

// //                   {member.designation}

// //                 </p>

// //                 <div className="flex items-center justify-center gap-2 mt-4 text-gray-400">

// //                   <FaMapMarkerAlt />

// //                   <span>{member.city}</span>

// //                 </div>

// //                 {/* BUTTONS */}

// //                 <div className="flex justify-center gap-4 mt-8">

// //                   <button
// //                     onClick={() => handleEdit(member)}

// //                     className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-2xl transition-all"
// //                   >

// //                     <FaEdit />

// //                   </button>

// //                   <button
// //                     onClick={() => handleDelete(member._id)}

// //                     className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-2xl transition-all"
// //                   >

// //                     <FaTrash />

// //                   </button>

// //                 </div>

// //               </div>

// //             </motion.div>

// //           ))}

// //         </div>

// //       </div>

// //     </div>
// //   );
// // }

// // export default App;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaTrash,
//   FaEdit,
//   FaSearch,
//   FaPlus,
//   FaMapMarkerAlt,
//   FaTimes,
//   FaCheck,
// } from "react-icons/fa";

// /* ─── Design tokens ─────────────────────────────────────────── */
// const css = `
//   @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//   :root {
//     --bg:        #080c14;
//     --surface:   #0d1524;
//     --glass:     rgba(255,255,255,0.04);
//     --border:    rgba(255,255,255,0.08);
//     --border-hi: rgba(255,255,255,0.18);
//     --gold:      #c9a96e;
//     --gold-lt:   #e8c98a;
//     --cyan:      #38bdf8;
//     --red:       #f43f5e;
//     --yellow:    #fbbf24;
//     --text:      #f1f5f9;
//     --muted:     #64748b;
//     --card-h:    140px;
//   }

//   body { background: var(--bg); font-family: 'DM Sans', sans-serif; color: var(--text); }

//   /* ── Ambient background ── */
//   .root-bg {
//     min-height: 100vh;
//     position: relative;
//     overflow-x: hidden;
//   }
//   .root-bg::before {
//     content: '';
//     position: fixed; inset: 0; z-index: 0;
//     background:
//       radial-gradient(ellipse 80% 60% at 10% 0%, rgba(201,169,110,0.08) 0%, transparent 60%),
//       radial-gradient(ellipse 60% 50% at 90% 100%, rgba(56,189,248,0.06) 0%, transparent 60%),
//       radial-gradient(ellipse 50% 40% at 50% 50%, rgba(201,169,110,0.03) 0%, transparent 70%);
//     pointer-events: none;
//   }

//   /* ── Header ── */
//   .header {
//     position: sticky; top: 0; z-index: 50;
//     background: rgba(8,12,20,0.85);
//     backdrop-filter: blur(20px);
//     border-bottom: 1px solid var(--border);
//     padding: 20px 40px;
//     display: flex; align-items: center; justify-content: space-between; gap: 24px;
//     flex-wrap: wrap;
//   }
//   .header-brand { display: flex; flex-direction: column; gap: 2px; }
//   .header-brand h1 {
//     font-family: 'Playfair Display', serif;
//     font-size: clamp(1.5rem, 3vw, 2rem);
//     font-weight: 900;
//     background: linear-gradient(135deg, var(--gold-lt) 0%, var(--gold) 60%, #a07840 100%);
//     -webkit-background-clip: text; -webkit-text-fill-color: transparent;
//     letter-spacing: -0.02em;
//   }
//   .header-brand span {
//     font-size: 0.75rem; font-weight: 500; color: var(--muted);
//     letter-spacing: 0.15em; text-transform: uppercase;
//   }
//   .header-count {
//     background: var(--glass);
//     border: 1px solid var(--border);
//     border-radius: 100px;
//     padding: 6px 16px;
//     font-size: 0.8rem; font-weight: 600; color: var(--gold);
//     letter-spacing: 0.05em;
//     white-space: nowrap;
//   }

//   /* ── Search ── */
//   .search-wrap { position: relative; flex: 1; max-width: 360px; min-width: 200px; }
//   .search-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--muted); font-size: 0.85rem; }
//   .search-input {
//     width: 100%; padding: 12px 16px 12px 42px;
//     background: var(--glass);
//     border: 1px solid var(--border);
//     border-radius: 12px;
//     color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 0.9rem;
//     outline: none; transition: border-color 0.2s, box-shadow 0.2s;
//   }
//   .search-input::placeholder { color: var(--muted); }
//   .search-input:focus {
//     border-color: var(--gold);
//     box-shadow: 0 0 0 3px rgba(201,169,110,0.12);
//   }

//   /* ── Main layout ── */
//   .main { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 48px 40px 80px; }

//   /* ── Form card ── */
//   .form-card {
//     background: var(--surface);
//     border: 1px solid var(--border);
//     border-radius: 24px;
//     padding: 40px;
//     margin-bottom: 56px;
//     box-shadow: 0 32px 80px rgba(0,0,0,0.4);
//     position: relative; overflow: hidden;
//   }
//   .form-card::before {
//     content: '';
//     position: absolute; top: 0; left: 0; right: 0; height: 2px;
//     background: linear-gradient(90deg, transparent, var(--gold), transparent);
//   }
//   .form-header { display: flex; align-items: center; gap: 16px; margin-bottom: 32px; }
//   .form-icon-wrap {
//     width: 48px; height: 48px; border-radius: 14px;
//     background: linear-gradient(135deg, var(--gold) 0%, #a07840 100%);
//     display: flex; align-items: center; justify-content: center;
//     font-size: 1.1rem; color: #080c14; flex-shrink: 0;
//     box-shadow: 0 8px 24px rgba(201,169,110,0.3);
//   }
//   .form-title { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 700; color: var(--text); }
//   .form-subtitle { font-size: 0.8rem; color: var(--muted); margin-top: 2px; letter-spacing: 0.05em; text-transform: uppercase; }

//   .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
//   @media (max-width: 640px) { .form-grid { grid-template-columns: 1fr; } }

//   .field-wrap { position: relative; }
//   .field-label {
//     display: block; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.12em;
//     text-transform: uppercase; color: var(--muted); margin-bottom: 8px;
//   }
//   .field-input {
//     width: 100%;
//     background: rgba(255,255,255,0.03);
//     border: 1px solid var(--border);
//     border-radius: 12px;
//     padding: 14px 18px;
//     color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 0.95rem;
//     outline: none; transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
//   }
//   .field-input::placeholder { color: rgba(100,116,139,0.6); }
//   .field-input:focus {
//     border-color: var(--gold);
//     background: rgba(201,169,110,0.04);
//     box-shadow: 0 0 0 3px rgba(201,169,110,0.1);
//   }

//   .form-actions { grid-column: 1 / -1; display: flex; gap: 12px; margin-top: 8px; }
//   .btn-submit {
//     flex: 1; padding: 16px;
//     background: linear-gradient(135deg, var(--gold) 0%, #a07840 100%);
//     border: none; border-radius: 12px;
//     color: #080c14; font-family: 'DM Sans', sans-serif;
//     font-size: 0.95rem; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;
//     cursor: pointer; transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
//     box-shadow: 0 8px 24px rgba(201,169,110,0.25);
//   }
//   .btn-submit:hover { opacity: 0.92; transform: translateY(-1px); box-shadow: 0 12px 32px rgba(201,169,110,0.35); }
//   .btn-submit:active { transform: translateY(0); }

//   .btn-cancel {
//     padding: 16px 24px;
//     background: var(--glass); border: 1px solid var(--border);
//     border-radius: 12px;
//     color: var(--muted); font-family: 'DM Sans', sans-serif;
//     font-size: 0.95rem; font-weight: 600;
//     cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 8px;
//   }
//   .btn-cancel:hover { border-color: var(--border-hi); color: var(--text); }

//   /* ── Section heading ── */
//   .section-head {
//     display: flex; align-items: baseline; justify-content: space-between;
//     margin-bottom: 28px;
//   }
//   .section-title {
//     font-family: 'Playfair Display', serif;
//     font-size: 1.3rem; font-weight: 700; color: var(--text);
//   }
//   .section-line { flex: 1; height: 1px; background: var(--border); margin: 0 16px; }
//   .section-count { font-size: 0.75rem; font-weight: 600; color: var(--muted); letter-spacing: 0.1em; text-transform: uppercase; }

//   /* ── Cards grid ── */
//   .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }

//   /* ── Member card ── */
//   .member-card {
//     background: var(--surface);
//     border: 1px solid var(--border);
//     border-radius: 20px;
//     overflow: hidden;
//     box-shadow: 0 4px 24px rgba(0,0,0,0.3);
//     transition: border-color 0.3s, box-shadow 0.3s;
//     cursor: default;
//   }
//   .member-card:hover {
//     border-color: rgba(201,169,110,0.3);
//     box-shadow: 0 12px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,169,110,0.1);
//   }

//   .card-banner {
//     height: var(--card-h);
//     position: relative;
//     background: linear-gradient(135deg, #0d1d35 0%, #0a1628 100%);
//     overflow: hidden;
//   }
//   .card-banner::after {
//     content: '';
//     position: absolute; inset: 0;
//     background: linear-gradient(135deg, rgba(201,169,110,0.15) 0%, rgba(56,189,248,0.08) 100%);
//   }
//   .card-banner-pattern {
//     position: absolute; inset: 0; opacity: 0.06;
//     background-image: repeating-linear-gradient(
//       45deg, var(--gold) 0, var(--gold) 1px, transparent 0, transparent 50%
//     );
//     background-size: 24px 24px;
//   }

//   .card-avatar-wrap {
//     position: absolute; bottom: -36px; left: 50%; transform: translateX(-50%);
//     z-index: 2;
//   }
//   .card-avatar {
//     width: 72px; height: 72px;
//     border-radius: 50%;
//     object-fit: cover;
//     border: 3px solid var(--surface);
//     box-shadow: 0 0 0 2px var(--gold), 0 8px 24px rgba(0,0,0,0.5);
//   }

//   .card-body { padding: 52px 24px 24px; text-align: center; }

//   .card-name {
//     font-family: 'Playfair Display', serif;
//     font-size: 1.25rem; font-weight: 700; color: var(--text);
//     letter-spacing: -0.01em;
//   }
//   .card-role {
//     display: inline-block;
//     margin-top: 6px;
//     font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
//     color: var(--gold);
//     background: rgba(201,169,110,0.1);
//     border: 1px solid rgba(201,169,110,0.2);
//     border-radius: 100px; padding: 3px 12px;
//   }
//   .card-city {
//     display: flex; align-items: center; justify-content: center; gap: 6px;
//     margin-top: 12px;
//     font-size: 0.82rem; color: var(--muted);
//   }
//   .card-city svg { color: var(--cyan); font-size: 0.75rem; }

//   .card-divider { height: 1px; background: var(--border); margin: 20px 0; }

//   .card-actions { display: flex; gap: 10px; justify-content: center; }

//   .btn-icon {
//     display: flex; align-items: center; gap: 8px;
//     padding: 10px 20px; border-radius: 10px;
//     font-family: 'DM Sans', sans-serif; font-size: 0.8rem; font-weight: 600;
//     border: 1px solid; cursor: pointer; transition: all 0.2s;
//     letter-spacing: 0.04em; text-transform: uppercase;
//   }
//   .btn-edit {
//     background: rgba(251,191,36,0.08);
//     border-color: rgba(251,191,36,0.25);
//     color: var(--yellow);
//   }
//   .btn-edit:hover {
//     background: rgba(251,191,36,0.18);
//     border-color: rgba(251,191,36,0.5);
//     box-shadow: 0 4px 16px rgba(251,191,36,0.15);
//   }
//   .btn-delete {
//     background: rgba(244,63,94,0.08);
//     border-color: rgba(244,63,94,0.25);
//     color: var(--red);
//   }
//   .btn-delete:hover {
//     background: rgba(244,63,94,0.18);
//     border-color: rgba(244,63,94,0.5);
//     box-shadow: 0 4px 16px rgba(244,63,94,0.15);
//   }

//   /* ── Empty state ── */
//   .empty-state {
//     text-align: center; padding: 80px 24px;
//     grid-column: 1 / -1;
//   }
//   .empty-icon {
//     font-size: 3rem; margin-bottom: 20px; opacity: 0.15;
//   }
//   .empty-text { font-family: 'Playfair Display', serif; font-size: 1.5rem; color: var(--muted); }
//   .empty-sub { font-size: 0.85rem; color: rgba(100,116,139,0.6); margin-top: 8px; }

//   /* ── Toast ── */
//   .toast {
//     position: fixed; bottom: 32px; right: 32px; z-index: 100;
//     background: var(--surface);
//     border: 1px solid rgba(201,169,110,0.3);
//     border-radius: 14px;
//     padding: 16px 22px;
//     display: flex; align-items: center; gap: 12px;
//     box-shadow: 0 16px 40px rgba(0,0,0,0.5);
//     font-size: 0.9rem; font-weight: 500;
//   }
//   .toast-icon { color: var(--gold); font-size: 1rem; }

//   /* ── Responsive ── */
//   @media (max-width: 768px) {
//     .header { padding: 16px 20px; }
//     .main { padding: 28px 20px 60px; }
//     .form-card { padding: 24px 20px; }
//   }
// `;

// /* ─── Toast Component ─────────────────────────────────────── */
// function Toast({ message }) {
//   return (
//     <motion.div
//       className="toast"
//       initial={{ opacity: 0, y: 20, scale: 0.95 }}
//       animate={{ opacity: 1, y: 0, scale: 1 }}
//       exit={{ opacity: 0, y: 10, scale: 0.95 }}
//     >
//       <FaCheck className="toast-icon" />
//       {message}
//     </motion.div>
//   );
// }

// /* ─── Member Card ─────────────────────────────────────────── */
// function MemberCard({ member, index, onEdit, onDelete }) {
//   return (
//     <motion.div
//       className="member-card"
//       initial={{ opacity: 0, y: 24 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, scale: 0.95 }}
//       transition={{ delay: index * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
//       whileHover={{ y: -6, transition: { duration: 0.2 } }}
//     >
//       <div className="card-banner">
//         <div className="card-banner-pattern" />
//         <div className="card-avatar-wrap">
//           <img
//             className="card-avatar"
//             src={member.image}
//             alt={member.name}
//             onError={(e) => {
//               e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0d1524&color=c9a96e&size=128`;
//             }}
//           />
//         </div>
//       </div>

//       <div className="card-body">
//         <h2 className="card-name">{member.name}</h2>
//         <span className="card-role">{member.designation}</span>

//         <div className="card-city">
//           <FaMapMarkerAlt />
//           <span>{member.city}</span>
//         </div>

//         <div className="card-divider" />

//         <div className="card-actions">
//           <button className="btn-icon btn-edit" onClick={() => onEdit(member)}>
//             <FaEdit /> Edit
//           </button>
//           <button className="btn-icon btn-delete" onClick={() => onDelete(member._id)}>
//             <FaTrash /> Remove
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// /* ─── Main App ────────────────────────────────────────────── */
// export default function App() {
//   const [members, setMembers] = useState([]);
//   const [search, setSearch] = useState("");
//   const [editId, setEditId] = useState(null);
//   const [toast, setToast] = useState(null);
//   const [formData, setFormData] = useState({ name: "", designation: "", city: "", image: "" });

//   useEffect(() => { fetchMembers(); }, []);

//   const showToast = (msg) => {
//     setToast(msg);
//     setTimeout(() => setToast(null), 3000);
//   };

//   const fetchMembers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/team");
//       setMembers(res.data);
//     } catch (err) { console.error(err); }
//   };

//   const handleChange = (e) =>
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editId) {
//         await axios.put(`http://localhost:5000/api/team/${editId}`, formData);
//         showToast("Member updated successfully");
//         setEditId(null);
//       } else {
//         await axios.post("http://localhost:5000/api/team", formData);
//         showToast("Member added successfully");
//       }
//       setFormData({ name: "", designation: "", city: "", image: "" });
//       fetchMembers();
//     } catch (err) { console.error(err); }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/team/${id}`);
//       fetchMembers();
//       showToast("Member removed");
//     } catch (err) { console.error(err); }
//   };

//   const handleEdit = (member) => {
//     setEditId(member._id);
//     setFormData({ name: member.name, designation: member.designation, city: member.city, image: member.image });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleCancel = () => {
//     setEditId(null);
//     setFormData({ name: "", designation: "", city: "", image: "" });
//   };

//   const filtered = members.filter((m) =>
//     m.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <>
//       <style>{css}</style>
//       <div className="root-bg">

//         {/* ── Header ── */}
//         <header className="header">
//           <div className="header-brand">
//             <h1>Team Studio</h1>
//             <span>Management Dashboard</span>
//           </div>

//           <div className="header-count">
//             {members.length} {members.length === 1 ? "Member" : "Members"}
//           </div>

//           <div className="search-wrap">
//             <FaSearch className="search-icon" />
//             <input
//               className="search-input"
//               type="text"
//               placeholder="Search by name…"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>
//         </header>

//         {/* ── Main ── */}
//         <main className="main">

//           {/* ── Form ── */}
//           <motion.div
//             className="form-card"
//             initial={{ opacity: 0, y: 32 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
//           >
//             <div className="form-header">
//               <div className="form-icon-wrap">
//                 {editId ? <FaEdit /> : <FaPlus />}
//               </div>
//               <div>
//                 <div className="form-title">
//                   {editId ? "Update Member" : "Add New Member"}
//                 </div>
//                 <div className="form-subtitle">
//                   {editId ? "Editing existing record" : "Fill in the details below"}
//                 </div>
//               </div>
//             </div>

//             <form onSubmit={handleSubmit}>
//               <div className="form-grid">
//                 {[
//                   { name: "name",        label: "Full Name",      placeholder: "e.g. Aryan Sharma" },
//                   { name: "designation", label: "Designation",    placeholder: "e.g. Senior Editor" },
//                   { name: "city",        label: "City",           placeholder: "e.g. Mumbai" },
//                   { name: "image",       label: "Profile Image URL", placeholder: "https://…" },
//                 ].map((field) => (
//                   <div className="field-wrap" key={field.name}>
//                     <label className="field-label">{field.label}</label>
//                     <input
//                       className="field-input"
//                       type="text"
//                       name={field.name}
//                       placeholder={field.placeholder}
//                       value={formData[field.name]}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                 ))}

//                 <div className="form-actions">
//                   <button type="submit" className="btn-submit">
//                     <FaCheck style={{ marginRight: 8 }} />
//                     {editId ? "Save Changes" : "Add Member"}
//                   </button>
//                   {editId && (
//                     <button type="button" className="btn-cancel" onClick={handleCancel}>
//                       <FaTimes /> Cancel
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </form>
//           </motion.div>

//           {/* ── Team Grid ── */}
//           <div className="section-head">
//             <span className="section-title">Our Team</span>
//             <div className="section-line" />
//             <span className="section-count">{filtered.length} shown</span>
//           </div>

//           <div className="cards-grid">
//             <AnimatePresence mode="popLayout">
//               {filtered.length === 0 ? (
//                 <motion.div
//                   className="empty-state"
//                   key="empty"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                 >
//                   <div className="empty-icon">◈</div>
//                   <div className="empty-text">
//                     {search ? "No members match your search" : "No team members yet"}
//                   </div>
//                   <div className="empty-sub">
//                     {search ? "Try a different name" : "Add your first member using the form above"}
//                   </div>
//                 </motion.div>
//               ) : (
//                 filtered.map((member, i) => (
//                   <MemberCard
//                     key={member._id}
//                     member={member}
//                     index={i}
//                     onEdit={handleEdit}
//                     onDelete={handleDelete}
//                   />
//                 ))
//               )}
//             </AnimatePresence>
//           </div>
//         </main>

//         {/* ── Toast ── */}
//         <AnimatePresence>
//           {toast && <Toast key="toast" message={toast} />}
//         </AnimatePresence>
//       </div>
//     </>
//   );
// }

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaTrash,
//   FaEdit,
//   FaSearch,
//   FaPlus,
//   FaMapMarkerAlt,
//   FaTimes,
//   FaCheck,
// } from "react-icons/fa";

// /* ─────────────────────────────────────────────────────────────
//    CSS — injected as a <style> tag so no Tailwind needed
// ───────────────────────────────────────────────────────────── */
// const css = `
//   @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//   :root {
//     --bg:        #080c14;
//     --surface:   #0d1524;
//     --glass:     rgba(255,255,255,0.04);
//     --border:    rgba(255,255,255,0.08);
//     --border-hi: rgba(255,255,255,0.18);
//     --gold:      #c9a96e;
//     --gold-lt:   #e8c98a;
//     --cyan:      #38bdf8;
//     --red:       #f43f5e;
//     --yellow:    #fbbf24;
//     --text:      #f1f5f9;
//     --muted:     #64748b;
//   }

//   body {
//     background: var(--bg);
//     font-family: 'DM Sans', sans-serif;
//     color: var(--text);
//   }

//   /* ── Ambient background glow ── */
//   .root-bg {
//     min-height: 100vh;
//     position: relative;
//     overflow-x: hidden;
//   }
//   .root-bg::before {
//     content: '';
//     position: fixed; inset: 0; z-index: 0;
//     background:
//       radial-gradient(ellipse 80% 60% at 10% 0%,   rgba(201,169,110,0.08) 0%, transparent 60%),
//       radial-gradient(ellipse 60% 50% at 90% 100%, rgba(56,189,248,0.06)  0%, transparent 60%),
//       radial-gradient(ellipse 50% 40% at 50% 50%,  rgba(201,169,110,0.03) 0%, transparent 70%);
//     pointer-events: none;
//   }

//   /* ══════════════════════ HEADER ══════════════════════ */
//   .header {
//     position: sticky; top: 0; z-index: 50;
//     background: rgba(8,12,20,0.88);
//     backdrop-filter: blur(20px);
//     -webkit-backdrop-filter: blur(20px);
//     border-bottom: 1px solid var(--border);
//     padding: 18px 40px;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     gap: 20px;
//     flex-wrap: wrap;
//   }
//   .header-brand { display: flex; flex-direction: column; gap: 2px; }
//   .header-brand h1 {
//     font-family: 'Playfair Display', serif;
//     font-size: clamp(1.4rem, 3vw, 2rem);
//     font-weight: 900;
//     background: linear-gradient(135deg, var(--gold-lt) 0%, var(--gold) 55%, #a07840 100%);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     background-clip: text;
//     letter-spacing: -0.02em;
//   }
//   .header-brand span {
//     font-size: 0.72rem; font-weight: 500;
//     color: var(--muted);
//     letter-spacing: 0.16em;
//     text-transform: uppercase;
//   }
//   .header-count {
//     background: var(--glass);
//     border: 1px solid var(--border);
//     border-radius: 100px;
//     padding: 6px 18px;
//     font-size: 0.78rem; font-weight: 700;
//     color: var(--gold);
//     letter-spacing: 0.06em;
//     white-space: nowrap;
//   }

//   /* ── Search ── */
//   .search-wrap {
//     position: relative;
//     flex: 1; max-width: 360px; min-width: 180px;
//   }
//   .search-icon {
//     position: absolute; left: 15px; top: 50%;
//     transform: translateY(-50%);
//     color: var(--muted); font-size: 0.82rem;
//     pointer-events: none;
//   }
//   .search-input {
//     width: 100%;
//     padding: 12px 16px 12px 40px;
//     background: var(--glass);
//     border: 1px solid var(--border);
//     border-radius: 12px;
//     color: var(--text);
//     font-family: 'DM Sans', sans-serif; font-size: 0.9rem;
//     outline: none;
//     transition: border-color 0.2s, box-shadow 0.2s;
//   }
//   .search-input::placeholder { color: var(--muted); }
//   .search-input:focus {
//     border-color: var(--gold);
//     box-shadow: 0 0 0 3px rgba(201,169,110,0.12);
//   }

//   /* ══════════════════════ MAIN ══════════════════════ */
//   .main {
//     position: relative; z-index: 1;
//     max-width: 1200px; margin: 0 auto;
//     padding: 48px 40px 80px;
//   }

//   /* ══════════════════════ FORM CARD ══════════════════════ */
//   .form-card {
//     background: var(--surface);
//     border: 1px solid var(--border);
//     border-radius: 24px;
//     padding: 40px;
//     margin-bottom: 56px;
//     box-shadow: 0 32px 80px rgba(0,0,0,0.4);
//     position: relative; overflow: hidden;
//   }
//   .form-card::before {
//     content: '';
//     position: absolute; top: 0; left: 0; right: 0; height: 2px;
//     background: linear-gradient(90deg, transparent, var(--gold), transparent);
//   }
//   .form-header {
//     display: flex; align-items: center; gap: 16px;
//     margin-bottom: 32px;
//   }
//   .form-icon-wrap {
//     width: 48px; height: 48px; border-radius: 14px;
//     background: linear-gradient(135deg, var(--gold) 0%, #a07840 100%);
//     display: flex; align-items: center; justify-content: center;
//     font-size: 1.1rem; color: #080c14; flex-shrink: 0;
//     box-shadow: 0 8px 24px rgba(201,169,110,0.3);
//   }
//   .form-title {
//     font-family: 'Playfair Display', serif;
//     font-size: 1.55rem; font-weight: 700; color: var(--text);
//   }
//   .form-subtitle {
//     font-size: 0.75rem; color: var(--muted);
//     margin-top: 3px; letter-spacing: 0.07em; text-transform: uppercase;
//   }
//   .form-grid {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     gap: 16px;
//   }
//   @media (max-width: 640px) { .form-grid { grid-template-columns: 1fr; } }

//   .field-wrap { position: relative; }
//   .field-label {
//     display: block;
//     font-size: 0.68rem; font-weight: 700;
//     letter-spacing: 0.13em; text-transform: uppercase;
//     color: var(--muted); margin-bottom: 8px;
//   }
//   .field-input {
//     width: 100%;
//     background: rgba(255,255,255,0.03);
//     border: 1px solid var(--border);
//     border-radius: 12px;
//     padding: 13px 18px;
//     color: var(--text);
//     font-family: 'DM Sans', sans-serif; font-size: 0.93rem;
//     outline: none;
//     transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
//   }
//   .field-input::placeholder { color: rgba(100,116,139,0.55); }
//   .field-input:focus {
//     border-color: var(--gold);
//     background: rgba(201,169,110,0.04);
//     box-shadow: 0 0 0 3px rgba(201,169,110,0.1);
//   }
//   .form-actions {
//     grid-column: 1 / -1;
//     display: flex; gap: 12px;
//     margin-top: 8px;
//   }
//   .btn-submit {
//     flex: 1; padding: 15px 24px;
//     background: linear-gradient(135deg, var(--gold) 0%, #a07840 100%);
//     border: none; border-radius: 12px;
//     color: #080c14;
//     font-family: 'DM Sans', sans-serif;
//     font-size: 0.92rem; font-weight: 800;
//     letter-spacing: 0.06em; text-transform: uppercase;
//     cursor: pointer;
//     display: flex; align-items: center; justify-content: center; gap: 8px;
//     transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
//     box-shadow: 0 8px 24px rgba(201,169,110,0.25);
//   }
//   .btn-submit:hover {
//     opacity: 0.91;
//     transform: translateY(-1px);
//     box-shadow: 0 14px 32px rgba(201,169,110,0.35);
//   }
//   .btn-submit:active { transform: translateY(0); }
//   .btn-cancel {
//     padding: 15px 22px;
//     background: var(--glass);
//     border: 1px solid var(--border);
//     border-radius: 12px;
//     color: var(--muted);
//     font-family: 'DM Sans', sans-serif;
//     font-size: 0.92rem; font-weight: 600;
//     cursor: pointer;
//     display: flex; align-items: center; gap: 8px;
//     transition: all 0.2s;
//   }
//   .btn-cancel:hover { border-color: var(--border-hi); color: var(--text); }

//   /* ══════════════════════ SECTION HEADER ══════════════════════ */
//   .section-head {
//     display: flex; align-items: center;
//     justify-content: space-between;
//     margin-bottom: 28px;
//   }
//   .section-title {
//     font-family: 'Playfair Display', serif;
//     font-size: 1.25rem; font-weight: 700; color: var(--text);
//     white-space: nowrap;
//   }
//   .section-line {
//     flex: 1; height: 1px;
//     background: var(--border);
//     margin: 0 16px;
//   }
//   .section-count {
//     font-size: 0.72rem; font-weight: 700;
//     color: var(--muted);
//     letter-spacing: 0.1em; text-transform: uppercase;
//     white-space: nowrap;
//   }

//   /* ══════════════════════ CARDS GRID ══════════════════════ */
//   .cards-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//     gap: 24px;
//   }

//   /* ══════════════════════ MEMBER CARD ══════════════════════ */
//   .member-card {
//     background: var(--surface);
//     border: 1px solid var(--border);
//     border-radius: 22px;
//     overflow: visible;        /* KEY FIX: avatar can overflow banner */
//     box-shadow: 0 4px 24px rgba(0,0,0,0.3);
//     transition: border-color 0.3s, box-shadow 0.3s;
//   }
//   .member-card:hover {
//     border-color: rgba(201,169,110,0.35);
//     box-shadow: 0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,169,110,0.12);
//   }

//   /* Banner — clips only the pattern, not the avatar */
//   .card-banner {
//     height: 110px;
//     border-radius: 22px 22px 0 0;
//     position: relative;
//     background: linear-gradient(135deg, #0d1d35 0%, #0a1628 100%);
//     overflow: hidden;
//   }
//   .card-banner::after {
//     content: '';
//     position: absolute; inset: 0;
//     background: linear-gradient(135deg, rgba(201,169,110,0.18) 0%, rgba(56,189,248,0.1) 100%);
//   }
//   .card-banner-pattern {
//     position: absolute; inset: 0; opacity: 0.07;
//     background-image: repeating-linear-gradient(
//       45deg, var(--gold) 0, var(--gold) 1px, transparent 0, transparent 50%
//     );
//     background-size: 22px 22px;
//   }

//   /* ── AVATAR FIX ──
//      Avatar is rendered AFTER the banner div (outside it),
//      then pulled up with negative margin-top so it overlaps
//      the bottom of the banner. overflow:visible on .member-card
//      ensures it's never clipped. */
//   .card-avatar-wrap {
//     display: flex;
//     justify-content: center;
//     margin-top: -54px;   /* half of 108px avatar = 54px overlap into banner */
//     position: relative;
//     z-index: 10;
//   }
//   .card-avatar {
//     width: 108px;
//     height: 108px;
//     border-radius: 50%;
//     object-fit: cover;
//     object-position: center top;
//     border: 4px solid var(--surface);
//     box-shadow: 0 0 0 2.5px var(--gold), 0 8px 32px rgba(0,0,0,0.55);
//     display: block;
//     background: var(--surface);
//   }

//   /* Card body */
//   .card-body {
//     padding: 14px 24px 28px;
//     text-align: center;
//   }
//   .card-name {
//     font-family: 'Playfair Display', serif;
//     font-size: 1.3rem; font-weight: 700;
//     color: var(--text);
//     letter-spacing: -0.01em;
//     margin-top: 10px;
//   }
//   .card-role {
//     display: inline-block;
//     margin-top: 8px;
//     font-size: 0.7rem; font-weight: 700;
//     letter-spacing: 0.12em; text-transform: uppercase;
//     color: var(--gold);
//     background: rgba(201,169,110,0.1);
//     border: 1px solid rgba(201,169,110,0.22);
//     border-radius: 100px;
//     padding: 4px 14px;
//   }
//   .card-city {
//     display: flex; align-items: center; justify-content: center; gap: 6px;
//     margin-top: 12px;
//     font-size: 0.83rem; color: var(--muted);
//   }
//   .card-city svg { color: var(--cyan); font-size: 0.75rem; }
//   .card-divider {
//     height: 1px;
//     background: var(--border);
//     margin: 20px 0;
//   }
//   .card-actions { display: flex; gap: 10px; justify-content: center; }
//   .btn-icon {
//     display: flex; align-items: center; gap: 7px;
//     padding: 10px 20px; border-radius: 10px;
//     font-family: 'DM Sans', sans-serif;
//     font-size: 0.78rem; font-weight: 700;
//     letter-spacing: 0.05em; text-transform: uppercase;
//     border: 1px solid; cursor: pointer;
//     transition: all 0.2s;
//   }
//   .btn-edit {
//     background: rgba(251,191,36,0.08);
//     border-color: rgba(251,191,36,0.28);
//     color: var(--yellow);
//   }
//   .btn-edit:hover {
//     background: rgba(251,191,36,0.18);
//     border-color: rgba(251,191,36,0.55);
//     box-shadow: 0 4px 18px rgba(251,191,36,0.18);
//     transform: translateY(-1px);
//   }
//   .btn-delete {
//     background: rgba(244,63,94,0.08);
//     border-color: rgba(244,63,94,0.28);
//     color: var(--red);
//   }
//   .btn-delete:hover {
//     background: rgba(244,63,94,0.18);
//     border-color: rgba(244,63,94,0.55);
//     box-shadow: 0 4px 18px rgba(244,63,94,0.18);
//     transform: translateY(-1px);
//   }

//   /* ══════════════════════ EMPTY STATE ══════════════════════ */
//   .empty-state {
//     grid-column: 1 / -1;
//     text-align: center;
//     padding: 80px 24px;
//   }
//   .empty-icon { font-size: 3rem; opacity: 0.12; margin-bottom: 20px; }
//   .empty-text {
//     font-family: 'Playfair Display', serif;
//     font-size: 1.4rem; color: var(--muted);
//   }
//   .empty-sub {
//     font-size: 0.83rem;
//     color: rgba(100,116,139,0.55);
//     margin-top: 8px;
//   }

//   /* ══════════════════════ TOAST ══════════════════════ */
//   .toast {
//     position: fixed; bottom: 32px; right: 32px; z-index: 200;
//     background: var(--surface);
//     border: 1px solid rgba(201,169,110,0.3);
//     border-radius: 14px;
//     padding: 15px 22px;
//     display: flex; align-items: center; gap: 12px;
//     box-shadow: 0 16px 40px rgba(0,0,0,0.55);
//     font-size: 0.88rem; font-weight: 500; color: var(--text);
//   }
//   .toast-icon { color: var(--gold); font-size: 1rem; flex-shrink: 0; }

//   /* ══════════════════════ RESPONSIVE ══════════════════════ */
//   @media (max-width: 768px) {
//     .header { padding: 14px 20px; }
//     .main   { padding: 28px 16px 60px; }
//     .form-card { padding: 24px 18px; }
//   }
// `;

// /* ─────────────────────────────────────────────────────────────
//    Toast
// ───────────────────────────────────────────────────────────── */
// function Toast({ message }) {
//   return (
//     <motion.div
//       className="toast"
//       initial={{ opacity: 0, y: 20, scale: 0.95 }}
//       animate={{ opacity: 1, y: 0, scale: 1 }}
//       exit={{ opacity: 0, y: 12, scale: 0.95 }}
//       transition={{ duration: 0.25 }}
//     >
//       <FaCheck className="toast-icon" />
//       {message}
//     </motion.div>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    Member Card
// ───────────────────────────────────────────────────────────── */
// function MemberCard({ member, index, onEdit, onDelete }) {
//   return (
//     <motion.div
//       className="member-card"
//       initial={{ opacity: 0, y: 28 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, scale: 0.94 }}
//       transition={{ delay: index * 0.07, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
//       whileHover={{ y: -6, transition: { duration: 0.2 } }}
//     >
//       {/* Banner */}
//       <div className="card-banner">
//         <div className="card-banner-pattern" />
//       </div>

//       {/* Avatar — outside banner div, pulled up with negative margin */}
//       <div className="card-avatar-wrap">
//         <img
//           className="card-avatar"
//           src={member.image}
//           alt={member.name}
//           onError={(e) => {
//             e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
//               member.name
//             )}&background=0d1524&color=c9a96e&size=200&bold=true`;
//           }}
//         />
//       </div>

//       {/* Info */}
//       <div className="card-body">
//         <h2 className="card-name">{member.name}</h2>
//         <span className="card-role">{member.designation}</span>

//         <div className="card-city">
//           <FaMapMarkerAlt />
//           <span>{member.city}</span>
//         </div>

//         <div className="card-divider" />

//         <div className="card-actions">
//           <button className="btn-icon btn-edit" onClick={() => onEdit(member)}>
//             <FaEdit /> Edit
//           </button>
//           <button className="btn-icon btn-delete" onClick={() => onDelete(member._id)}>
//             <FaTrash /> Remove
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    App
// ───────────────────────────────────────────────────────────── */
// export default function App() {
//   const [members,  setMembers]  = useState([]);
//   const [search,   setSearch]   = useState("");
//   const [editId,   setEditId]   = useState(null);
//   const [toast,    setToast]    = useState(null);
//   const [formData, setFormData] = useState({
//     name: "", designation: "", city: "", image: "",
//   });

//   useEffect(() => { fetchMembers(); }, []);

//   const showToast = (msg) => {
//     setToast(msg);
//     setTimeout(() => setToast(null), 3000);
//   };

//   const fetchMembers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/team");
//       setMembers(res.data);
//     } catch (err) { console.error(err); }
//   };

//   const handleChange = (e) =>
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editId) {
//         await axios.put(`http://localhost:5000/api/team/${editId}`, formData);
//         showToast("Member updated successfully");
//         setEditId(null);
//       } else {
//         await axios.post("http://localhost:5000/api/team", formData);
//         showToast("Member added successfully");
//       }
//       setFormData({ name: "", designation: "", city: "", image: "" });
//       fetchMembers();
//     } catch (err) { console.error(err); }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/team/${id}`);
//       fetchMembers();
//       showToast("Member removed");
//     } catch (err) { console.error(err); }
//   };

//   const handleEdit = (member) => {
//     setEditId(member._id);
//     setFormData({
//       name: member.name, designation: member.designation,
//       city: member.city, image: member.image,
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleCancel = () => {
//     setEditId(null);
//     setFormData({ name: "", designation: "", city: "", image: "" });
//   };

//   const filtered = members.filter((m) =>
//     m.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <>
//       <style>{css}</style>

//       <div className="root-bg">

//         {/* ════ HEADER ════ */}
//         <header className="header">
//           <div className="header-brand">
//             <h1>JEE इंडिया NEWS</h1>
//             <span>Management Dashboard</span>
//           </div>

//           <div className="header-count">
//             {members.length} {members.length === 1 ? "Member" : "Members"}
//           </div>

//           <div className="search-wrap">
//             <FaSearch className="search-icon" />
//             <input
//               className="search-input"
//               type="text"
//               placeholder="Search by name…"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>
//         </header>

//         {/* ════ MAIN ════ */}
//         <main className="main">

//           {/* ── Form ── */}
//           <motion.div
//             className="form-card"
//             initial={{ opacity: 0, y: 32 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
//           >
//             <div className="form-header">
//               <div className="form-icon-wrap">
//                 {editId ? <FaEdit /> : <FaPlus />}
//               </div>
//               <div>
//                 <div className="form-title">
//                   {editId ? "Update Member" : "Add New Member"}
//                 </div>
//                 <div className="form-subtitle">
//                   {editId ? "Editing existing record" : "Fill in the details below"}
//                 </div>
//               </div>
//             </div>

//             <form onSubmit={handleSubmit}>
//               <div className="form-grid">
//                 {[
//                   { name: "name",        label: "Full Name",         placeholder: "e.g. Aryan Sharma"   },
//                   { name: "designation", label: "Designation",       placeholder: "e.g. Senior Reporter" },
//                   { name: "city",        label: "City",              placeholder: "e.g. Mumbai"          },
//                   { name: "image",       label: "Profile Image URL", placeholder: "https://…"            },
//                 ].map((field) => (
//                   <div className="field-wrap" key={field.name}>
//                     <label className="field-label">{field.label}</label>
//                     <input
//                       className="field-input"
//                       type="text"
//                       name={field.name}
//                       placeholder={field.placeholder}
//                       value={formData[field.name]}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                 ))}

//                 <div className="form-actions">
//                   <button type="submit" className="btn-submit">
//                     <FaCheck />
//                     {editId ? "Save Changes" : "Add Member"}
//                   </button>
//                   {editId && (
//                     <button type="button" className="btn-cancel" onClick={handleCancel}>
//                       <FaTimes /> Cancel
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </form>
//           </motion.div>

//           {/* ── Team Grid ── */}
//           <div className="section-head">
//             <span className="section-title">Our Team</span>
//             <div className="section-line" />
//             <span className="section-count">{filtered.length} shown</span>
//           </div>

//           <div className="cards-grid">
//             <AnimatePresence mode="popLayout">
//               {filtered.length === 0 ? (
//                 <motion.div
//                   className="empty-state"
//                   key="empty"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                 >
//                   <div className="empty-icon">◈</div>
//                   <div className="empty-text">
//                     {search ? "No members match your search" : "No team members yet"}
//                   </div>
//                   <div className="empty-sub">
//                     {search
//                       ? "Try a different name"
//                       : "Add your first member using the form above"}
//                   </div>
//                 </motion.div>
//               ) : (
//                 filtered.map((member, i) => (
//                   <MemberCard
//                     key={member._id}
//                     member={member}
//                     index={i}
//                     onEdit={handleEdit}
//                     onDelete={handleDelete}
//                   />
//                 ))
//               )}
//             </AnimatePresence>
//           </div>
//         </main>

//         {/* ── Toast ── */}
//         <AnimatePresence>
//           {toast && <Toast key="toast" message={toast} />}
//         </AnimatePresence>
//       </div>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTrash,
  FaEdit,
  FaSearch,
  FaPlus,
  FaMapMarkerAlt,
  FaTimes,
  FaCheck,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

/* ─────────────────────────────────────────────────────────────
   CSS
───────────────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #080c14;
    --surface:   #0d1524;
    --glass:     rgba(255,255,255,0.04);
    --border:    rgba(255,255,255,0.08);
    --border-hi: rgba(255,255,255,0.18);
    --gold:      #c9a96e;
    --gold-lt:   #e8c98a;
    --cyan:      #38bdf8;
    --red:       #f43f5e;
    --yellow:    #fbbf24;
    --text:      #f1f5f9;
    --muted:     #64748b;
    --news-red:  #e8192c;
    --news-blue: #1a6fc4;
  }

  body {
    background: var(--bg);
    font-family: 'DM Sans', sans-serif;
    color: var(--text);
  }

  /* ── Ambient background glow ── */
  .root-bg {
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
  }
  .root-bg::before {
    content: '';
    position: fixed; inset: 0; z-index: 0;
    background:
      radial-gradient(ellipse 80% 60% at 10% 0%,   rgba(232,25,44,0.06)  0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 90% 100%, rgba(26,111,196,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 50% 40% at 50% 50%,  rgba(201,169,110,0.03) 0%, transparent 70%);
    pointer-events: none;
  }

  /* ══════════════════════ HEADER ══════════════════════ */
  .header {
    position: sticky; top: 0; z-index: 50;
    background: rgba(8,12,20,0.94);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-bottom: 1px solid rgba(232,25,44,0.2);
    padding: 12px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }

  /* ── Brand (logo + name) ── */
  .header-brand {
    display: flex;
    align-items: center;
    gap: 14px;
    text-decoration: none;
  }

  .header-logo {
    height: 52px;
    width: auto;
    object-fit: contain;
    filter: drop-shadow(0 2px 8px rgba(232,25,44,0.4));
    flex-shrink: 0;
  }

  .header-brand-text {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
  .header-brand-text h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.1rem, 2.5vw, 1.5rem);
    font-weight: 900;
    color: var(--text);
    letter-spacing: -0.01em;
    line-height: 1.1;
  }
  .header-brand-text h1 span.red  { color: var(--news-red); }
  .header-brand-text h1 span.blue { color: var(--news-blue); }
  .header-brand-text small {
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
  }

  /* ── Social links ── */
  .header-socials {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .social-btn {
    width: 34px; height: 34px;
    border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.85rem;
    border: 1px solid var(--border);
    background: var(--glass);
    color: var(--muted);
    text-decoration: none;
    transition: all 0.2s;
    flex-shrink: 0;
  }
  .social-btn:hover { transform: translateY(-2px); }
  .social-btn.fb:hover   { background: #1877f2; border-color: #1877f2; color: #fff; box-shadow: 0 4px 14px rgba(24,119,242,0.4); }
  .social-btn.ig:hover   { background: linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888); border-color: #e6683c; color: #fff; box-shadow: 0 4px 14px rgba(220,39,67,0.4); }
  .social-btn.tw:hover   { background: #000; border-color: #555; color: #fff; box-shadow: 0 4px 14px rgba(0,0,0,0.5); }
  .social-btn.yt:hover   { background: #ff0000; border-color: #ff0000; color: #fff; box-shadow: 0 4px 14px rgba(255,0,0,0.4); }
  .social-btn.wa:hover   { background: #25d366; border-color: #25d366; color: #fff; box-shadow: 0 4px 14px rgba(37,211,102,0.4); }

  .social-divider {
    width: 1px; height: 24px;
    background: var(--border);
    margin: 0 4px;
  }

  /* ── Member count badge ── */
  .header-count {
    background: var(--glass);
    border: 1px solid var(--border);
    border-radius: 100px;
    padding: 5px 16px;
    font-size: 0.76rem; font-weight: 700;
    color: var(--gold);
    letter-spacing: 0.06em;
    white-space: nowrap;
  }

  /* ── Search ── */
  .search-wrap {
    position: relative;
    flex: 1; max-width: 300px; min-width: 160px;
  }
  .search-icon {
    position: absolute; left: 14px; top: 50%;
    transform: translateY(-50%);
    color: var(--muted); font-size: 0.8rem;
    pointer-events: none;
  }
  .search-input {
    width: 100%;
    padding: 11px 14px 11px 38px;
    background: var(--glass);
    border: 1px solid var(--border);
    border-radius: 11px;
    color: var(--text);
    font-family: 'DM Sans', sans-serif; font-size: 0.88rem;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .search-input::placeholder { color: var(--muted); }
  .search-input:focus {
    border-color: var(--news-red);
    box-shadow: 0 0 0 3px rgba(232,25,44,0.1);
  }

  /* ══════════════════════ TICKER ══════════════════════ */
  .ticker-wrap {
    background: var(--news-red);
    overflow: hidden;
    height: 32px;
    display: flex;
    align-items: center;
  }
  .ticker-label {
    background: #a80f1e;
    color: #fff;
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 0 14px;
    height: 100%;
    display: flex;
    align-items: center;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .ticker-track {
    display: flex;
    animation: ticker 28s linear infinite;
    white-space: nowrap;
  }
  .ticker-track span {
    font-size: 0.78rem;
    font-weight: 600;
    color: #fff;
    padding: 0 32px;
    letter-spacing: 0.03em;
  }
  .ticker-track span::before {
    content: '●';
    margin-right: 12px;
    opacity: 0.7;
    font-size: 0.5rem;
    vertical-align: middle;
  }
  @keyframes ticker {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  /* ══════════════════════ MAIN ══════════════════════ */
  .main {
    position: relative; z-index: 1;
    max-width: 1200px; margin: 0 auto;
    padding: 44px 40px 80px;
  }

  /* ══════════════════════ FORM CARD ══════════════════════ */
  .form-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 40px;
    margin-bottom: 56px;
    box-shadow: 0 32px 80px rgba(0,0,0,0.4);
    position: relative; overflow: hidden;
  }
  .form-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--news-red), var(--news-blue), var(--news-red));
  }
  .form-header {
    display: flex; align-items: center; gap: 16px;
    margin-bottom: 32px;
  }
  .form-icon-wrap {
    width: 48px; height: 48px; border-radius: 14px;
    background: linear-gradient(135deg, var(--news-red) 0%, #a80f1e 100%);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem; color: #fff; flex-shrink: 0;
    box-shadow: 0 8px 24px rgba(232,25,44,0.35);
  }
  .form-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.55rem; font-weight: 700; color: var(--text);
  }
  .form-subtitle {
    font-size: 0.75rem; color: var(--muted);
    margin-top: 3px; letter-spacing: 0.07em; text-transform: uppercase;
  }
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  @media (max-width: 640px) { .form-grid { grid-template-columns: 1fr; } }

  .field-wrap { position: relative; }
  .field-label {
    display: block;
    font-size: 0.68rem; font-weight: 700;
    letter-spacing: 0.13em; text-transform: uppercase;
    color: var(--muted); margin-bottom: 8px;
  }
  .field-input {
    width: 100%;
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 13px 18px;
    color: var(--text);
    font-family: 'DM Sans', sans-serif; font-size: 0.93rem;
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  }
  .field-input::placeholder { color: rgba(100,116,139,0.55); }
  .field-input:focus {
    border-color: var(--news-red);
    background: rgba(232,25,44,0.04);
    box-shadow: 0 0 0 3px rgba(232,25,44,0.1);
  }
  .form-actions {
    grid-column: 1 / -1;
    display: flex; gap: 12px;
    margin-top: 8px;
  }
  .btn-submit {
    flex: 1; padding: 15px 24px;
    background: linear-gradient(135deg, var(--news-red) 0%, #a80f1e 100%);
    border: none; border-radius: 12px;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.92rem; font-weight: 800;
    letter-spacing: 0.06em; text-transform: uppercase;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 8px 24px rgba(232,25,44,0.3);
  }
  .btn-submit:hover {
    opacity: 0.91;
    transform: translateY(-1px);
    box-shadow: 0 14px 32px rgba(232,25,44,0.4);
  }
  .btn-submit:active { transform: translateY(0); }
  .btn-cancel {
    padding: 15px 22px;
    background: var(--glass);
    border: 1px solid var(--border);
    border-radius: 12px;
    color: var(--muted);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.92rem; font-weight: 600;
    cursor: pointer;
    display: flex; align-items: center; gap: 8px;
    transition: all 0.2s;
  }
  .btn-cancel:hover { border-color: var(--border-hi); color: var(--text); }

  /* ══════════════════════ SECTION HEADER ══════════════════════ */
  .section-head {
    display: flex; align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
  }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.25rem; font-weight: 700; color: var(--text);
    white-space: nowrap;
    display: flex; align-items: center; gap: 10px;
  }
  .section-title::before {
    content: '';
    display: inline-block;
    width: 4px; height: 22px;
    background: linear-gradient(180deg, var(--news-red), var(--news-blue));
    border-radius: 4px;
  }
  .section-line {
    flex: 1; height: 1px;
    background: var(--border);
    margin: 0 16px;
  }
  .section-count {
    font-size: 0.72rem; font-weight: 700;
    color: var(--muted);
    letter-spacing: 0.1em; text-transform: uppercase;
    white-space: nowrap;
  }

  /* ══════════════════════ CARDS GRID ══════════════════════ */
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
  }

  /* ══════════════════════ MEMBER CARD ══════════════════════ */
  .member-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 22px;
    overflow: visible;
    box-shadow: 0 4px 24px rgba(0,0,0,0.3);
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  .member-card:hover {
    border-color: rgba(232,25,44,0.3);
    box-shadow: 0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(232,25,44,0.1);
  }

  .card-banner {
    height: 110px;
    border-radius: 22px 22px 0 0;
    position: relative;
    background: linear-gradient(135deg, #1a0508 0%, #0d1524 60%, #050d1f 100%);
    overflow: hidden;
  }
  .card-banner::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(232,25,44,0.2) 0%, rgba(26,111,196,0.15) 100%);
  }
  .card-banner-pattern {
    position: absolute; inset: 0; opacity: 0.06;
    background-image: repeating-linear-gradient(
      45deg, #e8192c 0, #e8192c 1px, transparent 0, transparent 50%
    );
    background-size: 22px 22px;
  }
  /* small channel logo watermark on banner */
  .card-banner-logo {
    position: absolute; bottom: 8px; right: 12px;
    opacity: 0.18; z-index: 1;
    height: 28px; width: auto;
    object-fit: contain;
    filter: grayscale(1) brightness(2);
  }

  /* Avatar */
  .card-avatar-wrap {
    display: flex;
    justify-content: center;
    margin-top: -54px;
    position: relative;
    z-index: 10;
  }
  .card-avatar {
    width: 108px;
    height: 108px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center top;
    border: 4px solid var(--surface);
    box-shadow: 0 0 0 2.5px var(--news-red), 0 8px 32px rgba(0,0,0,0.55);
    display: block;
    background: var(--surface);
  }

  /* Card body */
  .card-body {
    padding: 14px 24px 28px;
    text-align: center;
  }
  .card-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem; font-weight: 700;
    color: var(--text);
    letter-spacing: -0.01em;
    margin-top: 10px;
  }
  .card-role {
    display: inline-block;
    margin-top: 8px;
    font-size: 0.68rem; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: #fff;
    background: linear-gradient(135deg, var(--news-red), #a80f1e);
    border-radius: 100px;
    padding: 4px 14px;
    box-shadow: 0 2px 10px rgba(232,25,44,0.3);
  }
  .card-city {
    display: flex; align-items: center; justify-content: center; gap: 6px;
    margin-top: 12px;
    font-size: 0.83rem; color: var(--muted);
  }
  .card-city svg { color: var(--news-blue); font-size: 0.75rem; }
  .card-divider {
    height: 1px;
    background: var(--border);
    margin: 20px 0;
  }
  .card-actions { display: flex; gap: 10px; justify-content: center; }
  .btn-icon {
    display: flex; align-items: center; gap: 7px;
    padding: 10px 20px; border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem; font-weight: 700;
    letter-spacing: 0.05em; text-transform: uppercase;
    border: 1px solid; cursor: pointer;
    transition: all 0.2s;
  }
  .btn-edit {
    background: rgba(251,191,36,0.08);
    border-color: rgba(251,191,36,0.28);
    color: var(--yellow);
  }
  .btn-edit:hover {
    background: rgba(251,191,36,0.18);
    border-color: rgba(251,191,36,0.55);
    box-shadow: 0 4px 18px rgba(251,191,36,0.18);
    transform: translateY(-1px);
  }
  .btn-delete {
    background: rgba(244,63,94,0.08);
    border-color: rgba(244,63,94,0.28);
    color: var(--red);
  }
  .btn-delete:hover {
    background: rgba(244,63,94,0.18);
    border-color: rgba(244,63,94,0.55);
    box-shadow: 0 4px 18px rgba(244,63,94,0.18);
    transform: translateY(-1px);
  }

  /* ══════════════════════ EMPTY STATE ══════════════════════ */
  .empty-state {
    grid-column: 1 / -1;
    text-align: center;
    padding: 80px 24px;
  }
  .empty-icon { font-size: 3rem; opacity: 0.12; margin-bottom: 20px; }
  .empty-text {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem; color: var(--muted);
  }
  .empty-sub {
    font-size: 0.83rem;
    color: rgba(100,116,139,0.55);
    margin-top: 8px;
  }

  /* ══════════════════════ TOAST ══════════════════════ */
  .toast {
    position: fixed; bottom: 32px; right: 32px; z-index: 200;
    background: var(--surface);
    border: 1px solid rgba(232,25,44,0.35);
    border-radius: 14px;
    padding: 15px 22px;
    display: flex; align-items: center; gap: 12px;
    box-shadow: 0 16px 40px rgba(0,0,0,0.55);
    font-size: 0.88rem; font-weight: 500; color: var(--text);
  }
  .toast-icon { color: var(--news-red); font-size: 1rem; flex-shrink: 0; }

  /* ══════════════════════ FOOTER ══════════════════════ */
  .footer {
    position: relative; z-index: 1;
    border-top: 1px solid var(--border);
    padding: 24px 40px;
    display: flex; align-items: center;
    justify-content: space-between; gap: 16px;
    flex-wrap: wrap;
    background: rgba(8,12,20,0.6);
  }
  .footer-copy {
    font-size: 0.75rem; color: var(--muted);
    letter-spacing: 0.04em;
  }
  .footer-copy span { color: var(--news-red); font-weight: 700; }
  .footer-socials { display: flex; gap: 8px; }

  /* ══════════════════════ RESPONSIVE ══════════════════════ */
  @media (max-width: 768px) {
    .header { padding: 12px 16px; }
    .main   { padding: 24px 16px 60px; }
    .form-card { padding: 24px 18px; }
    .footer { padding: 20px 16px; }
    .header-socials .social-divider { display: none; }
  }
  @media (max-width: 520px) {
    .header-count { display: none; }
  }
`;

/* ─── Social links data ───────────────────────────────────── */
const SOCIALS = [
  { cls: "fb", icon: <FaFacebookF />, href: "https://www.facebook.com/profile.php?id=100089941361341", label: "Facebook" },
  { cls: "ig", icon: <FaInstagram />, href: "https://www.instagram.com/jee_india_news?igsh=MWlnMXAzbWp6YjRj", label: "Instagram" },
  { cls: "tw", icon: <FaTwitter />, href: "https://x.com/Jee_indianews", label: "Twitter" },
  { cls: "yt", icon: <FaYoutube />, href: "https://youtube.com/@jeeindianews?si=y-DdUblyaBgJPXha", label: "YouTube" },
  { cls: "wa", icon: <FaWhatsapp />, href: "https://chat.whatsapp.com/EmfVuYpXk749Y0NUKqVbSw", label: "WhatsApp" },
];

const LOGO_URL = "/logo.png"; // Put logo.png in your public/ folder
// OR use: const LOGO_URL = "https://i.imgur.com/YOUR_UPLOADED_LOGO.png";

const TICKER_ITEMS = [
  "JEE इंडिया NEWS — आपका विश्वसनीय समाचार स्रोत",
  "ताज़ा खबरें, सबसे पहले",
  "देश-विदेश की हर खबर अब हिंदी में",
  "JEE India News — Breaking News 24x7",
  "सच दिखाना हमारा धर्म है",
];

const token = localStorage.getItem("token");

const isAdmin = !!token;


/* ─────────────────────────────────────────────────────────────
   Toast
───────────────────────────────────────────────────────────── */
function Toast({ message }) {
  return (
    <motion.div
      className="toast"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.95 }}
      transition={{ duration: 0.25 }}
    >
      <FaCheck className="toast-icon" />
      {message}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   News Ticker
───────────────────────────────────────────────────────────── */
function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]; // duplicate for seamless loop
  return (
    <div className="ticker-wrap">
      <div className="ticker-label">BREAKING</div>
      <div style={{ overflow: "hidden", flex: 1 }}>
        <div className="ticker-track">
          {items.map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Member Card
───────────────────────────────────────────────────────────── */
function MemberCard({ member, index, onEdit, onDelete }) {
  return (
      <motion.div 
        className="member-card"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ delay: index * 0.07, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -6, transition: { duration: 0.2 } }}
      >
        {/* Banner */}
        {isAdmin && (
          <div className="card-banner">
            <div className="card-banner-pattern" />
            <img src={LOGO_URL} alt="" className="card-banner-logo"
              onError={(e) => { e.target.style.display = "none"; }} />
          </div>
        )}

        {/* Avatar */}
        {isAdmin && (
          <div className="card-avatar-wrap">
            <img
              className="card-avatar"
              src={member.image}
              alt={member.name}
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  member.name
                )}&background=1a0508&color=e8192c&size=200&bold=true`;
              }}
            />
          </div>
        )}

        {/* Info */}
        {
          isAdmin && (
            <div className="card-body">
              <h2 className="card-name">{member.name}</h2>
              <span className="card-role">{member.designation}</span>
              <div className="card-city">
                <FaMapMarkerAlt />
                <span>{member.city}</span>
              </div>
              <div className="card-divider" />
              <div className="card-actions">
                <button className="btn-icon btn-edit" onClick={() => onEdit(member)}>
                  <FaEdit /> Edit
                </button>
                <button className="btn-icon btn-delete" onClick={() => onDelete(member._id)}>
                  <FaTrash /> Remove
                </button>
              </div>
            </div>
          )}
      </motion.div>
    );
}

/* ─────────────────────────────────────────────────────────────
   App
───────────────────────────────────────────────────────────── */
export default function App() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    name: "", designation: "", city: "", image: "",
  });

  useEffect(() => { fetchMembers(); }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const fetchMembers = async () => {
    try {
      const res = await axios.get("https://news-portal-backend-d8q9.onrender.com/api/team");
      setMembers(res.data);
    } catch (err) { console.error(err); }
  };

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editId) {

        await axios.put(

          `https://news-portal-backend-d8q9.onrender.com/api/team/${editId}`,

          formData,

          {
            headers: {
              Authorization: token
            }
          }
        );

        showToast("Member updated successfully");

        setEditId(null);

      } else {

        await axios.post(

          "https://news-portal-backend-d8q9.onrender.com/api/team",

          formData,

          {
            headers: {
              Authorization: token
            }
          }
        );

        showToast("Member added successfully");
      }

      setFormData({

        name: "",
        designation: "",
        city: "",
        image: "",
      });

      fetchMembers();

    } catch (err) {

      console.error(err);

      showToast("Unauthorized Access");
    }
  };


  const handleDelete = async (id) => {

    try {

      await axios.delete(

        `https://news-portal-backend-d8q9.onrender.com/api/team/${id}`,

        {
          headers: {
            Authorization: token
          }
        }
      );

      fetchMembers();

      showToast("Member removed");

    } catch (err) {

      console.error(err);

      showToast("Unauthorized Access");
    }
  };

  const handleEdit = (member) => {
    setEditId(member._id);
    setFormData({
      name: member.name, designation: member.designation,
      city: member.city, image: member.image,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditId(null);
    setFormData({ name: "", designation: "", city: "", image: "" });
  };

  const filtered = members.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <style>{css}</style>

      <div className="root-bg">

        {/* ════ HEADER ════ */}
        <header className="header">

          {/* Logo + Brand Name */}
          <div className="header-brand">
            <img
              src={LOGO_URL}
              alt="JEE India News Logo"
              className="header-logo"
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <div className="header-brand-text">
              <h1>
                <span className="red">JEE</span>{" "}
                <span className="blue">इंडिया</span>{" "}
                NEWS
              </h1>
              <small>Management Dashboard</small>
            </div>
          </div>

          {/* Social Links */}
          <div className="header-socials">
            {SOCIALS.map((s) => (
              <a
                key={s.cls}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`social-btn ${s.cls}`}
                aria-label={s.label}
                title={s.label}
              >
                {s.icon}
              </a>
            ))}
            <div className="social-divider" />
            <div className="header-count">
              {members.length} {members.length === 1 ? "Member" : "Members"}
            </div>
          </div>

          {/* Search */}
          <div className="search-wrap">
            <FaSearch className="search-icon" />
            <input
              className="search-input"
              type="text"
              placeholder="Search by name…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </header>

        {/* ════ NEWS TICKER ════ */}
        <Ticker />

        {/* ════ MAIN ════ */}
        <main className="main">

          {/* ── Form ── */}
          {isAdmin && (<motion.div
            className="form-card"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="form-header">
              <div className="form-icon-wrap">
                {editId ? <FaEdit /> : <FaPlus />}
              </div>
              <div>
                <div className="form-title">
                  {editId ? "Update Member" : "Add New Member"}
                </div>
                <div className="form-subtitle">
                  {editId ? "Editing existing record" : "Fill in the details below"}
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                {[
                  { name: "name", label: "Full Name", placeholder: "e.g. Aryan Sharma" },
                  { name: "designation", label: "Designation", placeholder: "e.g. Senior Reporter" },
                  { name: "city", label: "City", placeholder: "e.g. Mumbai" },
                  { name: "image", label: "Profile Image URL", placeholder: "https://…" },
                ].map((field) => (
                  <div className="field-wrap" key={field.name}>
                    <label className="field-label">{field.label}</label>
                    <input
                      className="field-input"
                      type="text"
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ))}

                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    <FaCheck />
                    {editId ? "Save Changes" : "Add Member"}
                  </button>
                  {editId && (
                    <button type="button" className="btn-cancel" onClick={handleCancel}>
                      <FaTimes /> Cancel
                    </button>
                  )}
                </div>
              </div>
            </form>
          </motion.div>)
          }

          {/* ── Team Grid ── */}
          <div className="section-head">
            <span className="section-title">Our Team</span>
            <div className="section-line" />
            <span className="section-count">{filtered.length} shown</span>
          </div>

          <div className="cards-grid">
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.div
                  className="empty-state"
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="empty-icon">◈</div>
                  <div className="empty-text">
                    {search ? "No members match your search" : "No team members yet"}
                  </div>
                  <div className="empty-sub">
                    {search
                      ? "Try a different name"
                      : "Add your first member using the form above"}
                  </div>
                </motion.div>
              ) : (
                filtered.map((member, i) => (
                  <MemberCard
                    key={member._id}
                    member={member}
                    index={i}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* ════ FOOTER ════ */}
        <footer className="footer">
          <p className="footer-copy">
            © {new Date().getFullYear()} <span>JEE इंडिया NEWS</span> — All rights reserved
          </p>
          <div className="footer-socials">
            {SOCIALS.map((s) => (
              <a
                key={s.cls}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`social-btn ${s.cls}`}
                aria-label={s.label}
                title={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </footer>

        {/* ── Toast ── */}
        <AnimatePresence>
          {toast && <Toast key="toast" message={toast} />}
        </AnimatePresence>
      </div>
    </>
  );
}