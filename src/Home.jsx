import { useState, useEffect } from 'react';
import { LogOut, Plus, Edit2, Trash2, Eye } from 'lucide-react';

import {
  useFetchBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} from './features/apiSlice';

export default function Home() {

  const { data: blogs = [], isLoading } = useFetchBlogsQuery();
  const [createBlog] = useCreateBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();

  const [formData, setFormData] = useState({ title: '', content: '' });
  const [selectedBlog, setSelectedBlog] = useState(null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const handleCreateBlog = async () => {
    await createBlog(formData);
    setFormData({ title: '', content: '' });
    setShowCreateModal(false);
  };

  const handleUpdateBlog = async () => {
    await updateBlog({
      id: selectedBlog._id,
      data: formData,
    });
    setFormData({ title: '', content: '' });
    setShowEditModal(false);
  };

  const handleDeleteBlog = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    await deleteBlog(id);
  };

  const openEdit = (blog) => {
    setSelectedBlog(blog);
    setFormData({ title: blog.title, content: blog.content });
    setShowEditModal(true);
  };

  const openView = (blog) => {
    setSelectedBlog(blog);
    setShowViewModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const styles = {

    container: {
      minHeight: '100vh',
      width: '60vw',
      background: 'linear-gradient(to bottom right, #1a1a1a, #2d2d2d)',
      color: '#fff',
      marginRight: 0,
      padding: 0,

    },
    header: {
      backgroundColor: '#2d2d2d',
      borderBottom: '1px solid #404040',
      padding: '20px'
    },
    headerContent: {
      maxWidth: '1280px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '20px'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#fff',
      margin: 0
    },
    subtitle: {
      color: '#b0b0b0',
      marginTop: '5px'
    },
    buttonGroup: {
      display: 'flex',
      gap: '12px'
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 16px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.3s'
    },
    newBlogButton: {
      backgroundColor: '#3b82f6',
      color: '#fff'
    },
    logoutButton: {
      backgroundColor: '#ef4444',
      color: '#fff'
    },
    main: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '32px 20px'
    },
    loader: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '300px'
    },
    spinner: {
      width: '48px',
      height: '48px',
      border: '4px solid #404040',
      borderTop: '4px solid #3b82f6',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    emptyState: {
      textAlign: 'center',
      padding: '64px 20px',
      color: '#b0b0b0'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '24px'
    },
    card: {
      backgroundColor: '#2d2d2d',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
      transition: 'transform 0.2s, box-shadow 0.2s'
    },
    cardTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#fff',
      marginBottom: '12px',
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical'
    },
    cardContent: {
      color: '#b0b0b0',
      marginBottom: '16px',
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical'
    },
    cardActions: {
      display: 'flex',
      gap: '8px'
    },
    viewButton: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      backgroundColor: '#404040',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px'
    },
    editButton: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      backgroundColor: '#1e3a8a',
      color: '#93c5fd',
      padding: '8px 12px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px'
    },
    deleteButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      backgroundColor: '#7f1d1d',
      color: '#fca5a5',
      padding: '8px 12px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer'
    },
    modal: {
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      zIndex: 1000
    },
    modalContent: {
      backgroundColor: '#2d2d2d',
      borderRadius: '12px',
      maxWidth: '600px',
      width: '100%',
      padding: '24px',
      maxHeight: '80vh',
      overflowY: 'auto'
    },
    modalTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: '20px'
    },
    formGroup: {
      marginBottom: '16px'
    },
    label: {
      display: 'block',
      color: '#e0e0e0',
      fontWeight: '500',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      backgroundColor: '#1a1a1a',
      border: '1px solid #404040',
      borderRadius: '6px',
      color: '#fff',
      fontSize: '14px',
      outline: 'none'
    },
    textarea: {
      width: '100%',
      padding: '10px 12px',
      backgroundColor: '#1a1a1a',
      border: '1px solid #404040',
      borderRadius: '6px',
      color: '#fff',
      fontSize: '14px',
      minHeight: '120px',
      resize: 'vertical',
      outline: 'none',
      fontFamily: 'inherit'
    },
    modalActions: {
      display: 'flex',
      gap: '12px',
      marginTop: '24px'
    },
    submitButton: {
      flex: 1,
      backgroundColor: '#3b82f6',
      color: '#fff',
      padding: '10px 16px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500'
    },
    cancelButton: {
      flex: 1,
      backgroundColor: '#404040',
      color: '#fff',
      padding: '10px 16px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500'
    },
    viewModalContent: {
      color: '#e0e0e0',
      whiteSpace: 'pre-wrap',
      lineHeight: '1.6'
    },
    closeButton: {
      width: '100%',
      backgroundColor: '#404040',
      color: '#fff',
      padding: '10px 16px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      marginTop: '24px'
    }
  };

  return (
    <div style={styles.container}>


      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div>
            <h1 style={styles.title}>My Blogs</h1>
            <p style={styles.subtitle}>Manage your blog posts</p>
          </div>
          <div style={styles.buttonGroup}>
            <button
              onClick={() => setShowCreateModal(true)}
              style={{ ...styles.button, ...styles.newBlogButton }}
            >
              <Plus size={20} />
              New Blog
            </button>
            <button
              onClick={handleLogout}
              style={{ ...styles.button, ...styles.logoutButton }}
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main style={styles.main}>
        {isLoading ? (
          <div style={styles.loader}>
            <div style={styles.spinner}></div>
          </div>
        ) : blogs.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={{ fontSize: '1.125rem' }}>No blogs yet. Create your first blog post!</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {blogs.map((blog) => (
              <div key={blog._id} style={styles.card}>
                <h3 style={styles.cardTitle}>{blog.title}</h3>
                <p style={styles.cardContent}>{blog.content}</p>
                <div style={styles.cardActions}>
                  <button onClick={() => openView(blog)} style={styles.viewButton}>
                    <Eye size={16} />
                    View
                  </button>
                  <button onClick={() => openEdit(blog)} style={styles.editButton}>
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button onClick={() => handleDeleteBlog(blog._id)} style={styles.deleteButton}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showCreateModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>Create New Blog</h2>
            <div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  style={styles.textarea}
                />
              </div>
              <div style={styles.modalActions}>
                <button onClick={handleCreateBlog} style={styles.submitButton}>
                  Create Blog
                </button>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setFormData({ title: '', content: '' });
                  }}
                  style={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>Edit Blog</h2>
            <div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  style={styles.textarea}
                />
              </div>
              <div style={styles.modalActions}>
                <button onClick={handleUpdateBlog} style={styles.submitButton}>
                  Update Blog
                </button>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setFormData({ title: '', content: '' });

                  }}
                  style={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showViewModal && selectedBlog && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>{selectedBlog.title}</h2>
            <p style={styles.viewModalContent}>{selectedBlog.content}</p>
            <button
              onClick={() => {
                setShowViewModal(false);
              }}
              style={styles.closeButton}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}