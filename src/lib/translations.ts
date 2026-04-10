export const unitTranslations: Record<string, string> = {
    glass_water: "su bardağı",
    "glass water": "su bardağı",
    water_glass: "su bardağı",
    "water glass": "su bardağı",
    glass_tea: "çay bardağı",
    "glass tea": "çay bardağı",
    tea_glass: "çay bardağı",
    "tea glass": "çay bardağı",
    tablespoon: "yemek kaşığı",
    "table spoon": "yemek kaşığı",
    teaspoon: "çay kaşığı",
    "tea spoon": "çay kaşığı",
    dessertspoon: "tatlı kaşığı",
    "dessert spoon": "tatlı kaşığı",
    cup: "fincan",
    gram: "gram",
    g: "gram",
    kilogram: "kg",
    kg: "kg",
    liter: "litre",
    l: "litre",
    milliliter: "ml",
    ml: "ml",
    clove: "diş",
    slice: "dilim",
    pinch: "tutam",
    handful: "avuç",
    packet: "paket",
    bunch: "demet",
    bowl: "kase",
    drop: "damla",
    piece: "adet",
    pieces: "adet",
    whole: "tam"
};

export const translateRecipeUnits = (text: string): string => {
    if (!text) return text;
    let result = text;
    
    // Sort keys by length descending to avoid partial matches (e.g., 'glass' matching before 'glass_water')
    const keys = Object.keys(unitTranslations).sort((a, b) => b.length - a.length);
    
    keys.forEach((eng) => {
        const tr = unitTranslations[eng];
        // Match English unit name with boundaries or underscores
        // This handles "1 glass_water", "glass water", "2 glass water", etc.
        const regexStr = eng.includes(' ') || eng.includes('_') 
            ? `(\\b|_)${eng.replace('_', '(_| )')}(\\b|_)`
            : `\\b${eng}\\b`;
            
        const regex = new RegExp(regexStr, 'gi');
        result = result.replace(regex, (match) => {
            // Check if we should preserve a leading underscore if it was part of the match, 
            // but usually we want to replace the whole unit with the Turkish version.
            return ` ${tr} `;
        });
    });
    
    return result.replace(/\s+/g, ' ').trim();
};
