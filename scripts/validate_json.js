// n8n Code Node script: Resilient fallback JSON validation post-LLM extraction
for (const item of $input.all()) {
  let rawLlmOutput = item.json.response || item.json.text || "";
  let parsedData = {};

  try {
    // If Claude accidentally wrapped the data in markdown syntax, strip it out
    if (rawLlmOutput.includes("```")) {
      rawLlmOutput = rawLlmOutput.replace(/```json/g, "").replace(/```/g, "").trim();
    }

    // Safely parse the text into a real Javascript/JSON Object
    parsedData = JSON.parse(rawLlmOutput);
  } catch (error) {
    // Production Fallback: Ensure the pipeline doesn't crash if the JSON is invalid
    parsedData = {
      competitor_name: "Extraction Failed",
      impact_level: "High",
      summary_one_sentence: "Error parsing unstructured payload dynamically.",
      action_required: true,
      recommended_response: `Review raw log payload manually. Syntax error: ${error.message}`
    };
  }

  // Overwrite item data with the validated, structured fields
  item.json.output = parsedData;
}

return $input.all();