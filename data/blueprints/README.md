# School blueprints

A "blueprint" is a short JSON summary of a school's exam style/difficulty. It is produced from the school's PDFs during ingestion.

Files:
- `data/blueprints/<schoolId>.json`

Used by:
- `app/api/exams/generate` to prompt the AI so generated questions match the school's "flavour".

MVP:
- Blueprint files are optional; if missing, generation falls back to a generic style.
