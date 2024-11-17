class HotelHelper {
    resolveKey(data, keys) {
        for (const key of keys) {
            const value = key.split('.').reduce((acc, part) => acc?.[part], data);
            if (value !== undefined && value !== null) {
                return value;
            }
        }
        return null;
    }

    pushImages(targetArray, hotel, mappingKey, resolveKey) {
        const images = resolveKey(hotel, mappingKey)?.map(image => ({
            link: image.url || image.link,
            description: image.description || image.caption,
        })) || [];
        targetArray.push(...images);
    }

    mergeAmenities(currentAmenities, newAmenities) {
        const merged = { general: [], room: [] };
        if (currentAmenities) {
            merged.general.push(...(currentAmenities.general || []));
            merged.room.push(...(currentAmenities.room || []));
        }
        if (newAmenities) {
            merged.general.push(...(newAmenities.general || []));
            merged.room.push(...(newAmenities.room || []));
        }
        merged.general = [...new Set(merged.general)];
        merged.room = [...new Set(merged.room)];
        return merged;
    };

    mapImages(hotel, keyMappings, resolveKey) {
        return Object.entries(keyMappings).reduce((acc, [key, mappingKey]) => {
            acc[key] = resolveKey(hotel, mappingKey)?.map(item => ({
                link: item.url || item.link,
                description: item.description || item.caption,
            })) || [];
            return acc;
        }, {});
    }
}

export default HotelHelper;