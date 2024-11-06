const query =async(description:any)=>{
    const response =await fetch(
      "https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(description),
      }
    );
    const result = await response.json();
    return result;
  }
export default query;