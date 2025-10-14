import { EmptyNotes } from '../../components/notes/EmptyNotes';
import { NoteList } from '../../components/notes/NoteList';
import { Loading } from '../../components/ui/Loading';
import { useGetNotes } from '../../hooks/useNotes';
import { useAuthStore } from '../../stores/useAuthStore';
import { Modal } from '../../components/ui/Modal';
import { useModalStore } from '../../stores/useModalStore';

export const HomeNotesPages = () => {
  const { isPending, error, data: notes } = useGetNotes()
  const user = useAuthStore((state) => state.user)
  const isModalOpen = useModalStore((state) => state.isModalOpen)
  
  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">

      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-2">
            ¡Hola, { user?.name }!
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Aquí están todas tus notas del diario
          </p>
        </div>

        
        { isPending && <Loading/> }
        { !isPending && !notes?.data?.length && !error && <EmptyNotes /> }
        { !isPending && notes?.data?.length > 0 && !error && <NoteList notes={notes.data} /> }

        {
          error && 
          <div className='text-center py-12 bg-red-50 border border-red-200 rounded-2xl shadow-lg max-w-2xl mx-auto text-red-500'>
            <span>{ error?.response?.data?.msg || 'Error al obtener las notas' }</span>
          </div>
        }

      </div>
      {
        isModalOpen && <Modal />
      }
    </div>
  );
};