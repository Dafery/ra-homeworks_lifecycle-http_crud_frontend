import { FC, FormEventHandler, Key, useEffect, useState } from 'react';

import { TNote } from '../types';
import { Note } from './Note';

export const Notes: FC = () => {
  const [notes, setNotes] = useState<TNote[]>([]);

  const getNotes = async () => {
    try {
      const res = await fetch('http://localhost:7070/notes');
      const data = await res.json();
      setNotes(data);
    } catch {}
  };

  const postNotes = async (note: TNote) => {
    try {
      await fetch('http://localhost:7070/notes', {
        method: 'POST',
        body: JSON.stringify(note),
      });
      await getNotes();
    } catch {}
  };

  const deleteNotes = async (id: Key) => {
    try {
      await fetch(`http://localhost:7070/notes/${id}`, {
        method: 'DELETE',
      });
      await getNotes();
    } catch {}
  };

  const onDelete = (id: Key) => () => deleteNotes(id);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const newNote: TNote = {
      content: e.currentTarget.content.value,
    };

    postNotes(newNote);
  };

  useEffect(() => {
    getNotes();
    return () => {
      setNotes([]);
    };
  }, []);

  return (
    <div className="notes">
      <div className="notes__top">
        <h1 className="notes__top__title">Notes</h1>
        <button className="notes__top__update" onClick={getNotes}>
          &#128472;
        </button>
      </div>
      <div className="notes__list">
        {notes.map((note) => (
          <Note key={note.id} onDelete={onDelete} {...note} />
        ))}
      </div>
      <form className="notes__form" onSubmit={onSubmit}>
        <label className="notes__form__label">
          New Note
          <textarea className="notes__form__textarea" name="content"></textarea>
        </label>
        <button className="notes__form__add">&#10148;</button>
      </form>
    </div>
  );
};
