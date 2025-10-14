import { FaEdit, FaRegImage, FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import { formatDate } from "../../utils/formDate";
import { EmojiList } from "./EmojiList";
import { useModalStore } from "../../stores/useModalStore";
import { useNoteStore } from "../../stores/useNoteStore";
import { MdDeleteOutline } from "react-icons/md";

export const NoteItem = ({ note, onDelete }) => {
  const navigate = useNavigate();
  const setSelectedNote = useNoteStore((state) => state.setSelectedNote)
  const openModal = useModalStore((state) => state.openModal)

  const showDetails = () => {
    setSelectedNote(note)
    navigate(`/notes/view/${note.id}`);
  };

  const handleEditNote = (e) => {
    e.stopPropagation();

    setSelectedNote(note)
    navigate(`/notes/edit/${note.id}`);
  };

  const handleDeleteNote = (e) => {
    e.stopPropagation();
    setSelectedNote(note)

    const modalData = {
      title: "Eliminar nota",
      message: `¿Estás seguro de eliminar esta nota con el id: ${note.id}?`,
      icon: <MdDeleteOutline size={70} />,
      buttons: [
        {
          label: 'Cancelar',
          class: 'bg-gray-300',
          onClick: async(handleCloseModal) => {
            await handleCloseModal()
          }
        },
        {
          label: 'Eliminar',
          class: 'bg-red-500 text-white',
          loading: true,
          onClick: async(handleCloseModal) => {
            await onDelete(note.id)
            await handleCloseModal()
          }
        }
      ]
    }

    openModal(modalData)
  }

  return (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-xl overflow-hidden break-inside-avoid transition-all duration-300 hover:-translate-y-2 flex flex-col"
    >
      {/* Image/content  */}
      <div onClick={showDetails} className="cursor-pointer">
        <div className="relative h-50 md:h-56">
          <img
            src={note?.images[0] || "/placeholder.webp"}
            alt={note.title}
            loading="lazy"
            className="w-full h-full object-cover "
          />
        </div>

        {/* Main content */}
        <div className="p-4 md:p-5 h-full">

          {/* Title */}
          <h3 className="text-lg leading-6 md:text-xl font-semibold text-gray-800 line-clamp-2">
            {note.title}
          </h3>

          {/* Emojis */}
          <div className="my-1 flex flex-wrap">
            <EmojiList emojis={note.emojis}/>
          </div>

          {/* Date */}
          <p className="text-sm text-gray-500 mb-1">{formatDate(note.date)}</p>

          {/* Number of images */}
          {
            note.images.length > 0 &&
            <div className="flex items-center mb-2 space-x-2">
              <FaRegImage color="gray" />
              <span className="text-sm text-gray-600">
                {note.images.length} imagen{note.images.length !== 1 ? "es" : ""}
              </span>
            </div>
          }

          {/* Content */}
          <p className="text-gray-600 text-sm leading-5 mb-1 line-clamp-2">
            {note.content}
          </p>
        </div>
      </div>
      
      {/* noteId/Actions */}
      <div className="px-4 md:px-3 pb-4 md:pb-3 border-t border-gray-300 pt-3 mt-auto">
        <div className="flex justify-between items-end">

          <div className="text-[10px] text-gray-500">
            { note.id }
          </div>
        
          <div className="space-x-1">
            <button
              className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors duration-200 cursor-pointer"
              aria-label="Editar nota"
              title="Editar nota"
              onClick={handleEditNote}
            >
              <FaEdit size={18} />
            </button>

            <button
              className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors duration-200 cursor-pointer"
              aria-label="Eliminar nota"
              title="Eliminar nota"
              onClick={handleDeleteNote}
            >
              <FaRegTrashAlt size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
