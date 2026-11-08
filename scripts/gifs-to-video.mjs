// Converts project demo GIFs into MP4 (H.264) for much smaller, streamable demos.
// Usage: node scripts/gifs-to-video.mjs [inputDir] [outputDir]
// Requires ffmpeg on PATH. Existing, up-to-date outputs are skipped.
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { basename, join } from 'node:path';

const inputDir = process.argv[2] ?? 'src/assets/works/gifs';
const outputDir = process.argv[3] ?? 'src/assets/works/videos';

if (spawnSync('ffmpeg', ['-version']).status !== 0) {
    console.error('ffmpeg was not found on PATH. Install it from https://ffmpeg.org/download.html');
    process.exit(1);
}
if (!existsSync(inputDir)) {
    console.error(`Input folder not found: ${inputDir}`);
    process.exit(1);
}
mkdirSync(outputDir, { recursive: true });

const kb = (bytes) => `${Math.round(bytes / 1024).toLocaleString()} KB`;
let before = 0;
let after = 0;

for (const file of readdirSync(inputDir).filter((name) => name.toLowerCase().endsWith('.gif'))) {
    const input = join(inputDir, file);
    const output = join(outputDir, `${basename(file, '.gif')}.mp4`);
    const inputSize = statSync(input).size;

    if (!existsSync(output) || statSync(output).mtimeMs < statSync(input).mtimeMs) {
        const result = spawnSync(
            'ffmpeg',
            [
                '-y', '-loglevel', 'error',
                '-i', input,
                // Even dimensions are required by yuv420p; cap width at 1280px.
                '-vf', "scale='min(1280,iw)':-2:flags=lanczos,format=yuv420p",
                '-c:v', 'libx264', '-preset', 'slow', '-crf', '27',
                '-movflags', '+faststart', '-an',
                output,
            ],
            { stdio: 'inherit' }
        );
        if (result.status !== 0) {
            console.error(`Failed: ${file}`);
            continue;
        }
    }

    const outputSize = statSync(output).size;
    before += inputSize;
    after += outputSize;
    console.log(`${file.padEnd(20)} ${kb(inputSize).padStart(10)} -> ${kb(outputSize).padStart(9)}`);
}

console.log(`\nTotal: ${kb(before)} -> ${kb(after)}`);
