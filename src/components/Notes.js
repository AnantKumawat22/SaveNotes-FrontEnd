import React, { useState, useContext, useEffect, useRef } from 'react';
import noteContext from '../context/notes/noteContext';
import Addnote from './Addnote';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    const { notes, getNotes, editNote } = context;
    const ref = useRef(null);
    const refClose = useRef(null);
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        }
        else navigate("/login");
    }, []);

    const updateNote = (currNote) => {
        ref.current.click();
        setNote({ id: currNote._id, etitle: currNote.title, edescription: currNote.description, etag: currNote.tag });
    }
    const handleClick = async (e) => {
        e.preventDefault();

        let data = await editNote(note.id, note);
        if (data.success) {
            props.showAlert(data.msg, "success");
            refClose.current.click();
        } else props.showAlert(data.msg, "danger");

    }

    const inpChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <>
            <Addnote showAlert={props.showAlert} />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModalCenter">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Edit Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="form-group">
                                    <label htmlFor="etitle">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="etitleHelp" value={note.etitle} onChange={inpChange} placeholder="Enter Title" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="edescription">Description</label>
                                    <input type="text" className="form-control" onChange={inpChange} id="edescription" name="edescription" value={note.edescription} placeholder="Enter Description" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="etag">Tag</label>
                                    <input type="text" className="form-control" value={note.etag} onChange={inpChange} id="etag" name="etag" placeholder="Enter Tag" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container my-5'>
                <h2>Your Notes</h2>
                <div className="row my-3">
                    <div className="container mx-2">
                        {notes.length === 0 && "No Note to show."}
                    </div>
                    {notes.map((note) => {
                        return <Noteitem key={note._id} showAlert={props.showAlert} updatenote={updateNote} note={note} />
                    })}
                </div>
            </div>
        </>
    );
}

export default Notes;