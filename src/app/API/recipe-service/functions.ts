export const createIngredient = async (name: string): Promise<number | null> => {
    try {
        console.log('createCourse', name);
        const response = await fetch("http://localhost:5000/api/ingredients/", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: name })
        });

        return response.status;

    } catch (error) {
        console.error("Error creating a course:", error);
        return null;
    }
}
