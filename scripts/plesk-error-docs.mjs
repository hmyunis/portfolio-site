// Copies the built 404 page to dist-plesk/error_docs/not_found.html.
//
// Why: on Plesk, nginx sits in front of the site and answers unknown URLs with the
// file at <domain home>/error_docs/not_found.html, before Apache or .htaccess run.
// Replacing that file with our own 404 page is Plesk's supported way to customise it.
//
// The page works from that location because every asset URL in it is root-absolute
// (/_assets/...), and the browser keeps showing the URL the visitor asked for.
// Re-upload the file after a build that changes the 404 page, fonts, or styles.
import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';

const source = 'dist/404.html';
const targetDir = 'dist-plesk/error_docs';
const target = `${targetDir}/not_found.html`;

if (!existsSync(source)) {
    console.error(`${source} not found. Run "astro build" first.`);
    process.exit(1);
}

const html = readFileSync(source, 'utf8');
const relative = html.match(/(?:src|href)="(?!\/|https?:|#|mailto:|data:)[^"]+"/g);
if (relative) {
    console.error(`404 page has relative URLs that would break under /error_docs/: ${relative.join(', ')}`);
    process.exit(1);
}

mkdirSync(targetDir, { recursive: true });
copyFileSync(source, target);
console.log(`Plesk error page written to ${target}. Upload it to <domain home>/error_docs/ (next to httpdocs).`);
