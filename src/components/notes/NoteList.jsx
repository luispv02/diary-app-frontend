import { useDeleteNote } from "../../hooks/useNotes";
import { NoteItem } from "./NoteItem";

export const NoteList = ({ notes }) => {

  const { mutateAsync } = useDeleteNote();

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 justify-center mx-auto">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} onDelete={mutateAsync}/>
      ))}
    </div>
  );
};
