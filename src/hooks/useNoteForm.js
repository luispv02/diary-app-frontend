import { useEffect, useMemo, useState } from "react";
import { useForm } from "./useForm";

export const useNoteForm = (initialValues = {}, validations = {}, initialOptionalData = { images: [], emojis: [] }) => {
    const { handleInputChange, userData, isFormValid, errors } = useForm(initialValues, validations);
    const [optionalData, setOptionalData] = useState(initialOptionalData)

    useEffect(() => {
        if (initialOptionalData.images.length > 0 || initialOptionalData.emojis.length > 0) {
            setOptionalData(initialOptionalData);
        }
    }, [initialOptionalData]);

    const getPayload = () => {
        const { images, emojis } = optionalData
        const { title, content, date } = userData;

        return {
            title: title?.trim(),
            content: content?.trim(),
            date,
            emojis,
            images
        };
    }

    return {
        handleInputChange,
        userData,
        isFormValid,
        errors,
        optionalData,
        setOptionalData,
        getPayload
    }
};