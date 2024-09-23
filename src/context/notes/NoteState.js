import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
    // const host = `http://localhost:8000`;
    const host = `https://savenotes-backend.onrender.com/`;

    // Notes
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    // Get Notes
    const getNotes = async () => {
        // API CALL
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
        });
        const data = await response.json();
        setNotes(data);
    }

    // Add a Note
    const addNote = async (paranote) => {
        let title = paranote.title;
        let description = paranote.description;
        let tag = paranote.tag;

        // API CALL
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const data = await response.json();

        // Response data contains :- note, success, msg.
        if (data.success) {
            setNotes(notes.concat(data.note));
            return data;
        }
        else return { success: false, msg: data.msg };
    }

    // Delete a Note
    const deleteNote = async (id) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const data = await response.json();

        if (data.success) {
            // DELETE NOTE
            const newNotes = notes.filter((eachnote) => { return eachnote._id !== id });
            setNotes(newNotes);
            return data;
        } else return { success: false, msg: data.msg };

    }

    // Edit a Note
    const editNote = async (id, paranote) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title: paranote.etitle, description: paranote.edescription, tag: paranote.etag })
        });
        const data = await response.json();

        if (data.success) {
            // EDIT NOTE
            let newNotes = JSON.parse(JSON.stringify(notes));
            for (let i = 0; i < newNotes.length; i++) {
                if (newNotes[i]._id === id) {
                    newNotes[i].title = paranote.etitle;
                    newNotes[i].description = paranote.edescription;
                    newNotes[i].tag = paranote.etag;
                    break;
                }
            }
            setNotes(newNotes);
            return data;
        } else return { success: false, msg: data.msg };

    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;