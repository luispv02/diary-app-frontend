
import { FormNote } from "../../components/notes/FormNote";
import { useNavigate, useParams } from "react-router";
import { useNoteForm } from "../../hooks/useNoteForm";
import { NoteNotFound } from "../../components/ui/NoteNotFound";
import { uploadImages } from "../../helpers/uploadImages";
import { useGetNoteById, useUpdateNote } from "../../hooks/useNotes";
import { Loading } from "../../components/ui/Loading";
import { useMemo } from "react";
import { useNoteStore } from "../../stores/useNoteStore";
import { toast } from "react-toastify";

const noteValidations = {
  title: { minLength: 2, message: "El titulo debe tener minimo 2 caracteres" },
  content: { minLength: 1, message: "El contenido es obligatorio" },
};

export const EditNotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { isPending, data: note, error } = useGetNoteById(id)
  const { mutateAsync } = useUpdateNote()
  const setLoading = useNoteStore((state) => state.setLoading)

  const { content = "", title = "", date = "", images = [], emojis = [] } = note?.data || {};

  const initialFormValues = useMemo(() => ({
    title, 
    content, 
    date
  }), [title, content, date]);
  
  const initialOptional = useMemo(() => ({
    images, 
    emojis
  }), [images, emojis]);

  const formNote = useNoteForm(initialFormValues, noteValidations, initialOptional);
  
  const handleSubmit = async(e) => {
    e.preventDefault();
  
    if(!formNote.isFormValid()) {
      return;
    }

    try {
      setLoading(true)
      const updatedNote = formNote.getPayload()

      const { images } = updatedNote
      if(images?.length){

        const { savedImgs, uploadedImgs } = images.reduce((acc, img) => {
          if(img?.file && img?.file?.type?.startsWith('image/')){
            acc.uploadedImgs.push(uploadImages(img.file));
          }else{
            acc.savedImgs.push(img)
          }
          return acc;

        }, {savedImgs: [], uploadedImgs: []})

        const urlNewImgs = await Promise.all(uploadedImgs);
        updatedNote.images = [...savedImgs, ...urlNewImgs]
      }
      
      const data = { id, updatedNote }
      await mutateAsync(data)
      setLoading(false)
      navigate(-1);

    } catch (error) {
      setLoading(false)
      toast.error('Error al guardar la nota.');
    }
  };

  if(isPending) return <Loading />
  if(error) return <NoteNotFound />
  
  return (
    <div className="bg-white shadow-md rounded-md px-4 py-6 md:py-10 md:px-6">
      <FormNote onSubmit={ handleSubmit } formNote={ formNote } />
    </div>
  );
};