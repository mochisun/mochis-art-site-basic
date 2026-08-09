//Description: This script scans the public/art/gallery directory for images organized by year, generates a 
// TypeScript file with structured data about the images, and exports functions to retrieve this data.
// It ensures that the gallery data is always up-to-date with the contents of the gallery directory.

import fs from "fs";
import fsp from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const galleryDir = path.join(__dirname, "../public/art/gallery");
const thumbDir = path.join(galleryDir, "thumbs");
const outputFile = path.join(__dirname, "../src/data/gallery.ts");
const supportedFormats = [".png", ".jpg", ".jpeg", ".PNG", ".JPG", ".JPEG"];
const thumbSize = 400;

function isImageFile(filename) {
	return supportedFormats.includes(path.extname(filename));
}

function getThumbnailFilename(filename) {
	return `${path.parse(filename).name}.webp`;
}

function getThumbPath(year, filename) {
	return `/art/gallery/thumbs/${year}/${getThumbnailFilename(filename)}`;
}

async function ensureDir(dir) {
	await fsp.mkdir(dir, { recursive: true });
}

async function generateThumbnails(year, images) {
	const outputYearDir = path.join(thumbDir, String(year));
	await ensureDir(outputYearDir);

	for (const filename of images) {
		const sourceFile = path.join(galleryDir, String(year), filename);
		const outputFilePath = path.join(outputYearDir, getThumbnailFilename(filename));

		let skip = false;
		try {
			const [sourceStat, outputStat] = await Promise.all([
				fsp.stat(sourceFile),
				fsp.stat(outputFilePath).catch(() => null),
			]);

			if (outputStat && outputStat.mtimeMs >= sourceStat.mtimeMs) {
				skip = true;
			}
		} catch (error) {
			console.error(`Error checking file timestamps for ${filename}:`, error);
		}

		if (skip) {
			continue;
		}

		try {
			await sharp(sourceFile)
				.resize(thumbSize, thumbSize, { fit: "cover" })
				.webp({ quality: 75 })
				.toFile(outputFilePath);
		} catch (error) {
			console.error(`Failed to generate thumbnail for ${sourceFile}:`, error);
		}
	}
}

function scanGallery() {
	const imagesByYear = {};
	const yearDirents = fs.readdirSync(galleryDir, { withFileTypes: true });
	const yearDirs = yearDirents
		.filter((dirent) => dirent.isDirectory() && dirent.name.toLowerCase() !== "thumbs")
		.map((dirent) => dirent.name)
		.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

	for (const year of yearDirs) {
		const yearPath = path.join(galleryDir, year);
		const files = fs.readdirSync(yearPath);
		const images = files.filter((file) => supportedFormats.includes(path.extname(file))).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

		if (images.length > 0) {
			imagesByYear[year] = images;
		}
	}

	return imagesByYear;
}

async function buildGallery() {
	const imagesByYear = scanGallery();

	for (const [year, images] of Object.entries(imagesByYear)) {
		await generateThumbnails(year, images);
	}

	const imageEntries = [];
	Object.entries(imagesByYear)
		.sort((a, b) => Number(a[0]) - Number(b[0]))
		.forEach(([year, images]) => {
			imageEntries.push(`	// ${year}`);
			images.forEach((filename) => {
				imageEntries.push(
					` 	{ year: ${year}, filename: "${filename}", imagePath: "/art/gallery/${year}/${filename}", thumbPath: "${getThumbPath(year, filename)}" },`
				);
			});
		});

	const fileContent = `interface GalleryImage {
	year: number;
	filename: string;
	imagePath: string;
	thumbPath: string;
}

interface GalleryYear {
	year: number;
	images: GalleryImage[];
}

// Auto-generated gallery images from public/art/gallery directory
const galleryImages: GalleryImage[] = [
${imageEntries.join("\n")}
];

export function getGalleryData(): GalleryYear[] {
	const imagesByYear: Map<number, GalleryImage[]> = new Map();

	for (const image of galleryImages) {
		if (!imagesByYear.has(image.year)) {
			imagesByYear.set(image.year, []);
		}
		imagesByYear.get(image.year)?.push(image);
	}

	return Array.from(imagesByYear.entries())
		.sort(([yearA], [yearB]) => yearB - yearA)
		.map(([year, images]) => ({
			year,
			images: images.sort((a, b) => a.filename.localeCompare(b.filename)),
		}));
}

export function getAllYears(): number[] {
	const data = getGalleryData();
	return data.map((item) => item.year).sort((a, b) => b - a);
}

export function getImagesByYear(year: number): GalleryImage[] {
	const data = getGalleryData();
	const yearData = data.find((item) => item.year === year);
	return yearData?.images ?? [];
}
`;

	await fsp.writeFile(outputFile, fileContent, "utf-8");
	console.log(`✓ Generated gallery.ts with ${Object.values(imagesByYear).flat().length} images`);
}

await buildGallery();
