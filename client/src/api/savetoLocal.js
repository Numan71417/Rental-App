export function saveToLocal(objectKey, objectValue) {
    try {
        // Convert the object to a JSON string
        const serializedObject = JSON.stringify(objectValue);
        
        // Save the serialized object to localStorage
        localStorage.setItem(objectKey, serializedObject);
        
        console.log("Object saved successfully!");
    } catch (error) {
        console.error("Error saving object to localStorage:", error);
    }
}
