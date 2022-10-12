import React, {useState, useContext} from 'react';
import noteContext from '../context/notes/noteContext';

const Addnote = (props) => {
    // Input fields and Context.
    const [note, setNote] = useState({title: "", description: "", tag: ""});
    const context = useContext(noteContext);
    const {addNote} = context;

    // Add Note
    const handleClick = async (e) => {
        e.preventDefault();
        
        let data = await addNote(note);
        if(data.success){
            setNote({title: "", description: "", tag: ""});
            
            // Alert
            props.showAlert(data.msg, "success");
        } else{
            // Alert
            props.showAlert(data.msg, "danger");
        }
    }

    // Set value in Input fields 
    const inpChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    }

    return (
        <div className="container my-3">
            <h2>Add a Note</h2>

            {/* Add New Note Form */}
            <form className='my-3'>
                <div className="form-group">
                    {/* Title label and input */}
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control inp-cls" id="title" name="title" aria-describedby="titleHelp" onChange={inpChange} value={note.title} placeholder="Enter Title" />
                </div>
                <div className="form-group">
                    {/* Description label and input */}
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control inp-cls" onChange={inpChange} value={note.description} id="description" name="description" placeholder="Enter Description" />
                </div>
                <div className="form-group">
                    {/* Tag label and input */}
                    <label htmlFor="tag">Tag</label>
                    <input type="text" className="form-control inp-cls" onChange={inpChange} value={note.tag} id="tag" name="tag" placeholder="Enter Tag" />
                </div>

                {/* Add Note Button */}
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default Addnote;