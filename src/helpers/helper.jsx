const getRegionColor = (region) => {
    // Implement your helper function to map region to color
    // This function should return the CSS class for the specified region
    // Make sure to define corresponding CSS classes in your stylesheet

    switch (region) {
        case 'Africa':
            return 'region-blue';
        case 'Americas':
            return 'region-green';
        case 'Asia':
            return 'region-red';
        case 'Europe':
            return 'region-yellow';
        case 'Oceania':
            return 'region-purple';
        default:
            return 'region-default';
    }
};

export default getRegionColor;