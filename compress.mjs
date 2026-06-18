/**
 * compress.mjs — Ricomprime tutte le immagini del sito con Sharp
 * Scrive su file temporaneo prima di sostituire l'originale per evitare lock issues.
 */

import sharp from "sharp";
import { writeFileSync, statSync, renameSync, existsSync, unlinkSync } from "fs";
import { join } from "path";

const ROOT = process.cwd();

const images = [
  { path: "public/sfondo/sfondo1.webp",     quality: 78, effort: 6 },
  { path: "public/gallery/_MG_0240.webp",   quality: 76, effort: 6 },
  { path: "public/gallery/_MG_0244.webp",   quality: 76, effort: 6 },
  { path: "public/gallery/_MG_0255.webp",   quality: 76, effort: 6 },
  { path: "public/gallery/_MG_0258.webp",   quality: 76, effort: 6 },
  { path: "public/salone1.webp",            quality: 78, effort: 6 },
  { path: "public/salone2.webp",            quality: 78, effort: 6 },
  { path: "public/salone3.webp",            quality: 78, effort: 6 },
  { path: "public/salone4.webp",            quality: 78, effort: 6 },
];

async function compressAll() {
  console.log("🔧 Compressione immagini in corso...\n");
  let totalBefore = 0;
  let totalAfter  = 0;

  for (const { path: relPath, quality, effort } of images) {
    const fullPath = join(ROOT, relPath);
    const tmpPath  = fullPath + ".tmp.webp";

    try {
      const before = statSync(fullPath).size;
      totalBefore += before;

      // 1. Comprimi in un buffer in memoria
      const compressed = await sharp(fullPath)
        .webp({ quality, effort, smartSubsample: true })
        .toBuffer();

      const after = compressed.length;

      if (after < before) {
        // 2. Scrivi su file temporaneo
        writeFileSync(tmpPath, compressed);
        // 3. Elimina originale e rinomina temp (operazione atomica)
        unlinkSync(fullPath);
        renameSync(tmpPath, fullPath);

        totalAfter += after;
        const saved = ((before - after) / before * 100).toFixed(1);
        console.log(`✅ ${relPath}`);
        console.log(`   ${(before/1024).toFixed(1)} KB → ${(after/1024).toFixed(1)} KB  (-${saved}%)\n`);
      } else {
        totalAfter += before;
        if (existsSync(tmpPath)) unlinkSync(tmpPath);
        console.log(`⏭  ${relPath} — già ottimizzata, saltata\n`);
      }
    } catch (err) {
      totalAfter += statSync(fullPath).size;
      if (existsSync(tmpPath)) unlinkSync(tmpPath);
      console.warn(`⚠️  ${relPath} — errore: ${err.message}\n`);
    }
  }

  const totalSaved = totalBefore - totalAfter;
  const totalPct   = ((totalSaved / totalBefore) * 100).toFixed(1);
  console.log("─────────────────────────────────────");
  console.log(`Totale prima:  ${(totalBefore/1024).toFixed(0)} KB`);
  console.log(`Totale dopo:   ${(totalAfter/1024).toFixed(0)} KB`);
  console.log(`Risparmio:     ${(totalSaved/1024).toFixed(0)} KB  (-${totalPct}%)`);
}

compressAll().catch((err) => { console.error("Errore fatale:", err); process.exit(1); });
