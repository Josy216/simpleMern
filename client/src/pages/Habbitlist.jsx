import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

export default function HabitList() {
  const name =  localStorage.getItem('name')
  const [habits, setHabits] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [habitToDelete, setHabitToDelete] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/habbit')
      .then((res) => res.json())
      .then((data) => {
        setHabits(data);
      })
      .catch((err) => console.error('Failed to fetch habits:', err));
  }, []);

  const formatTimeAgo = (timestamp) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const openConfirm = (habit) => {
  setHabitToDelete(habit);
  setShowConfirm(true);
};

const confirmDelete = async () => {
  try {
    const res = await fetch(`/api/habbit/${habitToDelete.id}`, {
      method: 'DELETE',
    });

    if (!res.ok) throw new Error('Delete failed');

    setHabits(prev => prev.filter(habit => habit.id !== habitToDelete.id));
    setShowConfirm(false);
    setHabitToDelete(null);
  } catch (err) {
    console.error('Error deleting habit:', err);
    alert('Failed to delete habit');
    setShowConfirm(false);
    setHabitToDelete(null);
  }
};

const cancelDelete = () => {
  setShowConfirm(false);
  setHabitToDelete(null);
};



  return (
    <>
      <div style={styles.addBtnContainer}>
        <Link to="/addHabbit" style={styles.link}>
          <button style={styles.button}>Add Habit {name} </button>
        </Link>
      </div>

      <div style={styles.container}>
        <h2 style={styles.heading}>My Habits</h2>
        {habits.length === 0 ? (
          <p style={styles.noHabitsText}>No habits yet 💤</p>
        ) : (
          <div style={styles.grid}>
            {habits.map((habit) => (
              <details key={habit.id} style={styles.card}>
                <summary style={styles.summary}>
                  <span>{habit.title}</span>
                  <span style={styles.iconContainer}>
                    <span
                      onClick={() => navigate('/addHabbit', { state: habit })}
                      style={{ cursor: 'pointer', marginRight: '8px' }}
                      title="Edit Habit"
                    >
                      <FaEdit />
                    </span>

                  <span
                    onClick={() => openConfirm(habit)}
                    style={{ cursor: 'pointer' }}
                    title="Delete Habit"
                  >
                    <MdDelete />
                  </span>

                  {showConfirm && (
                    <div style={overlayStyles}>
                      <div style={modalStyles}>
                        <p>Are you sure you want to delete <b>{habitToDelete.title}</b>?</p>
                        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
                          <button onClick={confirmDelete} style={confirmBtnStyle}>Yes</button>
                          <button onClick={cancelDelete} style={cancelBtnStyle}>Cancel</button>
                        </div>
                      </div>
                    </div>
                  )}
                  </span>
                </summary>
                <p style={styles.description}>{habit.description}</p>
                <p style={styles.timeAgo}> {formatTimeAgo(habit.created_at)}</p>
              </details>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

const overlayStyles = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2000,
};

const modalStyles = {
  backgroundColor: '#fff',
  padding: '30px 40px',
  borderRadius: '10px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.25)',
  textAlign: 'center',
  maxWidth: '320px',
  fontSize: '1.1rem',
  color: '#333',
};

const confirmBtnStyle = {
  backgroundColor: '#dc3545', // red
  color: 'white',
  border: 'none',
  padding: '8px 20px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: '600',
};

const cancelBtnStyle = {
  backgroundColor: '#6c757d', // gray
  color: 'white',
  border: 'none',
  padding: '8px 20px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: '600',
};


const styles = {
  addBtnContainer: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 1000,
  },
  link: {
    textDecoration: 'none',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 123, 255, 0.3)',
    transition: 'background-color 0.3s ease',
  },
  container: {
    margin: '70px auto 30px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '20px',
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '30px',
    fontWeight: '700',
    fontSize: '2rem',
    color: '#007bff',
  },
  noHabitsText: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#666',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: 'white',
    border: '2px solid #007bff',
    borderRadius: '12px',
    padding: '12px 16px 16px',
    boxShadow: '0 6px 12px rgba(0,0,0,0.08)',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  summary: {
    fontWeight: '700',
    color: '#007bff',
    fontSize: '1.1rem',
    outline: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginLeft: '12px',
    fontSize: '1rem',
  },
  description: {
    marginTop: '10px',
    color: '#333',
    fontSize: '0.9rem',
    lineHeight: '1.4',
    whiteSpace: 'pre-wrap',
  },
  timeAgo: {
    fontSize: '0.75rem',
    color: '#888',
    marginTop: '8px',
  }
};
