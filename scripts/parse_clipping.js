// n8n Code Node script: Pre-processes raw web text to minimize Claude token usage
for (const item of $input.all()) {
  let rawText = item.json.content || item.json.body || "";

  // 1. Remove HTML tags using a regex fallback
  let cleanedText = rawText.replace(/<[^>]*>/g, ' ');

  // 2. Normalize whitespace, tabs, and line breaks
  cleanedText = cleanedText.replace(/\s+/g, ' ').trim();

  // 3. Truncate text to safely fit within limits if an article is massive (e.g., ~6000 characters)
  if (cleanedText.length > 6000) {
    cleanedText = cleanedText.substring(0, 6000) + "... [Truncated for Token Optimization]";
  }

  // Bind the optimized payload back to the item JSON context
  item.json.optimized_payload = cleanedText;
}

return $input.all();