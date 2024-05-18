export function saveToLocal(objectKey, objectValue) {
    try {
        const serializedObject = JSON.stringify(objectValue);
        localStorage.setItem(objectKey, serializedObject);
        
        console.log("Object saved successfully!");
    } catch (error) {
        console.error("Error saving object to localStorage:", error);
    }
}
