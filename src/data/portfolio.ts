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
		id: "will_wizard",
		title: "Portrait of Will Byers from Stranger Things | 2026 (Digital Illustration)",
		category: "digital",
		description: "Follow my methodical process of creating a digital portrait using multiple references from Season 5 of Stranger Things!",
		finalImage: "/art/portfolio/digital_art/will_wizard/will wizard.PNG",
        thumbnail: "/art/portfolio/digital_art/will_wizard/thumbnail.PNG",
		progressPhotos: [
			"/art/portfolio/digital_art/will_wizard/IMG_2231.PNG",
			"/art/portfolio/digital_art/will_wizard/will wizard.PNG",
		],
		timelapse: "https://www.youtube.com/embed/qpJmWCbBnzg",
	},
    {
		id: "mob-isaac",
		title: "Mob Pyscho/Binding of Isaac Design | 2025 (Digital Illustration)",
		category: "digital",
		description: "A special christmas gift for my lovely partner who loves the Mob Psycho 100 show and the Binding of Isaac game. I designed this piece to be printed on a shirt and a sticker (See images below)",
		finalImage: "/art/portfolio/digital_art/mob_isaac/mob_isaac_art.PNG",
        thumbnail: "/art/portfolio/digital_art/mob_isaac/thumbnail.PNG",
		progressPhotos: [
			"/art/portfolio/digital_art/mob_isaac/shirt_design.png",
			"/art/portfolio/digital_art/mob_isaac/water_bottle_sticker.png",
		],
		timelapse: "/art/portfolio/digital_art/mob_isaac/mob_isaac_timelapse.mp4",
	},
    {
		id: "salmon",
		title: "Salmon Farming Commentary | 2024 (Oil Paint on Canvas)",
		category: "traditional",
		description: "Salmon farming is a controversial industry with significant environmental and ethical concerns. Depicted is a starved salmon mother holding onto her eggs and sitting inside a small pool, representing the restrictive manmade conditions of salmon farms. She is surrounded by 'fresh cut' salmon filets, bright pink in color due to the synthetic astaxanthin pigment added to their feed.",
		finalImage: "/art/portfolio/traditional_art/salmon/20240228_104826.jpg",
        thumbnail: "/art/portfolio/traditional_art/salmon/thumbnail.jpg",
		progressPhotos: [
			"/art/portfolio/traditional_art/salmon/20240219_123615.jpg",
			"/art/portfolio/traditional_art/salmon/20240219_131725.jpg",
			"/art/portfolio/traditional_art/salmon/20240219_193043.jpg",
			"/art/portfolio/traditional_art/salmon/20240221_133545.jpg",
			"/art/portfolio/traditional_art/salmon/20240223_133058.jpg",
			"/art/portfolio/traditional_art/salmon/20240226_175150.jpg",
			"/art/portfolio/traditional_art/salmon/20240228_104826.jpg",
		],
	},
	{
		id: "friend-portrait",
		title: "Portrait of Friend | 2023 (Oil Paint on Canvas)",
		category: "traditional",
		description: "College final project using an old highschool friend as a model. This was the largest piece I've ever done standing at 4 feet tall!",
		finalImage: "/art/portfolio/traditional_art/friend_portrait/20230404_114934.jpg",
        thumbnail: "/art/portfolio/traditional_art/friend_portrait/20230404_130806.jpg",
		progressPhotos: [
			"/art/portfolio/traditional_art/friend_portrait/20230216_111915.jpg",
			"/art/portfolio/traditional_art/friend_portrait/20230216_134010.jpg",
			"/art/portfolio/traditional_art/friend_portrait/20230221_132714.jpg",
			"/art/portfolio/traditional_art/friend_portrait/20230228_131521.jpg",
			"/art/portfolio/traditional_art/friend_portrait/20230321_133110.jpg",
			"/art/portfolio/traditional_art/friend_portrait/20230328_131449.jpg",
			"/art/portfolio/traditional_art/friend_portrait/20230404_114934.jpg",
		],
	},
    {
		id: "self-portrait",
		title: "Self Portrait | 2022 (Oil Paint on Canvas)",
		category: "traditional",
		description: "To achieve this lighting reference, I had to setup 2 different colored light sources (red/blue) within a pitch black garage while my sister took the photo!",
		finalImage: "/art/portfolio/traditional_art/self_portrait/20221212_173308 square up.jpg",
        thumbnail: "/art/portfolio/traditional_art/self_portrait/thumbnail.jpg",
		progressPhotos: [
			"/art/portfolio/traditional_art/self_portrait/20221206_161836.jpg",
			"/art/portfolio/traditional_art/self_portrait/20221206_163006.jpg",
			"/art/portfolio/traditional_art/self_portrait/20221208_125620.jpg",
			"/art/portfolio/traditional_art/self_portrait/20221208_134214.jpg",
			"/art/portfolio/traditional_art/self_portrait/20221209_160402.jpg",
			"/art/portfolio/traditional_art/self_portrait/20221212_173308 square up.jpg",
		],
	},
	
];

export function getPortfolioItem(id: string): PortfolioItem | undefined {
	return portfolioItems.find((item) => item.id === id);
}

export function getPortfolioItemsByCategory(category: "traditional" | "digital"): PortfolioItem[] {
	return portfolioItems.filter((item) => item.category === category);
}
