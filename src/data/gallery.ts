
interface GalleryImage {
	year: number;
	filename: string;
	imagePath: string;
}

interface GalleryYear {
	year: number;
	images: GalleryImage[];
}

// Dynamically import all gallery images
const galleryModules = import.meta.glob(
	"/art/gallery/**/*.{png,jpg,jpeg,PNG,JPG,JPEG}",
	{ eager: true }
);

export function getGalleryData(): GalleryYear[] {
	const imagesByYear: Map<number, GalleryImage[]> = new Map();

	// Extract year from module path and organize images
	for (const [path, module] of Object.entries(galleryModules)) {
		const yearMatch = path.match(/\/(\d{4})\//);
		if (!yearMatch) continue;

		const year = parseInt(yearMatch[1], 10);
		const imagePath = path
        const filename = path.split("/").pop() || "";
		

		if (!imagesByYear.has(year)) {
			imagesByYear.set(year, []);
		}

		imagesByYear.get(year)?.push({
			year,
			filename,
			imagePath,
		});
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
