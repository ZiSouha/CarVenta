# CarVenta — Generate Two Production-Ready Replit Prompts

## Your Role

Act as a senior software architect, technical writer, presentation designer, and expert prompt engineer.

Your task is to analyze the entire CarVenta project and generate TWO independent, detailed prompts that I will copy into Replit to create the final deliverables.

You are NOT responsible for creating the presentation or report yourself. Your only deliverable is the two prompts.

## 1. Inspect the Real Project

Before writing either prompt, inspect the actual CarVenta codebase and determine:

- What CarVenta does and what problem it solves.
- Its real features and user workflows.
- The actual frontend and backend technologies.
- The project architecture and component responsibilities.
- Database technology, models, relationships, and data flow.
- API endpoints and integrations.
- Authentication, authorization, and security mechanisms.
- Main user interfaces and available screenshots.
- Installation, configuration, and execution requirements.
- Existing tests, verified results, known limitations, and unfinished features.
- Important engineering decisions and potential future improvements.

Use the source code, configuration files, documentation, and existing screenshots as evidence.

Do not invent functionality, test results, architecture, performance metrics, users, revenue, or implementation details.

Clearly distinguish implemented features from planned features and unverified assumptions.

If information cannot be verified from the project, instruct Replit to identify the gap rather than fabricate an answer.

## 2. Generate Exactly Two Independent Prompts

Create these two Markdown files:

1. `REPLIT_PROMPT_PRESENTATION.md`
2. `REPLIT_PROMPT_TECHNICAL_REPORT.md`

Both files must contain complete, self-contained prompts that can be copied directly into Replit without requiring the other file or this original instruction.

Include enough project-specific information in each prompt that Replit can produce a high-quality result without having to rediscover the entire application.

Do not generate the actual presentation or report. Do not modify application code.

---

## PROMPT 1 — Professional Project Presentation

Write a detailed prompt instructing Replit to create a complete, visually polished presentation about the actual CarVenta application.

### Purpose

The presentation should be suitable for:

- A professional GitHub portfolio.
- Software engineering recruiters and technical interviews.
- University project demonstrations.
- LinkedIn and SlideShare publication.
- Demonstrating software engineering knowledge and technical communication.

### Required content

Instruct Replit to create a coherent presentation containing approximately 12–16 slides, adjusted to the actual project complexity.

Consider these sections:

1. Cover slide with CarVenta branding and project information.
2. Project overview and problem statement.
3. Objectives and target users.
4. Key implemented features.
5. Main user journeys and application workflows.
6. Technology stack and the role of each technology.
7. System architecture with a clear diagram.
8. Database design and important relationships.
9. Frontend structure and user interface.
10. Backend architecture and API communication.
11. Authentication, authorization, and security.
12. Testing and verified quality results.
13. Technical challenges and actual solutions.
14. Current limitations and potential improvements.
15. Installation, demonstration, or deployment overview, where applicable.
16. Conclusion and relevant project links.

Adapt the slide count and section order to the actual implementation. Combine or omit sections when appropriate rather than filling slides with invented content.

### Visual design requirements

The presentation must look like a premium software engineering case study, not a generic school template.

Require:

- A consistent professional design system.
- Strong typography and visual hierarchy.
- Carefully chosen colors and consistent spacing.
- Clean layouts with limited text per slide.
- Real CarVenta screenshots wherever available.
- Accurate architecture and workflow diagrams.
- Database diagrams based on the actual schema.
- Technology logos only for technologies genuinely used.
- Readable code snippets only when they explain important decisions.
- Appropriate slide numbers, headings, and visual consistency.
- A polished cover and conclusion.
- No excessive animations, clutter, or decorative elements that reduce readability.

Prefer explaining concepts visually rather than filling slides with paragraphs.

### Deliverables

Instruct Replit to create:

- An editable PowerPoint presentation (`.pptx`).
- A presentation PDF (`.pdf`).
- Editable source files and assets where appropriate.
- A brief README explaining how the presentation was generated and how to regenerate it.

Use a reliable presentation-generation approach supported by the Replit environment.

The PowerPoint and PDF must contain the same final slide content and have consistent formatting.

Require the final files to be checked for missing images, broken layouts, unreadable text, clipped elements, and export errors.

The presentation must be complete and usable, not merely a slide outline or a set of HTML mockups.

---

## PROMPT 2 — Complete Technical Project Report

Write a detailed prompt instructing Replit to produce a professional technical report documenting the real CarVenta application.

### Purpose

The report should serve as:

- Technical documentation for the GitHub repository.
- A software engineering portfolio case study.
- A reference for developers who want to understand or run the project.
- Supporting material for technical interviews and academic project presentations.

Target approximately 15–25 pages when justified by the actual project's complexity. Prioritize accuracy and usefulness over page count.

### Required sections

Instruct Replit to consider the following structure:

1. Cover page.
2. Abstract or executive summary.
3. Table of contents.
4. Introduction and project motivation.
5. Problem statement and objectives.
6. Project scope and requirements.
7. Functional and non-functional requirements.
8. Actual technology stack and rationale.
9. System architecture and component responsibilities.
10. Frontend architecture and user interface.
11. Backend architecture and business logic.
12. Database design, models, relationships, and constraints.
13. API design and important endpoints.
14. Authentication, authorization, and security.
15. Important user workflows, supported by diagrams.
16. Validation, error handling, and reliability.
17. Installation and local development setup.
18. Environment configuration using safe placeholders.
19. Testing methodology and actual results.
20. Important engineering challenges and verified solutions.
21. Limitations and unresolved issues.
22. Future development roadmap.
23. Conclusion.
24. References and appendices, where appropriate.

Adapt the structure to the actual codebase. Explain which features exist and which are only proposed future improvements.

### Technical depth

The report must explain how CarVenta works, not simply list technologies.

Require:

- A system architecture diagram based on the actual implementation.
- A database entity-relationship diagram based on real models.
- Important API request and response examples, using safe sample data.
- Explanations of important data flows.
- Descriptions of important modules and their responsibilities.
- Technical reasoning behind significant implementation decisions, when supported by evidence.
- Accurate setup commands and configuration instructions.
- Actual test commands and results, with unverified tests clearly identified.
- Screenshots of the real application where available.
- Appropriate tables, diagrams, and code excerpts.
- A glossary for important technical terms when useful.

Explain complex technical topics clearly while preserving technical accuracy.

Do not include source code merely to increase the length of the document.

### Visual and document design

The report should resemble professionally prepared software engineering documentation.

Require:

- A polished cover page.
- Consistent headings and typography.
- A clean table of contents.
- Properly numbered sections, tables, figures, and diagrams.
- Headers, footers, and page numbers where supported.
- Readable code blocks and tables.
- High-resolution diagrams and screenshots.
- Consistent margins, spacing, and alignment.
- Professional page breaks and section layouts.
- A clean, readable PDF export.

Avoid generic filler, oversized decorative headings, excessive whitespace, and repetitive content.

### Deliverables

Instruct Replit to create:

- `CarVenta_Technical_Report.pdf`
- `CarVenta_Technical_Report.docx`
- `CarVenta_Technical_Report.md`
- Source files and assets needed to regenerate the report, where appropriate.
- A brief README describing the report-generation process.

The DOCX must be editable, the Markdown must preserve the main technical content, and the PDF must be a polished final document.

Require the exported documents to be checked for missing content, broken diagrams, incorrect page breaks, clipped tables, unreadable code, and formatting inconsistencies.

---

## 3. Shared Rules for Both Replit Prompts

Both generated prompts must contain the following requirements:

### Accuracy

- Base all technical claims on the actual CarVenta project.
- Do not invent features, technologies, statistics, performance results, user numbers, or successful tests.
- Identify missing evidence and unverified information.
- Use consistent project facts across the presentation and report.

### Security and Privacy

- Never include real API keys, passwords, access tokens, database credentials, private URLs, or authentication secrets.
- Never copy the contents of `.env` files into the deliverables.
- Use safe placeholders for configuration examples.
- Do not include personal information that is unnecessary for the project documentation.
- Inspect screenshots for exposed credentials, private information, and sensitive browser or terminal content.
- Never publish secrets through source code, generated documents, embedded metadata, or assets.

### Scope and Preservation

- Work only on generating the requested documentation deliverables.
- Do not modify CarVenta's application source code.
- Do not delete or overwrite existing project files.
- Do not run destructive commands or publish anything automatically.
- Keep generated files organized in a dedicated documentation directory.
- Do not assume that Git history, repository credentials, or private backups are safe to publish.

### Quality Assurance

- Require Replit to generate actual files, not just describe them.
- Require a final verification of all deliverables.
- Require a list of files created and the checks performed.
- Clearly report any failed export, missing dependency, or incomplete section.
- Ensure that both documents tell the same accurate story about CarVenta.

## 4. Final Output Rules

Create ONLY these two Markdown files:

- `REPLIT_PROMPT_PRESENTATION.md`
- `REPLIT_PROMPT_TECHNICAL_REPORT.md`

Each file must contain one complete, copy-ready Replit prompt tailored to CarVenta.

Do not create the actual presentation, PDF, Word report, or PowerPoint.

Do not modify the application.

Do not create extra prompt files, summaries, or alternative versions.

Before finishing, verify that both Markdown files exist, contain complete independent prompts, include project-specific facts gathered from the actual codebase, and obey every security restriction above.

Your final response should simply identify the two generated files and briefly state that they are ready to be copied into Replit.