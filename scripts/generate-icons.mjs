// Generiert Favicon (.ico), Icon-PNG und Apple-Touch-Icon aus src/app/icon.svg.
// Aufruf: node scripts/generate-icons.mjs
import sharp from 'sharp'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const appDir = path.join(root, 'src', 'app')
const svg = await readFile(path.join(appDir, 'icon.svg'))

const png32 = await sharp(svg).resize(32, 32).png().toBuffer()
await sharp(svg).resize(180, 180).png().toFile(path.join(appDir, 'apple-icon.png'))

// ICO-Container mit eingebettetem PNG (von allen modernen Browsern unterstützt)
const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0) // reserved
header.writeUInt16LE(1, 2) // type: icon
header.writeUInt16LE(1, 4) // ein Eintrag

const entry = Buffer.alloc(16)
entry.writeUInt8(32, 0) // Breite
entry.writeUInt8(32, 1) // Höhe
entry.writeUInt8(0, 2) // Farbpalette
entry.writeUInt8(0, 3) // reserved
entry.writeUInt16LE(1, 4) // Planes
entry.writeUInt16LE(32, 6) // Bit-Tiefe
entry.writeUInt32LE(png32.length, 8) // Datengröße
entry.writeUInt32LE(22, 12) // Offset

await writeFile(
  path.join(appDir, 'favicon.ico'),
  Buffer.concat([header, entry, png32])
)

console.log('Icons generiert: favicon.ico, apple-icon.png')
