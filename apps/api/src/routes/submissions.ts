import { Router } from "express";
import { submissionSchema } from "../schemas/submission.js";
import { submissions } from "../db/data.js";

const router = Router();

router.post("/", (req, res) => {
  try {
    const validated = submissionSchema.parse(req.body);

    // Add to in-memory storage
    const submission = {
      ...validated,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    submissions.push(submission);

    // Mock email notification (log only)
    console.log("📧 Mock Email Sent:");
    console.log("To:", validated.email);
    console.log("Subject: Submission Received - Conference 2026");
    console.log("---");
    console.log(`Thank you, ${validated.name}!`);
    console.log(`Your submission "${validated.title}" has been received.`);
    console.log(`Track: ${validated.track}`);
    console.log("---\n");

    res.status(201).json({
      success: true,
      message: "Submission received successfully",
      id: submission.id,
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: error.errors,
      });
    }
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

export default router;
