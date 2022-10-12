import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const { note, updatenote } = props;

    const handleDeleteNote = async () => {
        let data = await deleteNote(note._id);
        if(data.success){
            props.showAlert(data.msg, "success");
        } else props.showAlert(data.msg, "danger");
    }
    return (
        <div className='col-md-3'>
            <div className="card my-3 note-item">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text small" style={{letterSpacing: "0.2px"}}>{note.tag}</p>
                    <i className="far fa-trash-alt mx-2" onClick={handleDeleteNote}></i>
                    <i className="far fa-edit mx-2" onClick={()=> { updatenote(note) }}></i>
                </div>
            </div>
        </div>
    );
}

export default Noteitem;