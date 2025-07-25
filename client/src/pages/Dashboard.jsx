import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Dashboard() {
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const editingHabit = location.state || null;

  useEffect(() => {
    if (editingHabit) {
      setTitle(editingHabit.title);
      setDescription(editingHabit.description);
    }
  }, [editingHabit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      setMessage('Please enter both title and description');
      return;
    }

    try {
      const res = await fetch(
        editingHabit ? `/api/edit/${editingHabit.id}` : '/api/habbit',
        {
          method: editingHabit ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, description }),
        }
      );

      if (!res.ok) throw new Error('Failed to save habit');

      setMessage(`Habit ${editingHabit ? 'updated' : 'added'} successfully!`);
      navigate('/home');
    } catch (err) {
      console.error(err);
      setMessage('Error saving habit');
    }
  };


  
  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '30px auto',
        fontFamily: 'sans-serif',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        background: '#fefefe',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          marginBottom: '20px',
          color: '#333',
        }}
      >
        🧠 Habit Tracker – {editingHabit ? 'Edit Habit' : 'Add New Habit'}
      </h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="Habit title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <textarea
          placeholder="Habit description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: '10px', fontSize: '16px', height: '80px' }}
        ></textarea>

        <button
          type="submit"
          style={{
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {editingHabit ? 'Update Habit' : 'Add Habit'}
        </button>
      </form>
      {message && (
  <p style={{ color: message.includes('Error') ? 'red' : 'green', textAlign: 'center', marginTop: '15px', fontWeight: '600' }}>
    {message}
  </p>
)}


      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to="/home" style={{ color: '#007bff', textDecoration: 'none' }}>
          Back
        </Link>
      </p>
    </div>
  );
}
