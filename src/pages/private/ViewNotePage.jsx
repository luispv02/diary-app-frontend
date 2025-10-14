import { useParams, useNavigate } from 'react-router';
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import { formatDate } from '../../utils/formDate';
import { ImageGallery } from '../../components/notes/ImageGallery';
import { EmojiList } from '../../components/notes/EmojiList';
import { useDeleteNote, useGetNoteById } from '../../hooks/useNotes';
import { Loading } from '../../components/ui/Loading';
import { useModalStore } from '../../stores/useModalStore';
import { MdDeleteOutline } from 'react-icons/md';
import { Modal } from '../../components/ui/Modal';
import { NoteNotFound } from '../../components/ui/NoteNotFound';

export const ViewNotePage = () => {
  
  const { id } = useParams();
  const navigate = useNavigate();

  const { isPending, data: note } = useGetNoteById(id)
  const { mutateAsync } = useDeleteNote();

  const isModalOpen = useModalStore((state) => state.isModalOpen)
  const openModal = useModalStore((state) => state.openModal)

  const handleEditNote = () => {
    navigate(`/notes/edit/${id}`);
  };

  const handleDeleteNote = () => {
    const modalData = {
      title: "Eliminar nota",
      message: `¿Estás seguro de eliminar esta nota con el id: ${id}?`,
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
            await mutateAsync(id)
            await handleCloseModal()
            navigate('/');
          }
        }
      ]
    }

    openModal(modalData)
  }
  
  if(isPending) return <Loading />

  if(!note?.data) return <NoteNotFound />;

  return (
    <div className="bg-white shadow-md rounded-md px-4 pt-6 pb-4 md:pt-10 md:px-6">

      <div className='mb-2 flex flex-col md:flex-row md:items-start'>

        {/* title */}
        <h2 className="text-2xl md:text-3xl leading-7 font-bold text-gray-800 flex-1">
          {note.data.title}
        </h2>

        {/* Edit / Delete note */}
        <div className='flex gap-2 mt-3 md:mt-0 self-end'>
          <button
            onClick={handleEditNote}
            className="py-1 px-3 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-sm transition-colors duration-200 cursor-pointer flex items-center gap-2"
            aria-label="Editar nota"
            title="Editar nota"
          >
            <FaEdit size={18} />
            <span className="text-sm font-medium hidden sm:block">Editar</span>
          </button>

          <button
            onClick={handleDeleteNote}
            className="py-1 px-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-sm transition-colors duration-200 cursor-pointer flex items-center gap-2"
            aria-label="Editar nota"
            title="Editar nota"
          >
            <FaRegTrashAlt size={18} />
            <span className="text-sm font-medium hidden sm:block">Eliminar</span>
          </button>
        </div>
      </div>

      {/* Emojis */}
      {
        note.data.emojis.length > 0 &&
        <div className="flex flex-wrap gap-1">
          <EmojiList emojis={note.data.emojis} />
        </div>
      }

      {/* Date */}
      <div>
        <p className="text-sm font-medium text-gray-500 mt-1">
          {formatDate(note.data.date)}
        </p>
      </div>

      {/* Content  */}
      <div className='mb-4'>
        <h2 className="text-xl font-semibold text-gray-800">Contenido</h2>
        <div className="rounded-lg">
          <p className="text-gray-700 text-base md:text-lg whitespace-pre-wrap">
            {note.data.content}
          </p>
        </div>
      </div>

      {/* Images */}
      {
        note.data.images.length > 0 &&
        <ImageGallery images={note.data.images} />
      }

      <div className='text-[10px] text-left text-gray-500 mt-3'>
        { id }
      </div>

      {
        isModalOpen && <Modal />
      }
    </div>
  );
};