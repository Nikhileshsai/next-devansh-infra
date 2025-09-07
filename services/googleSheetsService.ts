interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

export const submitToGoogleSheets = async (data: ContactFormData): Promise<{ success: boolean }> => {
    try {
        const response = await fetch('/api/submit-contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            console.error('Error from serverless function:', result.error);
            return { success: false };
        }

        return { success: result.success };
    } catch (error) {
        console.error('Network or unexpected error submitting form:', error);
        return { success: false };
    }
};
