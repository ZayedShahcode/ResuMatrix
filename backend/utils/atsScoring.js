import natural from "natural";
const tokenizer = new natural.WordTokenizer();
const TfIdf = natural.TfIdf;

function extractKeywords(text) {
    const tfidf = new TfIdf();
    tfidf.addDocument(text);

    return tfidf
        .listTerms(0)
        .filter((item) => item.term.length > 1) // Keep 2+ char terms (AI, ML, AWS, API, etc.)
        .slice(0, 10) // Get top 10 keywords
        .map((item) => item.term);
}

export function calculateATSScore(resume, jobDescription) {
    try {
        if (typeof resume !== "string" || typeof jobDescription !== "string") {
            console.error("Invalid input types:", {
                resumeType: typeof resume,
                jobDescriptionType: typeof jobDescription,
            });
            throw new Error("Resume and job description must be text");
        }

        // Extract keywords from job description
        const jobKeywords = extractKeywords(jobDescription.toLowerCase());
        console.log("Extracted keywords:", jobKeywords);

        if (!jobKeywords || jobKeywords.length === 0) {
            throw new Error("No keywords found in job description");
        }

        // Convert resume text to lowercase for comparison
        const resumeText = resume.toLowerCase();

        // Count matching keywords
        const matchedKeywords = jobKeywords.filter((keyword) =>
            resumeText.includes(keyword)
        );
        console.log("Matched keywords:", matchedKeywords);

        // Calculate score as a percentage
        const score = Math.round(
            (matchedKeywords.length / jobKeywords.length) * 100
        );

        console.log("Calculated score:", score);

        return {
            score,
            matchedKeywords,
        };
    } catch (error) {
        console.error("Error in calculateATSScore:", error);
        throw new Error(`Failed to calculate ATS score: ${error.message}`);
    }
}
