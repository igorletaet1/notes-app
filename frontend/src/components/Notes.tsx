import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Note {
    id: number;
    title: string;
    content: string;
}

const Notes: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [newNote, setNewNote] = useState<{ title: string; content: string }>({ title: '', content: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/notes');
            setNotes(response.data);
        } catch (error) {
            console.error('Failed to fetch notes:', error);
            setError('Failed to fetch notes');
        } finally {
            setLoading(false);
        }
    };

    const addNote = async () => {
        if (!newNote.title || !newNote.content) {
            alert('Title and content are required');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/notes', newNote);
            setNotes([...notes, response.data]);
            setNewNote({ title: '', content: '' });
        } catch (error) {
            console.error('Failed to add note:', error);
            setError('Failed to add note');
        }
    };

    const updateNote = async (id: number) => {
        const noteToUpdate = notes.find((note) => note.id === id);
        if (!noteToUpdate) return;

        const updatedTitle = prompt('Enter new title:', noteToUpdate.title) || noteToUpdate.title;
        const updatedContent = prompt('Enter new content:', noteToUpdate.content) || noteToUpdate.content;

        try {
            await axios.put(`http://localhost:5000/api/notes/${id}`, { title: updatedTitle, content: updatedContent });
            fetchNotes();
        } catch (error) {
            console.error('Failed to update note:', error);
            setError('Failed to update note');
        }
    };

    const deleteNote = async (id: number) => {
        try {
            await axios.delete(`http://localhost:5000/api/notes/${id}`);
            setNotes(notes.filter((note) => note.id !== id));
        } catch (error) {
            console.error('Failed to delete note:', error);
            setError('Failed to delete note');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <input
                    type="text"
                    placeholder="Title"
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Content"
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                />
                <button onClick={addNote}>Add Note</button>
            </div>
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>
                        <h2>{note.title}</h2>
                        <p>{note.content}</p>
                        <button onClick={() => updateNote(note.id)}>Edit</button>
                        <button onClick={() => deleteNote(note.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notes;