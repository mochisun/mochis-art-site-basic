export interface PortfolioItem {
	id: string;
	title: string;
	category: "traditional" | "digital";
	description: string;
	finalImage: string;
    thumbnail: string;
	progressPhotos?: string[];
	timelapse?: string;
}

export const portfolioItems: PortfolioItem[] = [
	{
		id: "salmon",
		title: "Salmon Farming Commentary | 2024 (Oil Paint on Canvas)",
		category: "traditional",
		description: "Salmon farming is a controversial industry with significant environmental and ethical concerns. Depicted is a starved salmon mother holding onto her eggs and sitting inside a small pool, representing the restrictive manmade conditions of salmon farms. She is surrounded by 'fresh cut' salmon filets, bright pink in color due to the synthetic astaxanthin pigment added to their feed.",
		finalImage: "/src/assets/art/portfolio/traditional_art/salmon/20240228_104826.jpg",
        thumbnail: "/src/assets/art/portfolio/traditional_art/salmon/thumbnail.jpg",
		progressPhotos: [
			"/src/assets/art/portfolio/traditional_art/salmon/20240219_123615.jpg",
			"/src/assets/art/portfolio/traditional_art/salmon/20240219_131725.jpg",
			"/src/assets/art/portfolio/traditional_art/salmon/20240219_193043.jpg",
			"/src/assets/art/portfolio/traditional_art/salmon/20240221_133545.jpg",
			"/src/assets/art/portfolio/traditional_art/salmon/20240223_133058.jpg",
			"/src/assets/art/portfolio/traditional_art/salmon/20240226_175150.jpg",
			"/src/assets/art/portfolio/traditional_art/salmon/20240228_104826.jpg",
		],
	},
	{
		id: "friend-portrait",
		title: "Portrait of Friend | 2023 (Oil Paint on Canvas)",
		category: "traditional",
		description: "College final project using an old highschool friend as a model. This was the largest piece I've ever done standing at 4 feet tall!",
		finalImage: "/src/assets/art/portfolio/traditional_art/friend_portrait/20230404_114934.jpg",
        thumbnail: "/src/assets/art/portfolio/traditional_art/friend_portrait/20230404_130806.jpg",
		progressPhotos: [
			"/src/assets/art/portfolio/traditional_art/friend_portrait/20230216_111915.jpg",
			"/src/assets/art/portfolio/traditional_art/friend_portrait/20230216_134010.jpg",
			"/src/assets/art/portfolio/traditional_art/friend_portrait/20230221_132714.jpg",
			"/src/assets/art/portfolio/traditional_art/friend_portrait/20230228_131521.jpg",
			"/src/assets/art/portfolio/traditional_art/friend_portrait/20230321_133110.jpg",
			"/src/assets/art/portfolio/traditional_art/friend_portrait/20230328_131449.jpg",
			"/src/assets/art/portfolio/traditional_art/friend_portrait/20230404_114934.jpg",
		],
	},
    {
		id: "self-portrait",
		title: "Self Portrait | 2022 (Oil Paint on Canvas)",
		category: "traditional",
		description: "To achieve this lighting reference, I had to setup 2 different colored light sources (red/blue) within a pitch black garage while my sister took the photo!",
		finalImage: "/src/assets/art/portfolio/traditional_art/self_portrait/20221212_173308 square up.jpg",
        thumbnail: "/src/assets/art/portfolio/traditional_art/self_portrait/thumbnail.jpg",
		progressPhotos: [
			"/src/assets/art/portfolio/traditional_art/self_portrait/20221206_161836.jpg",
			"/src/assets/art/portfolio/traditional_art/self_portrait/20221206_163006.jpg",
			"/src/assets/art/portfolio/traditional_art/self_portrait/20221208_125620.jpg",
			"/src/assets/art/portfolio/traditional_art/self_portrait/20221208_134214.jpg",
			"/src/assets/art/portfolio/traditional_art/self_portrait/20221209_160402.jpg",
			"/src/assets/art/portfolio/traditional_art/self_portrait/20221212_173308 square up.jpg",
		],
	},
	{
		id: "mob-isaac",
		title: "Mob Pyscho/Binding of Isaac Design | 2025 (Digital Illustration)",
		category: "digital",
		description: "A special christmas gift for my lovely partner who loves the Mob Psycho 100 show and the Binding of Isaac game. I designed this piece to be printed on a shirt and a sticker (See images below)",
		finalImage: "/src/assets//art/portfolio/digital_art/mob_isaac/mob_isaac_art.PNG",
        thumbnail: "/src/assets/art/portfolio/digital_art/mob_isaac/thumbnail.png",
		progressPhotos: [
			"/src/assets/art/portfolio/digital_art/mob_isaac/shirt_design.png",
			"/src/assets/art/portfolio/digital_art/mob_isaac/water_bottle_sticker.png",
		],
		timelapse: "/src/assets/art/portfolio/digital_art/mob_isaac/mob_isaac_timelapse.mp4",
	},
];

export function getPortfolioItem(id: string): PortfolioItem | undefined {
	return portfolioItems.find((item) => item.id === id);
}

export function getPortfolioItemsByCategory(category: "traditional" | "digital"): PortfolioItem[] {
	return portfolioItems.filter((item) => item.category === category);
}
