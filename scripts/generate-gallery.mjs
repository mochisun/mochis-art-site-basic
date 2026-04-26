import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const galleryDir = path.join(__dirname, "../public/art/gallery");
const outputFile = path.join(__dirname, "../src/data/gallery.ts");

// Get all image files organized by year
const imagesByYear = {};
const supportedFormats = [".png", ".jpg", ".jpeg", ".PNG", ".JPG", ".JPEG"];

// Scan all year directories
const yearDirs = fs.readdirSync(galleryDir).filter((file) => {
	return fs.statSync(path.join(galleryDir, file)).isDirectory();
});

yearDirs.forEach((year) => {
	const yearPath = path.join(galleryDir, year);
	const files = fs.readdirSync(yearPath);

	const images = files.filter((file) => {
		const ext = path.extname(file);
		return supportedFormats.includes(ext);
	});

	if (images.length > 0) {
		imagesByYear[year] = images.sort();
	}
});

// Generate TypeScript file
const imageEntries = [];
Object.entries(imagesByYear)
	.sort((a, b) => a[0] - b[0])
	.forEach(([year, images]) => {
		imageEntries.push(`	// ${year}`);
		images.forEach((filename) => {
			imageEntries.push(
				`	{ year: ${year}, filename: "${filename}", imagePath: "/art/gallery/${year}/${filename}" },`
			);
		});
	});

const fileContent = `interface GalleryImage {
	year: number;
	filename: string;
	imagePath: string;
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

	// Organize images by year
	for (const image of galleryImages) {
		if (!imagesByYear.has(image.year)) {
			imagesByYear.set(image.year, []);
		}
		imagesByYear.get(image.year)?.push(image);
	}

	// Convert to sorted array (newest first)
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

// Write the file
fs.writeFileSync(outputFile, fileContent, "utf-8");
console.log(`✓ Generated gallery.ts with ${imageEntries.length / 2} images`);
