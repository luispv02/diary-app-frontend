
import { FormNote } from "../../components/notes/FormNote";
import { useNoteForm } from "../../hooks/useNoteForm";
import { uploadImages } from "../../helpers/uploadImages";
import { useNavigate } from "react-router";
import { useCreateNote } from "../../hooks/useNotes";
import { useNoteStore } from "../../stores/useNoteStore";
import { toast } from "react-toastify";

const noteValues = {
  title: "",
  date: new Date().toISOString().slice(0, 10),
  content: "",
};

const noteValidations = {
  title: { minLength: 2, message: "El titulo debe tener minimo 2 caracteres" },
  content: { minLength: 1, message: "El contenido es obligatorio" },
};

export const NewNotePage = () => {
  const formNote = useNoteForm(noteValues, noteValidations);
  const navigate = useNavigate();
  const { mutateAsync } = useCreateNote()
  const setLoading = useNoteStore((state) => state.setLoading)

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!formNote.isFormValid()) {
      return;
    }
    
    try {
      setLoading(true)
      const payload = formNote.getPayload()

      if(payload?.images?.length){
        const imagesUrls = await Promise.all(
          payload.images.map((img) => uploadImages(img.file))
        )
        payload.images = imagesUrls
      }
    
      await mutateAsync(payload)
      setLoading(false)
      navigate('/')
    } catch (error) {
      setLoading(false)
      toast.warn('Error al crear la nota')
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md px-4 py-6 md:py-10 md:px-6">
      <FormNote onSubmit={ handleSubmit } formNote={formNote} />
    </div>
  );
};
