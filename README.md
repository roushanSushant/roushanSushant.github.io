# Sushant Kumar Roushan — Editable GitHub Pages Portfolio

A modern, responsive portfolio for development practice, public policy, governance and research. It is built with plain HTML, CSS and JavaScript: no framework, build step, or paid hosting is required.

## What makes it easy to update?

**You do not need to edit website code for normal content changes.** Open `editor.html` in a browser to update the profile, projects, experience, field notes, internships, testimonials, research interests and skills.

The editor saves a draft in that browser and downloads a new `portfolio-data.js` file. Since GitHub Pages is static hosting, it cannot write changes back to your GitHub repository automatically. To publish your edits:

1. Open `editor.html` in your browser (or visit `https://YOUR-USERNAME.github.io/editor.html` after publishing).
2. Select the section you want to change.
3. Edit the fields or click **+ Add item** to add a project, internship, field experience or testimonial.
4. Click **Download updated portfolio-data.js**.
5. Upload the downloaded file to the root of your GitHub repository, replacing the existing `portfolio-data.js`.
6. Commit the change and refresh the public site after GitHub Pages deploys.

You can also edit `portfolio-data.js` directly, but the visual editor is recommended.

## Files

- `index.html` — portfolio page structure
- `styles.css` — design, responsive layout and visual styles
- `app.js` — interactive filters, mobile navigation, project detail modal and content rendering
- `portfolio-data.js` — all editable portfolio content
- `portfolio-data-backup.json` — backup of the starting content; can be imported in the editor
- `editor.html`, `editor.css`, `editor.js` — browser-based content editor
- `assets/photos/` — place portfolio photographs here
- `assets/documents/` — optional approved public-facing reports or writing samples
- `assets/README.txt` — asset and privacy guidance

## Add photographs and files

1. Upload an image to `assets/photos/` using GitHub's **Add file → Upload files**.
2. In the editor, enter a relative path such as `assets/photos/field-visit-01.jpg` in the item's **Image path** field.
3. To offer your CV, upload a PDF to `assets/cv.pdf`, then enter `assets/cv.pdf` in Profile & contact → CV file path.
4. To link a public report or writing sample, upload it to `assets/documents/` and enter its relative path in the **Related link** field.

Use short file names without spaces. Only publish images, quotes and documents that you have permission to share. Avoid identifiable beneficiary details, private phone numbers, home addresses, or confidential government records.

## Content already added from your ZIP

The starting portfolio includes draft entries informed by the uploaded documents, including:
- Buniyaadi Shiksha Abhiyaan / foundational literacy and numeracy
- Aspirational District Programme reporting and cross-sector convergence
- Anemia Mukt East Singhbhum proposal
- Anganwadi infrastructure proposal for tribal and PVTG areas
- Musabani Block Development Strategy
- Model Village Khatikocha planning formats
- Patamda farmers' income / dairy-farmer project concept
- District Skill Programme Management Unit

These are **document-based draft entries**, not a claim that every proposal was implemented or that every result was personally achieved by you. The uploaded source documents establish programme context, but your exact role, dates, implementation status, and individual contribution should be completed and checked before you change an entry's status from `draft` to `published`.

The FLN draft refers to the uploaded district report and work-based fellowship reflection. Verify the metric and period before presenting results as a personal achievement. Keep outputs (what was delivered) separate from outcomes (what changed).

## Publish with GitHub Pages

1. Sign in at https://github.com/.
2. Create a **public** repository named exactly `YOUR-USERNAME.github.io`, replacing the placeholder with your GitHub username.
3. Upload the **contents** of this folder to the repository root. `index.html`, `styles.css`, `app.js`, and `portfolio-data.js` should not be inside an extra nested folder.
4. Open **Settings → Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**, choose `main` and `/(root)`, then save.
6. After deployment, visit `https://YOUR-USERNAME.github.io/`.

The content editor is also available at `https://YOUR-USERNAME.github.io/editor.html`. The editor does not have permission to commit changes to GitHub; download the updated data file and upload it yourself.

## Preview locally

For a quick preview, open `index.html` in your browser. If your browser blocks local JavaScript files, run a local server from this folder (for example, `python -m http.server 8000`) and visit `http://localhost:8000/`. No server is needed after deployment to GitHub Pages.

## Before you publish publicly

- Replace email, LinkedIn and GitHub placeholders.
- Add your actual dates and exact role for each project and experience.
- Confirm which projects were proposals, approved plans, implemented interventions or completed work.
- Add a CV, approved photos, public writing samples and testimonials only when ready.
- Review every public claim for accuracy and confidentiality.
