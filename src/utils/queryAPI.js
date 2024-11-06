export async function queryAPI(title, description) {
    const data = { inputs: `Title: ${title}\nDescription: ${description}` };
  
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions",
        {
          headers: {
            Authorization: "Bearer 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",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error querying API:", error);
      return null;
    }
  }