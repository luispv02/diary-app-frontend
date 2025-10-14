import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createNote, deleteNote, getNoteById, getNotes, updateNote } from "../api/notes"
import { toast } from "react-toastify"
import { useAuthStore } from "../stores/useAuthStore"

const createNoteMutation = (mutationFn, errorMsg, invalidateKey) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn,
        onSuccess: (data) => {
            toast.success(data?.msg)

            if(invalidateKey){
                queryClient.invalidateQueries({ queryKey: [invalidateKey] });
            }
        },
        onError: (error) => {
            console.log('onError', error)
            toast.error(error?.response?.data?.msg || errorMsg)
        }
    })
}

export const useGetNotes = () => {
    const user = useAuthStore((state) => state.user);

    return useQuery({
        queryKey: ['notes', user?.uid],
        queryFn: getNotes,
        enabled: !!user?.uid,
    })
}

export const useCreateNote = () => {
    return createNoteMutation(createNote, "Error al crear nota", "notes")
}

export const useUpdateNote = () => {
    return createNoteMutation(updateNote, "Error al editar nota", "notes")
}

export const useGetNoteById = (noteId) => {
    return useQuery({
        queryKey: ['note', noteId],
        queryFn: () => getNoteById(noteId),
        enabled: !!noteId,
    })
}

export const useDeleteNote = () => {
    return createNoteMutation(deleteNote, "Error al eliminar la nota", "notes")
}