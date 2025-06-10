const probe = require('probe-image-size');

// GCD function to simplify fraction
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

// Get simplified ratio string (e.g., "3/2")
function simplifyRatio(width, height) {
    const divisor = gcd(width, height);
    return `${width / divisor}/${height / divisor}`;
}

// Fetch dimensions and return ratio
async function getImageAspectRatio(url) {
    try {
        const { width, height } = await probe(url);
        const ratio = simplifyRatio(width, height);
        return { width, height, ratio };
    } catch (err) {
        throw new Error(`Failed to get image dimensions: ${err.message}`);
    }
}

module.exports = { getImageAspectRatio };
