import axiosInstance from "./axios";

export const getNotes = async() => {
    const response = await axiosInstance.get('/notes');
    return response.data
}

export const getNoteById = async(noteId) => {
    const response = await axiosInstance.get(`/notes/${noteId}`);
    return response.data
}

export const createNote = async(note) => {
    const response = await axiosInstance.post('/notes', note);
    return response.data
}

export const updateNote = async(note) => {
    const response = await axiosInstance.put(`/notes/${note.id}`, note.updatedNote);
    return response.data
}

export const deleteNote = async(noteId) => {
    const response = await axiosInstance.delete(`/notes/${noteId}`);
    return response.data
}